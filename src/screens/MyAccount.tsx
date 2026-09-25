import type { ReactNode } from 'react'
import appleFaceid from '../assets/icons/apple-faceid.svg'
import arrowBackFilled from '../assets/icons/arrow-back-filled.svg'
import closeFilled from '../assets/icons/close-filled.svg'
import digitalWellbeing from '../assets/icons/digital-wellbeing.svg'
import emailFilled from '../assets/icons/email-filled.svg'
import genericListIcon from '../assets/icons/generic-list-icon.svg'
import giftPackage from '../assets/icons/gift-package.svg'
import helpFilled from '../assets/icons/help-filled.svg'
import historyFilled from '../assets/icons/history-filled.svg'
import infoFilled from '../assets/icons/info-filled.svg'
import kLogo from '../assets/icons/k-logo.svg'
import navChevronRight from '../assets/icons/nav-chevron-right.svg'
import navbarMyBets from '../assets/icons/navbar-my-bets.svg'
import notificationsFilled from '../assets/icons/notifications-filled.svg'
import personAddFilled from '../assets/icons/person-add-filled.svg'
import personFilled from '../assets/icons/person-filled.svg'
import phoneFilled from '../assets/icons/phone-filled.svg'
import virtualsBetList from '../assets/icons/virtuals-bet-list.svg'
import { useClubState } from '../state/ClubStateContext'
import './MyAccount.css'

/** Figma frame: 26:22254 (My Account Default). */
type MyAccountProps = {
  onOpenClub: () => void
}

export function MyAccount({ onOpenClub }: MyAccountProps) {
  const { totalXp, hasPendingClaim } = useClubState()

  return (
    <div className="my-account">
      <div className="my-account__page">
        {/* Absolute app bar on top of the gradient */}
        <div className="my-account__app-bar">
          <div className="my-account__app-bar-left">
            <button type="button" className="my-account__icon-btn" aria-label="Back">
              <img
                src={arrowBackFilled}
                alt=""
                className="my-account__icon-btn-img"
              />
            </button>
            <span className="my-account__app-bar-title">Account</span>
          </div>
          <button type="button" className="my-account__icon-btn" aria-label="Close">
            <img
              src={closeFilled}
              alt=""
              className="my-account__icon-btn-img my-account__icon-btn-img--lg"
            />
          </button>
        </div>

        {/* Header — navy gradient */}
        <header className="my-account__header">
          <div className="my-account__header-inner">
            {/* User info + divider */}
            <div className="my-account__user-info">
              <div className="my-account__user-row">
                <div className="my-account__avatar">
                  <img src={personFilled} alt="" className="my-account__avatar-img" />
                </div>
                <div className="my-account__user-details">
                  <p className="my-account__hi">Hi User</p>
                  <p className="my-account__user-id">
                    <span>UserId:&nbsp;</span>
                    <span>3888807</span>
                  </p>
                </div>
              </div>
              <hr className="my-account__header-divider" />
            </div>

            {/* Balance */}
            <div className="my-account__balance">
              <p className="my-account__balance-amount">
                <span className="my-account__balance-currency">₦</span>
                <span className="my-account__balance-number">0</span>
              </p>
              <p className="my-account__balance-label">Your balance</p>
            </div>

            {/* Withdraw / Deposit */}
            <div className="my-account__actions">
              <button type="button" className="my-account__btn my-account__btn--withdraw">
                Withdraw
              </button>
              <button type="button" className="my-account__btn my-account__btn--deposit">
                Deposit
              </button>
            </div>
          </div>
        </header>

        {/* Sheet — light content area, overlaps 12px into the header via CSS */}
        <div className="my-account__sheet-wrap">
          <div className="my-account__sheet">
            <Section title="My Rewards">
              <Tile>
                <Row
                  icon={giftPackage}
                  iconSize={20}
                  label="Free Bets"
                  value={
                    <>
                      <span className="my-account__currency-symbol">₦</span>
                      <span className="my-account__currency-value">&nbsp;100</span>
                    </>
                  }
                  chevron
                />
                <RowDivider />
                <ClubRow
                  xp={totalXp}
                  pending={hasPendingClaim}
                  onClick={onOpenClub}
                />
              </Tile>
            </Section>

            <Section title="My Activity">
              <Tile>
                <Row icon={navbarMyBets} iconSize={20} label="My Bets" chevron />
                <RowDivider />
                <Row
                  icon={historyFilled}
                  iconSize={20}
                  label="Transaction History"
                  chevron
                />
                <RowDivider />
                <Row
                  icon={virtualsBetList}
                  iconSize={20}
                  label="Virtual Bet List"
                  chevron
                />
              </Tile>
            </Section>

            <Section title="My Information">
              <Tile>
                <Row icon={genericListIcon} iconSize={20} label="My Details" chevron />
                <RowDivider />
                <Row
                  icon={digitalWellbeing}
                  iconSize={20}
                  label="Responsible Gambling"
                  chevron
                />
                <RowDivider />
                <Row
                  icon={appleFaceid}
                  iconSize={20}
                  label="Fingerprint or Face Login"
                  chevron
                />
                <RowDivider />
                <Row icon={emailFilled} iconSize={20} label="Messages" chevron />
                <RowDivider />
                <Row
                  icon={notificationsFilled}
                  iconSize={20}
                  label="Notications"
                  chevron
                />
              </Tile>
            </Section>

            <div className="my-account__logout-wrap">
              <button type="button" className="my-account__logout-btn">
                Log OUT
              </button>
            </div>

            <Section title="BetKing Info">
              <Tile>
                <Row icon={phoneFilled} iconSize={20} label="Contact Us" />
                <RowDivider />
                <Row icon={genericListIcon} iconSize={20} label="Help " />
                <RowDivider />
                <Row icon={helpFilled} iconSize={20} label="FAQs" />
                <RowDivider />
                <Row icon={genericListIcon} iconSize={20} label="Blog" />
                <RowDivider />
                <Row
                  icon={personAddFilled}
                  iconSize={20}
                  label="Become an Agent"
                />
                <RowDivider />
                <Row icon={infoFilled} iconSize={20} label="About" />
              </Tile>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

/* --- Local helpers (only used inside this screen) --- */

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="my-account__section">
      <div className="my-account__section-header">
        <h2 className="my-account__section-title">{title}</h2>
      </div>
      <div className="my-account__section-body">{children}</div>
    </section>
  )
}

