import React, { useCallback, useMemo, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import type { ProjectListScreenProps } from '../navigation/types';
import { FAB } from '../components/FAB';
import { NamePromptModal } from '../components/NamePromptModal';
import { ProjectCard } from '../components/ProjectCard';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectProjects, selectProjectWithStats } from '../store/selectors';
import {
  addProject,
  removeProject,
  removeTasksByProjectId,
  updateProject,
} from '../store/slices';
import { useProjectListStyles } from '../theme/styles';
import { useFakeSync } from '../hooks/useStorageSync';
import type { Project } from '../utils/types';

export function ProjectListScreen({ navigation }: ProjectListScreenProps) {
  const styles = useProjectListStyles();
  const dispatch = useAppDispatch();
  const sync = useFakeSync();

  const projects = useAppSelector(selectProjects);
  const projectsWithStats = useAppSelector(selectProjectWithStats);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<{
    projectId: string;
    currentName: string;
  } | null>(null);

  const handleProjectPress = useCallback(
    (projectId: string) => {
      navigation.navigate('KanbanBoard', { projectId });
      sync();
    },
    [navigation, sync]
  );

  const openCreate = useCallback(() => setIsCreateOpen(true), []);

  const handleCreateProject = useCallback(
    (name: string) => {
      const now = new Date().toISOString();
      const newProject: Project = {
        id: `project-${Date.now()}`,
        name,
        createdAt: now,
        updatedAt: now,
      };
      dispatch(addProject(newProject));
      sync();
      setIsCreateOpen(false);
    },
    [dispatch, sync]
  );

  const handleRenameRequest = useCallback(
    (projectId: string, currentName: string) => {
      setRenameTarget({ projectId, currentName });
    },
    []
  );

  const handleRenameProject = useCallback(
    (name: string) => {
      if (!renameTarget) return;
      const existing = projects.find((p) => p.id === renameTarget.projectId);
      if (!existing) return;

      dispatch(
        updateProject({
          ...existing,
          name,
          updatedAt: new Date().toISOString(),
        })
      );
      sync();
      setRenameTarget(null);
    },
    [dispatch, projects, renameTarget, sync]
  );

  const handleDeleteRequest = useCallback(
    (projectId: string) => {
      const projectName =
        projects.find((p) => p.id === projectId)?.name ?? 'this project';
      Alert.alert(
        'Delete Project',
        `Are you sure you want to delete "${projectName}"?\nAll its tasks will be deleted too.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              dispatch(removeProject(projectId));
              dispatch(removeTasksByProjectId(projectId));
              sync();
            },
          },
        ]
      );
    },
    [dispatch, projects, sync]
  );

  const renderItem = useCallback(
    ({ item }: { item: (typeof projectsWithStats)[0] }) => (
      <ProjectCard
        project={item}
        onPress={handleProjectPress}
        onRenameRequest={handleRenameRequest}
        onDeleteRequest={handleDeleteRequest}
      />
    ),
    [handleDeleteRequest, handleProjectPress, handleRenameRequest]
  );

  const keyExtractor = useCallback(
    (item: (typeof projectsWithStats)[0]) => item.id,
    []
  );

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
      />
      <FAB onPress={openCreate} />

      <NamePromptModal
        visible={isCreateOpen}
        title="New Project"
        placeholder="Project name"
        confirmText="Create"
        onCancel={() => setIsCreateOpen(false)}
        onConfirm={handleCreateProject}
      />

      <NamePromptModal
        visible={!!renameTarget}
        title="Rename Project"
        placeholder="Project name"
        confirmText="Rename"
        initialValue={renameTarget?.currentName || ''}
        onCancel={() => setRenameTarget(null)}
        onConfirm={handleRenameProject}
      />
    </View>
  );
}
