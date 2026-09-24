import type { Preview } from '@storybook/react-vite';

import '../src/styles/tokens.system.css';
import '../src/styles/tokens.club.css';
import '../src/styles/base.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile · 390px',
          styles: { width: '390px', height: '844px' },
          type: 'mobile',
        },
      },
      defaultViewport: 'mobile390',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  initialGlobals: {
    viewport: { value: 'mobile390', isRotated: false },
  },
};

export default preview;
