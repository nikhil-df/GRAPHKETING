import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { TaskStatus, Task } from '../utils/types';
import { DraggableTaskCard } from './DraggableTaskCard';
import { useKanbanColumnStyles } from '../theme/styles';

interface DraggableKanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus, newOrder: number) => void;
  onAddTask: (status: TaskStatus) => void;
  onTaskPress?: (taskId: string) => void;
}

function DraggableKanbanColumnComponent({
  status,
  title,
  tasks,
  onTaskMove,
  onAddTask,
  onTaskPress,
}: DraggableKanbanColumnProps) {
  const styles = useKanbanColumnStyles();
  const handleAdd = useCallback(
    () => onAddTask(status),
    [onAddTask, status]
  );

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);

  return (
    <View style={styles.column}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator
        nestedScrollEnabled
      >
        {sortedTasks.map((task, index) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            index={index}
            onDragEnd={onTaskMove}
            onPress={onTaskPress}
          />
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export const DraggableKanbanColumn = memo(DraggableKanbanColumnComponent);
