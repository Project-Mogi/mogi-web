import { css } from 'styled-components';

import { type TypographyVariant } from './_typography';

export const typography = (variant: TypographyVariant) => css`
  font-size: ${({ theme }) => theme.typography[variant].fontSize};
  font-weight: ${({ theme }) => theme.typography[variant].fontWeight};
  line-height: ${({ theme }) => theme.typography[variant].lineHeight};
`;
