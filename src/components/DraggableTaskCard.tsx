import React, { memo } from 'react';
import { Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import type { Task, TaskStatus } from '../utils/types';
import { useTaskCardStyles } from '../theme/styles';

interface DraggableTaskCardProps {
  task: Task;
  onDragEnd: (taskId: string, newStatus: TaskStatus, newOrder: number) => void;
  onPress?: (taskId: string) => void;
  index: number;
}

function DraggableTaskCardComponent({
  task,
  onDragEnd,
  onPress,
  index: _index,
}: DraggableTaskCardProps) {
  const styles = useTaskCardStyles();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .maxDistance(10)
    .onEnd(() => {
      'worklet';
      if (onPress) runOnJS(onPress)(task.id);
    });

  const panGesture = Gesture.Pan()
    .minDistance(8)
    .onStart(() => {
      'worklet';
      scale.value = withSpring(1.05, { damping: 15, stiffness: 200 });
    })
    .onUpdate((e) => {
      'worklet';
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      'worklet';
      const threshold = 80;
      let newStatus: TaskStatus = task.status;
      const newOrder = task.order;

      if (Math.abs(e.translationX) > threshold) {
        if (e.translationX > 0) {
          if (task.status === 'todo') newStatus = 'in_progress';
          else if (task.status === 'in_progress') newStatus = 'done';
        } else {
          if (task.status === 'done') newStatus = 'in_progress';
          else if (task.status === 'in_progress') newStatus = 'todo';
        }
      }

      runOnJS(onDragEnd)(task.id, newStatus, newOrder);

      translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    })
    .onFinalize(() => {
      'worklet';
      translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    });

  const composed = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.title} numberOfLines={1}>
          {task.title || 'Untitled'}
        </Text>
        {task.description ? (
          <Text style={styles.desc} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}
      </Animated.View>
    </GestureDetector>
  );
}

export const DraggableTaskCard = memo(DraggableTaskCardComponent);
