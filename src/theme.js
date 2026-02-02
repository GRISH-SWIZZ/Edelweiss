import { createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'cyan',
  colors: {
    dark: [
      '#e5e7eb',
      '#b8bbc1',
      '#8b8f97',
      '#5e636d',
      '#323743',
      '#1a1d24',
      '#14161b',
      '#0f1014',
      '#0a0a0f',
      '#050507',
    ],
    cyan: [
      '#e0f9ff',
      '#b8ecff',
      '#8fdfff',
      '#66d2ff',
      '#3dc5ff',
      '#22d3ee',
      '#06b6d4',
      '#0891b2',
      '#0e7490',
      '#155e75',
    ],
    neon: [
      '#f0fdff',
      '#e0f9ff',
      '#c2f0ff',
      '#9ae7ff',
      '#6dd5ff',
      '#22d3ee',
      '#06b6d4',
      '#0891b2',
      '#0e7490',
      '#164e63',
    ],
  },
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Consolas, monospace',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.5rem', lineHeight: '1.4' },
      h4: { fontSize: '1.25rem', lineHeight: '1.45' },
      h5: { fontSize: '1.125rem', lineHeight: '1.5' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
    },
  },
  defaultRadius: 'md',
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.3)',
    sm: '0 1px 4px rgba(0, 0, 0, 0.4)',
    md: '0 4px 8px rgba(0, 0, 0, 0.5)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.6)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.7)',
    neon: '0 0 20px rgba(34, 211, 238, 0.3), 0 0 40px rgba(34, 211, 238, 0.1)',
  },
});

export default theme;
