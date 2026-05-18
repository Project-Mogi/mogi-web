export const theme = {
  colors: {
    blue: '#5B9DFF',
    blueHover: '#3B82F6',
    blueTint: '#EEF6FF',
    blueDisabled: '#BBD8FF',
    blueLine: '#DCE8F8',
    blueLineStrong: '#C5D7F2',
    white: '#FFFFFF',
    navy: '#19213A',
    navyMuted: '#58637A',
    gray: '#8C96AA',
    red: '#FF5A5A',
    pink: '#F472B6',
    pinkTint: '#FDF2F8',
    green: '#00A661',
    yellow: '#FFB020',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  radius: {
    sm: '8px',
    md: '8px',
    lg: '12px',
    xl: '24px',
  },
  typography: {
    title: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '40px',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '32px',
    },
    body: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    caption: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
  },
  shadow: {
    card: '0 4px 16px rgba(25, 31, 40, 0.08)',
    floating: '0 8px 24px rgba(25, 31, 40, 0.12)',
  },
} as const;
