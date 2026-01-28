import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  Layout,
} from 'react-native-reanimated';
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

const AnimatedView = Animated.createAnimatedComponent(View);

function DraggableKanbanColumnComponent({
  status,
  title,
  tasks,
  onTaskMove,
  onAddTask,
  onTaskPress,
}: DraggableKanbanColumnProps) {
  const styles = useKanbanColumnStyles();
  const hoverScale = useSharedValue(1);

  const handleAddTask = useCallback(() => {
    onAddTask(status);
  }, [onAddTask, status]);

  const columnStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: hoverScale.value }],
    };
  });

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);

  return (
    <AnimatedView style={[styles.column, columnStyle]} layout={Layout.springify()}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>({tasks.length})</Text>
      </View>
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled
      >
        {sortedTasks.map((task, index) => (
          <DraggableTaskCard
            key={task.id}
            task={task}
            onDragEnd={onTaskMove}
            onPress={onTaskPress}
            index={index}
          />
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddTask}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </AnimatedView>
  );
}

export const DraggableKanbanColumn = memo(DraggableKanbanColumnComponent);
