import React, { memo, useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useProgressBarStyles } from '../theme/styles';

interface ProgressBarProps {
  progress: number; // 0–1
  label?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

function ProgressBarComponent({ progress, label }: ProgressBarProps) {
  const styles = useProgressBarStyles();
  const pct = Math.max(0, Math.min(1, progress));
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withSpring(pct, {
      damping: 15,
      stiffness: 100,
    });
  }, [pct, animatedWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value * 100}%`,
    };
  });

  return (
    <View style={styles.wrapper}>
      {label != null ? (
        <Text style={styles.label}>{label}</Text>
      ) : null}
      <View style={styles.track}>
        <AnimatedView style={[styles.fill, animatedStyle]} />
      </View>
    </View>
  );
}

export const ProgressBar = memo(ProgressBarComponent);
