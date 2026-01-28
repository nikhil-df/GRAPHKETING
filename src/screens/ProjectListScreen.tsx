import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import type { ProjectListScreenProps } from '../navigation/types';
import { useProjectListStyles } from '../theme/styles';
import { ProjectCard } from '../components/ProjectCard';
import { FAB } from '../components/FAB';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectProjectWithStats } from '../store/selectors';
import { addProject } from '../store/slices';
import { useFakeSync } from '../hooks/useStorageSync';
import type { Project } from '../utils/types';

export function ProjectListScreen({ navigation }: ProjectListScreenProps) {
  const styles = useProjectListStyles();
  const dispatch = useAppDispatch();
  const sync = useFakeSync();

  const projectsWithStats = useAppSelector(selectProjectWithStats);

  const handleProjectPress = useCallback(
    (projectId: string) => {
      navigation.navigate('KanbanBoard', { projectId });
      sync();
    },
    [navigation, sync]
  );

  const handleAddProject = useCallback(() => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: `Project ${projectsWithStats.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addProject(newProject));
    sync();
  }, [dispatch, projectsWithStats.length, sync]);

  const renderItem = useCallback(
    ({ item, index }: { item: typeof projectsWithStats[0]; index: number }) => (
      <ProjectCard
        project={item}
        onPress={handleProjectPress}
        index={index}
      />
    ),
    [handleProjectPress]
  );

  const keyExtractor = useCallback((item: typeof projectsWithStats[0]) => item.id, []);

  const emptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No projects yet.{'\n'}Tap the + button to create one!
        </Text>
      </View>
    ),
    [styles]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={projectsWithStats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.list,
          projectsWithStats.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={emptyComponent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
      />
      <FAB onPress={handleAddProject} />
    </View>
  );
}
