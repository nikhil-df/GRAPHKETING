import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Project } from '../utils/types';
import { ProgressBar } from './ProgressBar';
import { useProjectCardStyles } from '../theme/styles';

interface ProjectCardProps {
  project: Project & { totalTasks: number; completion: number };
  onPress: (projectId: string) => void;
}

function ProjectCardComponent({ project, onPress }: ProjectCardProps) {
  const styles = useProjectCardStyles();
  const handlePress = useCallback(
    () => onPress(project.id),
    [onPress, project.id]
  );

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.title} numberOfLines={1}>
        {project.name}
      </Text>
      <Text style={styles.taskCount}>
        {project.totalTasks} {project.totalTasks === 1 ? 'task' : 'tasks'}
      </Text>
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={project.completion}
          label={`${Math.round(project.completion * 100)}% complete`}
        />
      </View>
    </TouchableOpacity>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
