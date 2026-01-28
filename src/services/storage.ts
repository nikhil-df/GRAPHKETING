import { createMMKV } from 'react-native-mmkv';
import { STORAGE_KEYS } from '../utils/constants';
import type { Project, Task } from '../utils/types';

// Initialize storage lazily - delay until after React Native is fully loaded
// This prevents nitro module initialization errors
let storage: ReturnType<typeof createMMKV> | null = null;
let initializationAttempted = false;
let initializationError: Error | null = null;

// Delay initialization to ensure nitro modules are ready
function getStorage() {
  if (initializationError) {
    // Don't retry if we already failed
    return null;
  }

  if (!storage && !initializationAttempted) {
    initializationAttempted = true;
    
    try {
      // Try to create MMKV - nitro modules should be initialized by now
      // If they're not, we'll catch the error and return null
      storage = createMMKV({ id: 'graphketing-storage' });
    } catch (error) {
      initializationError = error as Error;
      console.warn('MMKV storage not available (nitro modules may not be initialized):', error);
      return null;
    }
  }
  return storage;
}

export function getStoredProjects(): Project[] {
  try {
    const mmkv = getStorage();
    if (!mmkv) return [];
    
    const raw = mmkv.getString(STORAGE_KEYS.PROJECTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading projects from storage:', error);
    return [];
  }
}

export function setStoredProjects(projects: Project[]): void {
  try {
    const mmkv = getStorage();
    if (!mmkv) {
      // Silently fail if storage is not available
      return;
    }
    
    mmkv.set(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to storage:', error);
  }
}

export function getStoredTasks(): Task[] {
  try {
    const mmkv = getStorage();
    if (!mmkv) return [];
    
    const raw = mmkv.getString(STORAGE_KEYS.TASKS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error reading tasks from storage:', error);
    return [];
  }
}

export function setStoredTasks(tasks: Task[]): void {
  try {
    const mmkv = getStorage();
    if (!mmkv) {
      // Silently fail if storage is not available
      return;
    }
    
    mmkv.set(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
}

