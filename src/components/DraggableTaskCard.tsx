import React, { memo, useRef, useCallback } from 'react';
import { Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  type SharedValue,
} from 'react-native-reanimated';
import type { Task, TaskStatus } from '../utils/types';
import { useTaskCardStyles } from '../theme/styles';
import type { DragLayout } from './DraggedCardOverlay';

export interface DragSharedValues {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
}

interface DraggableTaskCardProps {
  task: Task;
  onDragEnd: (taskId: string, newStatus: TaskStatus, newOrder: number) => void;
  onPress?: (taskId: string) => void;
  onDragStart?: (taskId: string, layout: DragLayout, refs: DragSharedValues) => void;
  onDragEndCallback?: (taskId: string) => void;
  index: number;
  boardOrigin: { x: number; y: number } | null;
}

function DraggableTaskCardComponent({
  task,
  onDragEnd,
  onPress,
  onDragStart,
  onDragEndCallback,
  index: _index,
  boardOrigin,
}: DraggableTaskCardProps) {
  const styles = useTaskCardStyles();
  const cardRef = useRef<Animated.View>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const isDragging = useSharedValue(false);

  const overlayActive = useSharedValue(0);

  const triggerMeasureAndStart = useCallback(() => {
    const view = cardRef.current as unknown as { measureInWindow: (cb: (x: number, y: number, w: number, h: number) => void) => void };
    if (!view?.measureInWindow || !onDragStart || !boardOrigin) return;
    view.measureInWindow((x, y, w, h) => {
      const layout: DragLayout = {
        left: x - boardOrigin.x,
        top: y - boardOrigin.y,
        width: w,
        height: h,
      };
      overlayActive.value = 1;
      onDragStart(task.id, layout, { translateX, translateY, scale });
    });
  }, [task.id, onDragStart, boardOrigin, translateX, translateY, scale, overlayActive]);

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
      isDragging.value = true;
      scale.value = withSpring(1.05, { damping: 15, stiffness: 200 });
      if (onDragStart) runOnJS(triggerMeasureAndStart)();
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
      if (onDragEndCallback) runOnJS(onDragEndCallback)(task.id);
      overlayActive.value = 0;

      isDragging.value = false;
      translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    })
    .onFinalize(() => {
      'worklet';
      if (onDragEndCallback) runOnJS(onDragEndCallback)(task.id);
      overlayActive.value = 0;
      isDragging.value = false;
      translateX.value = withSpring(0, { damping: 15, stiffness: 150 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 150 });
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    });

  const composed = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet';
    const dragging = isDragging.value || scale.value > 1.01;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: dragging && overlayActive.value ? 0 : 1,
      zIndex: dragging ? 99999 : 1,
      elevation: dragging ? 999 : 1,
    };
  });

  return (
    <GestureDetector gesture={composed}>
      <Animated.View ref={cardRef} style={[styles.card, animatedStyle]}>
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
