import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../theme/hooks';
import type { ThemeColors } from '../theme/colors';

interface NamePromptModalProps {
  visible: boolean;
  title: string;
  placeholder?: string;
  initialValue?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: (name: string) => void;
}

export function NamePromptModal({
  visible,
  title,
  placeholder = 'Name',
  initialValue = '',
  confirmText = 'Save',
  cancelText = 'Cancel',
  onCancel,
  onConfirm,
}: NamePromptModalProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (visible) {
      setValue(initialValue);
      setError('');
    }
  }, [visible, initialValue]);

  const handleConfirm = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Name is required.');
      return;
    }
    onConfirm(trimmed);
  }, [onConfirm, value]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(t) => {
              setValue(t);
              if (error) setError('');
            }}
            placeholder={placeholder}
            placeholderTextColor={theme.textSecondary}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleConfirm}
          />
          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      padding: 16,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 12,
    },
    input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: theme.text,
    },
    errorText: {
      marginTop: 8,
      color: '#dc2626',
      fontSize: 13,
      fontWeight: '600',
    },
    actions: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 14,
      justifyContent: 'flex-end',
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
    },
    cancelButton: {
      backgroundColor: theme.surfaceVariant,
      borderColor: theme.border,
    },
    confirmButton: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    cancelText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: '700',
    },
    confirmText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '700',
    },
  });
}

