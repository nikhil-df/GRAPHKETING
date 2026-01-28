import type { Project, Task } from '../utils/types';

export interface SyncData {
  projects: Project[];
  tasks: Task[];
}

export const fakeSyncServer = async (
  localData: SyncData
): Promise<SyncData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(localData), 1500);
  });
};