function Tile({ children }: { children: ReactNode }) {
  return <div className="my-account__tile">{children}</div>
}

type RowProps = {
  icon: string
  iconSize?: 20 | 24
  label: string
  value?: ReactNode
  chevron?: boolean
  onClick?: () => void
}

function Row({ icon, iconSize = 20, label, value, chevron, onClick }: RowProps) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`my-account__row${onClick ? ' my-account__row--interactive' : ''}`}
      onClick={onClick}
    >
      <div className="my-account__row-left">
        <img
          src={icon}
          alt=""
          className="my-account__row-icon"
          style={{ width: iconSize, height: iconSize }}
        />
        <span className="my-account__row-label">{label}</span>
      </div>
      {value !== undefined && <span className="my-account__row-value">{value}</span>}
      {chevron && (
        <img
          src={navChevronRight}
          alt=""
          className="my-account__row-chevron"
        />
      )}
    </Tag>
  )
}

/** Betking Club row — 24px K logo, live XP, notification variant when
 *  a shirt is waiting to be claimed. */
function ClubRow({
  xp,
  pending,
  onClick,
}: {
  xp: number
  pending: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="my-account__row my-account__row--interactive"
      onClick={onClick}
    >
      <div className="my-account__row-left">
        <div className="my-account__club-icon">
          <img
            src={kLogo}
            alt=""
            className="my-account__row-icon"
            style={{ width: 24, height: 24 }}
          />
          {pending && <span className="my-account__club-badge" aria-hidden />}
        </div>
        <div className="my-account__club-labels">
          <span className="my-account__row-label">My Betking Club</span>
          {pending && (
            <span className="my-account__club-subtitle">1 reward ready</span>
          )}
        </div>
      </div>
      <span className="my-account__row-value">
        <span>XP</span>
        <span>&nbsp;{xp}/500</span>
      </span>
      <img src={navChevronRight} alt="" className="my-account__row-chevron" />
    </button>
  )
}

function RowDivider() {
  return (
    <div className="my-account__row-divider-wrap">
      <div className="my-account__row-divider-spacer" />
      <hr className="my-account__row-divider" />
    </div>
  )
}
