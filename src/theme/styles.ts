import { Dimensions, StyleSheet } from 'react-native';
import { useTheme } from './hooks';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export function useAppStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
}

export function useFABStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    icon: {
      fontSize: 24,
      color: '#ffffff',
      fontWeight: '600',
    },
  });
}

export function useTaskCardStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    card: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.surfaceVariant,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.text,
    },
    desc: {
      fontSize: 13,
      marginTop: 4,
      color: theme.textSecondary,
    },
  });
}

export function useKanbanColumnStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    column: {
      width: 200,
      minWidth: 200,
      height: WINDOW_HEIGHT - 140,
      marginHorizontal: 8,
      padding: 12,
      borderRadius: 12,
      backgroundColor: theme.surfaceVariant,
      borderWidth: 1,
      borderColor: theme.border,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      textTransform: 'uppercase',
      color: theme.text,
      marginBottom: 12,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingBottom: 16,
    },
    addButton: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderStyle: 'dashed',
      alignItems: 'center',
      marginTop: 4,
    },
    addButtonText: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: '500',
    },
  });
}

export function useProgressBarStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    wrapper: {
      marginVertical: 4,
    },
    label: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: 4,
    },
    track: {
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.progressTrack,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: 4,
      backgroundColor: theme.progressFill,
    },
  });
}

export function useProjectListStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    list: {
      flex: 1,
      padding: 16,
      paddingBottom: 100,
    },
    emptyList: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    emptyContainer: {
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    emptyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
    },
  });
}

export function useProjectCardStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      backgroundColor: theme.surface,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    title: {
      fontSize: 17,
      fontWeight: '600',
      color: theme.text,
    },
    taskCount: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 4,
    },
    progressContainer: {
      marginTop: 12,
    },
  });
}

export function useKanbanBoardStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    columnsContainer: {
      flexDirection: 'row',
      padding: 12,
      paddingBottom: 24,
    },
  });
}

export function useTaskDetailsStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 32,
    },
    field: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme.text,
    },
    textArea: {
      minHeight: 96,
      textAlignVertical: 'top',
    },
    placeholder: {
      color: theme.textSecondary,
    },
    statusContainer: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    statusButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: theme.surfaceVariant,
      borderWidth: 1,
      borderColor: theme.border,
    },
    statusButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    statusButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    statusButtonTextActive: {
      color: '#ffffff',
    },
    imageContainer: {
      marginTop: 8,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      backgroundColor: theme.surfaceVariant,
    },
    imagePickerButton: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderStyle: 'dashed',
      alignItems: 'center',
    },
    imagePickerText: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    removeImageButton: {
      marginTop: 8,
      padding: 8,
      borderRadius: 6,
      backgroundColor: theme.surfaceVariant,
      alignItems: 'center',
    },
    removeImageText: {
      fontSize: 14,
      color: theme.text,
    },
    deleteButton: {
      marginTop: 24,
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#dc2626',
      alignItems: 'center',
    },
    deleteButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#ffffff',
    },
    errorText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 32,
    },
  });
}
