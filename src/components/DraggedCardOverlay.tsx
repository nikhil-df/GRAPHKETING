import React, { useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { Task } from '../utils/types';
import { useTaskCardStyles } from '../theme/styles';

const overlayStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    elevation: 999,
    pointerEvents: 'none' as const,
  },
});

export interface DragLayout {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface DraggedCardOverlayProps {
  task: Task;
  layout: DragLayout;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
}

export function DraggedCardOverlay({
  task,
  layout,
  translateX,
  translateY,
  scale,
}: DraggedCardOverlayProps) {
  const styles = useTaskCardStyles();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const cardPositionStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      left: layout.left,
      top: layout.top,
      width: layout.width,
      minHeight: layout.height,
      marginBottom: 0,
    }),
    [layout.left, layout.top, layout.width, layout.height]
  );

  return (
    <View style={overlayStyles.wrapper}>
      <Animated.View style={[styles.card, cardPositionStyle, animatedStyle]}>
        <Text style={styles.title} numberOfLines={1}>
          {task.title || 'Untitled'}
        </Text>
        {task.description ? (
          <Text style={styles.desc} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}
      </Animated.View>
    </View>
  );
}
