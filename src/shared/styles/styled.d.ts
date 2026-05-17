import 'styled-components';

import { theme } from './theme';

type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: AppTheme['colors'];
    spacing: AppTheme['spacing'];
    radius: AppTheme['radius'];
    typography: AppTheme['typography'];
    shadow: AppTheme['shadow'];
  }
}
