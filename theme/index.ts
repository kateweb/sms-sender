import { ActionIcon, Loader, createTheme } from '@mantine/core';

export const myTheme = createTheme({
  primaryColor: 'green',
  colors: {
    'green': ['#e1f1cf', '#c5e5a4', '#aad878', '#8ecc4d', '#8ecc4d', '#8ecc4d', '#84b94e', '#7ab341', '#7ab341', '#4e9600'],
  },
  defaultRadius: 'md',
  focusRing: 'auto',
  fontFamily: 'Open Sans, sans-serif',
  headings: { fontFamily: 'Open Sans, sans-serif' },
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: 'subtle',
      },
    }),
    Loader: Loader.extend({
      defaultProps: {
        type: 'bars',
      },
    }),
  },
});
