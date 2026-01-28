import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Task } from '../utils/types';
import { useTaskCardStyles } from '../theme/styles';

interface TaskCardProps {
  task: Task;
  onPress?: (taskId: string) => void;
}

function TaskCardComponent({ task, onPress }: TaskCardProps) {
  const styles = useTaskCardStyles();
  const handlePress = useCallback(
    () => onPress?.(task.id),
    [onPress, task.id]
  );

  const content = (
    <>
      <Text style={styles.title} numberOfLines={1}>
        {task.title || 'Untitled'}
      </Text>
      {task.description ? (
        <Text style={styles.desc} numberOfLines={2}>
          {task.description}
        </Text>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{content}</View>;
}

export const TaskCard = memo(TaskCardComponent);
