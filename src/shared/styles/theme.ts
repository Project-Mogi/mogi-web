export const theme = {
  colors: {
    primary: '#3182F6',
    primaryHover: '#1B64DA',
    primarySoft: '#E8F3FF',
    primaryDisabled: '#B4D5FF',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#191F28',
    textSecondary: '#4E5968',
    gray: '#8B95A1',
    border: '#E5E8EB',
    borderStrong: '#D1D6DB',
    danger: '#FF5A5A',
    success: '#00A661',
    warning: '#FFB020',
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
