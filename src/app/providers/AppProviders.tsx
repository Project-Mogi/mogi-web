import { QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

import { queryClient } from '@/shared/api/queryClient';
import { GlobalStyle } from '@/shared/styles/GlobalStyle';
import { theme } from '@/shared/styles/theme';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
