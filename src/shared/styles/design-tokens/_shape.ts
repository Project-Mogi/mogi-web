import { type DefaultTheme } from 'styled-components';

type RadiusKey = keyof DefaultTheme['radius'];

const radiusValue =
  (key: RadiusKey) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.radius[key];

export const radius = {
  sm: radiusValue('sm'),
  md: radiusValue('md'),
  lg: radiusValue('lg'),
  xl: radiusValue('xl'),
};
