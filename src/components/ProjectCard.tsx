import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Project } from '../utils/types';
import { ProgressBar } from './ProgressBar';
import { useProjectCardStyles } from '../theme/styles';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface ProjectCardProps {
  project: Project & { totalTasks: number; completion: number };
  onPress: (projectId: string) => void;
  index: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function ProjectCardComponent({ project, onPress, index: _index }: ProjectCardProps) {
  const styles = useProjectCardStyles();
  const handlePress = useCallback(() => onPress(project.id), [onPress, project.id]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 300 }),
      transform: [
        {
          translateY: withSpring(0, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  return (
    <AnimatedTouchable
      style={[styles.card, animatedStyle]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {project.name}
        </Text>
        <Text style={styles.taskCount}>
          {project.totalTasks} {project.totalTasks === 1 ? 'task' : 'tasks'}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={project.completion}
          label={`${Math.round(project.completion * 100)}% complete`}
        />
      </View>
    </AnimatedTouchable>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
