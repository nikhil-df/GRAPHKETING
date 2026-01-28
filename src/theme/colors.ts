export interface ThemeColors {
  background: string;
  surface: string;
  surfaceVariant: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryMuted: string;
  progressTrack: string;
  progressFill: string;
}

export const colours = {
  light: {
    background: '#fafafa',
    surface: '#ffffff',
    surfaceVariant: '#f0f0f0',
    text: '#1a1a1a',
    textSecondary: '#666666',
    border: '#e0e0e0',
    primary: '#2563eb',
    primaryMuted: '#93c5fd',
    progressTrack: '#e5e7eb',
    progressFill: '#4CAF50',
  } satisfies ThemeColors,

  dark: {
    background: '#121212',
    surface: '#1e1e1e',
    surfaceVariant: '#2d2d2d',
    text: '#f5f5f5',
    textSecondary: '#a3a3a3',
    border: '#3d3d3d',
    primary: '#3b82f6',
    primaryMuted: '#1e40af',
    progressTrack: '#374151',
    progressFill: '#66BB6A',
  } satisfies ThemeColors,
};
