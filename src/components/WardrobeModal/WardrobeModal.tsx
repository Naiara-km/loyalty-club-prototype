import { useEffect, useState } from 'react'
import closeFilled from '../../assets/icons/close-filled.svg'
import { Button } from '../Button/Button'
import { Shirt, type ShirtVariant } from '../Shirt/Shirt'
import type { ShirtColour, ShirtId, ShirtSlot } from '../../state/clubState'
import './WardrobeModal.css'

/** "Change Jay Jay's shirt" dialog — Figma nodes
 *  186:29922 / 30310 / 30733 / 31152.
 *
 *  Four states baked into one component: shows a 2×2 tile grid where
 *  each tile reflects the corresponding wardrobe slot. Won slots are
 *  selectable (grey → gold-bordered when picked). Locked slots show a
 *  lock icon + "Win mission N" copy. The primary button confirms the
 *  selection ("WEAR RED"/…); it disables to "ALREADY WEARING" when
 *  the currently-worn shirt is selected. */

type WardrobeModalProps = {
  open: boolean
  onClose: () => void
  /** All four wardrobe slots (indices 0..3). Slot 0 is the default
   *  white shirt (always won); slots 1..3 are unlocked by missions. */
  slots: [ShirtSlot, ShirtSlot, ShirtSlot, ShirtSlot]
  wearing: ShirtId
  onWear: (id: ShirtId) => void
}

const shirtVariantByColour: Record<ShirtColour, ShirtVariant> = {
  // Figma 180:25665 — the "Club White" tile shows the full white shirt
  // illustration (with the number 10) rather than the small default
  // placeholder icon.
  White: 'white',
  Red: 'Red',
  Green: 'Green',
  Blue: 'Betking',
}

export function WardrobeModal({
  open,
  onClose,
  slots,
  wearing,
  onWear,
}: WardrobeModalProps) {
  // Reset the local selection to whatever is currently worn every time
  // the modal opens. This keeps the "ALREADY WEARING" state consistent
  // with what the user actually sees in the banner.
  const [selected, setSelected] = useState<ShirtId>(wearing)
  useEffect(() => {
    if (open) setSelected(wearing)
  }, [open, wearing])

  // Escape closes.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleConfirm = () => {
    if (selected !== wearing) onWear(selected)
    onClose()
  }

  const selectedSlot = slots[selected]!
  const isAlreadyWearing = selected === wearing
  const confirmLabel = isAlreadyWearing
    ? 'ALREADY WEARING'
    : `WEAR ${selectedSlot.colour.toUpperCase()}`

  return (
    <div
      className="wardrobe-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wardrobe-modal-title"
    >
      <div className="wardrobe-modal__backdrop" onClick={onClose} />

      <div className="wardrobe-modal__dialog" role="document">
        <button
          type="button"
          className="wardrobe-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img
            src={closeFilled}
            alt=""
            className="wardrobe-modal__close-icon"
          />
        </button>

        <div className="wardrobe-modal__title-block">
          <h2
            id="wardrobe-modal-title"
            className="wardrobe-modal__title"
          >
            Change Jay Jay&rsquo;s shirt
          </h2>
          <p className="wardrobe-modal__subtitle">Pick a shirt, then tap wear.</p>
        </div>

        <div className="wardrobe-modal__grid">
          {slots.map((slot) => (
            <WardrobeTile
              key={slot.id}
              slot={slot}
              wearing={wearing}
              selected={selected === slot.id}
              onSelect={() => slot.won && setSelected(slot.id)}
            />
          ))}
        </div>

        <div className="wardrobe-modal__actions">
          <Button onClick={handleConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}

type WardrobeTileProps = {
  slot: ShirtSlot
  wearing: ShirtId
  selected: boolean
  onSelect: () => void
}

function WardrobeTile({ slot, wearing, selected, onSelect }: WardrobeTileProps) {
  const isLocked = !slot.won
  const isWearing = slot.id === wearing

  const className = [
    'wardrobe-modal__tile',
    isLocked && 'wardrobe-modal__tile--locked',
    selected && !isLocked && 'wardrobe-modal__tile--selected',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      onClick={onSelect}
      disabled={isLocked}
      aria-pressed={selected}
    >
      <div
        className={
          isLocked
            ? 'wardrobe-modal__shirt-frame wardrobe-modal__shirt-frame--locked'
            : 'wardrobe-modal__shirt-frame'
        }
      >
        <Shirt variant={isLocked ? 'lock' : shirtVariantByColour[slot.colour]} />
      </div>
      <div className="wardrobe-modal__tile-text">
        <p className="wardrobe-modal__tile-title">
          {isLocked ? 'Mistery shirt' : `Club ${slot.colour}`}
        </p>
        <p
          className={
            isLocked
              ? 'wardrobe-modal__tile-status wardrobe-modal__tile-status--secondary'
              : slot.id === 0
                ? 'wardrobe-modal__tile-status wardrobe-modal__tile-status--secondary'
                : 'wardrobe-modal__tile-status wardrobe-modal__tile-status--gold'
          }
        >
          {isLocked
            ? `Win mission ${slot.id}`
            : isWearing
              ? 'Wearing now'
              : slot.id === 0
                ? 'Default'
                : `Shirt ${slot.id}`}
        </p>
      </div>
    </button>
  )
}
