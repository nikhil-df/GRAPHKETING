import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './index';
import { setProjects, setTasks } from '../store/slices';
import {
  getStoredProjects,
  getStoredTasks,
  setStoredProjects,
  setStoredTasks,
} from '../services/storage';
import { fakeSyncServer } from '../services/sync';

export function useStorageSync() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.items);
  const tasks = useAppSelector((state) => state.tasks.items);

  // Load from storage on mount - delay to ensure storage is initialized
  useEffect(() => {
    // Delay loading to ensure MMKV/nitro modules are ready
    const timer = setTimeout(() => {
      try {
        const storedProjects = getStoredProjects();
        const storedTasks = getStoredTasks();

        if (storedProjects.length > 0) {
          dispatch(setProjects(storedProjects));
        }
        if (storedTasks.length > 0) {
          dispatch(setTasks(storedTasks));
        }

        // Fake sync on app start
        if (storedProjects.length > 0 || storedTasks.length > 0) {
          fakeSyncServer({
            projects: storedProjects,
            tasks: storedTasks,
          }).catch(console.error);
        }
      } catch (error) {
        console.error('Error loading from storage:', error);
      }
    }, 300); // Delay to ensure nitro modules are initialized

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Persist to storage when state changes
  useEffect(() => {
    if (projects.length > 0) {
      setStoredProjects(projects);
    }
  }, [projects]);

  useEffect(() => {
    if (tasks.length > 0) {
      setStoredTasks(tasks);
    }
  }, [tasks]);
}

export function useFakeSync() {
  const projects = useAppSelector((state) => state.projects.items);
  const tasks = useAppSelector((state) => state.tasks.items);

  return async () => {
    await fakeSyncServer({ projects, tasks });
  };
}
