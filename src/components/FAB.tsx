import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useFABStyles } from '../theme/styles';

interface FABProps {
  onPress: () => void;
  icon?: string;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function FABComponent({ onPress, icon = '+' }: FABProps) {
  const styles = useFABStyles();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(1, { damping: 10, stiffness: 200 }),
        },
      ],
    };
  });

  const handlePressIn = () => {
    'worklet';
    // Scale animation handled by spring
  };

  return (
    <AnimatedTouchable
      style={[styles.fab, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{icon}</Text>
    </AnimatedTouchable>
  );
}

export const FAB = memo(FABComponent);
