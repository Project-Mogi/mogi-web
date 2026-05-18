import { type DefaultTheme } from 'styled-components';

type ThemeKey<T extends keyof DefaultTheme> = keyof DefaultTheme[T];

const themeValue =
  <T extends keyof DefaultTheme, K extends ThemeKey<T>>(section: T, key: K) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme[section][key];

export const colors = {
  blue: themeValue('colors', 'blue'),
  blueHover: themeValue('colors', 'blueHover'),
  blueTint: themeValue('colors', 'blueTint'),
  blueDisabled: themeValue('colors', 'blueDisabled'),
  blueLine: themeValue('colors', 'blueLine'),
  blueLineStrong: themeValue('colors', 'blueLineStrong'),
  white: themeValue('colors', 'white'),
  navy: themeValue('colors', 'navy'),
  navyMuted: themeValue('colors', 'navyMuted'),
  gray: themeValue('colors', 'gray'),
  red: themeValue('colors', 'red'),
  green: themeValue('colors', 'green'),
  yellow: themeValue('colors', 'yellow'),
};

export const spacing = {
  xs: themeValue('spacing', 'xs'),
  sm: themeValue('spacing', 'sm'),
  md: themeValue('spacing', 'md'),
  lg: themeValue('spacing', 'lg'),
  xl: themeValue('spacing', 'xl'),
  xxl: themeValue('spacing', 'xxl'),
};
