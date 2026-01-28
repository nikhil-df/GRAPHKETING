import React, { memo } from 'react';
import { View, Text } from 'react-native';
import type { Task } from '../utils/types';
import { useTaskCardStyles } from '../theme/styles';

interface TaskCardProps {
  task: Task;
}

function TaskCardComponent({ task }: TaskCardProps) {
  const styles = useTaskCardStyles();

  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {task.title}
      </Text>
      {task.description ? (
        <Text style={styles.desc} numberOfLines={2}>
          {task.description}
        </Text>
      ) : null}
    </View>
  );
}

export const TaskCard = memo(TaskCardComponent);
