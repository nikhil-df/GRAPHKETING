import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { TaskStatus, Task } from '../utils/types';
import { TaskCard } from './TaskCard';
import { useKanbanColumnStyles } from '../theme/styles';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onTaskPress?: (taskId: string) => void;
  onAddTask?: (status: TaskStatus) => void;
}

function KanbanColumnComponent({
  status,
  title,
  tasks,
  onTaskPress,
  onAddTask,
}: KanbanColumnProps) {
  const styles = useKanbanColumnStyles();
  const handleAdd = useCallback(
    () => onAddTask?.(status),
    [onAddTask, status]
  );

  return (
    <View style={styles.column}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.list}>
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onPress={onTaskPress}
          />
        ))}
        {onAddTask ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>+ Add Task</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export const KanbanColumn = memo(KanbanColumnComponent);
