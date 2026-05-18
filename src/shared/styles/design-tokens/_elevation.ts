import { css, type DefaultTheme } from 'styled-components';

type ShadowKey = keyof DefaultTheme['shadow'];
type ElevationKey = ShadowKey | 'none';

const shadowValue =
  (key: ShadowKey) =>
  ({ theme }: { theme: DefaultTheme }) =>
    theme.shadow[key];

export const shadow = {
  card: shadowValue('card'),
  floating: shadowValue('floating'),
};

export const elevation = (key: ElevationKey) => {
  if (key === 'none') {
    return css`
      box-shadow: none;
    `;
  }

  return css`
    box-shadow: ${({ theme }) => theme.shadow[key]};
  `;
};
