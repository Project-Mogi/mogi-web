import styled from 'styled-components';

import * as token from '@/shared/styles/token';

export const Page = styled.main`
  min-height: 100dvh;
  padding: ${token.spacing.xl};
  background: ${token.colors.blueTint};
`;

export const Title = styled.h1`
  margin: 0;
  color: ${token.colors.navy};
  ${token.typography('title')}
`;
