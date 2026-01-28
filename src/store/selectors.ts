import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { TaskStatus } from '../utils/types';

export const selectProjects = (state: RootState) => state.projects.items;
export const selectTasks = (state: RootState) => state.tasks.items;

export const selectTasksByProjectId = (state: RootState, projectId: string) =>
  selectTasks(state).filter((t) => t.projectId === projectId);

export const selectTasksByStatus = (
  state: RootState,
  status: TaskStatus
) => selectTasks(state).filter((t) => t.status === status);

export const selectProjectTasks = createSelector(
  [
    selectTasks,
    (_: RootState, projectId: string) => projectId,
  ],
  (tasks, projectId) => tasks.filter((t) => t.projectId === projectId)
);

export const selectProjectCompletion = createSelector(
  [selectProjectTasks],
  (tasks) => {
    if (tasks.length === 0) return 0;
    const doneCount = tasks.filter((t) => t.status === 'done').length;
    return doneCount / tasks.length;
  }
);

export const selectProjectWithStats = createSelector(
  [selectProjects, selectTasks],
  (projects, tasks) => {
    return projects.map((project) => {
      const projectTasks = tasks.filter((t) => t.projectId === project.id);
      const totalTasks = projectTasks.length;
      const doneCount = projectTasks.filter((t) => t.status === 'done').length;
      const completion = totalTasks > 0 ? doneCount / totalTasks : 0;

      return {
        ...project,
        totalTasks,
        completion,
      };
    });
  }
);

export const selectProjectById = createSelector(
  [selectProjects, (_: RootState, projectId: string) => projectId],
  (projects, projectId) => projects.find((p) => p.id === projectId)
);
