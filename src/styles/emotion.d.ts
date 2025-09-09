import '@emotion/react';
import type { StyleThemeType } from './theme';

declare module '@emotion/react' {
  export type Theme = StyleThemeType;
}
