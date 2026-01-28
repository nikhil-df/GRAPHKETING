import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from './index';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

export function useProjectListStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    list: {
      padding: 16,
      paddingBottom: 100,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    emptyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 16,
    },
    emptyList: {
      flex: 1,
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
      padding: 12,
      paddingBottom: 24,
      minHeight: WINDOW_HEIGHT - 120,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
    },
    subtitle: {
      fontSize: 14,
      marginTop: 8,
      color: theme.textSecondary,
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
      marginBottom: 20,
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
      minHeight: 100,
      textAlignVertical: 'top',
    },
    placeholder: {
      color: theme.textSecondary,
    },
    statusContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    statusButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      backgroundColor: theme.surfaceVariant,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
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
      fontWeight: '500',
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
      marginHorizontal: 6,
      padding: 12,
      borderRadius: 12,
      backgroundColor: theme.surfaceVariant,
      borderWidth: 1,
      borderColor: theme.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      textTransform: 'uppercase',
      color: theme.text,
    },
    count: {
      fontSize: 12,
      color: theme.textSecondary,
      marginLeft: 8,
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
      marginTop: 8,
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
      width: '100%',
    },
    label: {
      fontSize: 13,
      marginBottom: 4,
      color: theme.textSecondary,
    },
    track: {
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.progressTrack,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: 3,
      backgroundColor: theme.progressFill,
    },
  });
}

export function useAppStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.background,
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
      flex: 1,
    },
    taskCount: {
      fontSize: 14,
      color: theme.textSecondary,
      marginLeft: 8,
    },
    progressContainer: {
      marginTop: 8,
    },
  });
}

export function useFABStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    fab: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 24,
      right: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    icon: {
      fontSize: 28,
      color: '#ffffff',
      fontWeight: '300',
    },
  });
}
