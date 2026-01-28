import { useColorScheme } from 'react-native';
import { useMemo } from 'react';
import type { Theme } from '@react-navigation/native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { colours } from './colors';

export const useTheme = () => {
  const scheme = useColorScheme();
  return colours[scheme === 'dark' ? 'dark' : 'light'];
};

export function useNavigationTheme(): Theme {
  const scheme = useColorScheme();
  return useMemo(() => {
    const isDark = scheme === 'dark';
    const themeColors = colours[isDark ? 'dark' : 'light'];
    const base = isDark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: themeColors.primary,
        background: themeColors.background,
        card: themeColors.surface,
        text: themeColors.text,
        border: themeColors.border,
      },
    };
  }, [scheme]);
}
