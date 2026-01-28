import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { TaskStatus, Task } from '../utils/types';
import { DraggableTaskCard, type DragSharedValues } from './DraggableTaskCard';
import { useKanbanColumnStyles } from '../theme/styles';
import type { DragLayout } from './DraggedCardOverlay';

interface DraggableKanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus, newOrder: number) => void;
  onAddTask: (status: TaskStatus) => void;
  onTaskPress?: (taskId: string) => void;
  onDragStart?: (taskId: string, layout: DragLayout, refs: DragSharedValues) => void;
  onDragEndCallback?: (taskId: string) => void;
  boardOrigin: { x: number; y: number } | null;
}

function DraggableKanbanColumnComponent({
  status,
  title,
  tasks,
  onTaskMove,
  onAddTask,
  onTaskPress,
  onDragStart,
  onDragEndCallback,
  boardOrigin,
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
            onDragStart={onDragStart}
            onDragEndCallback={onDragEndCallback}
            boardOrigin={boardOrigin}
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
