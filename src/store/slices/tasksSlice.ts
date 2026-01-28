import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskStatus } from '../../utils/types';

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const i = state.items.findIndex((t) => t.id === action.payload.id);
      if (i >= 0) state.items[i] = action.payload;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus; order?: number }>
    ) => {
      const t = state.items.find((x) => x.id === action.payload.id);
      if (t) {
        t.status = action.payload.status;
        if (action.payload.order != null) t.order = action.payload.order;
        t.updatedAt = new Date().toISOString();
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    removeTasksByProjectId: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.projectId !== action.payload);
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  updateTaskStatus,
  removeTask,
  removeTasksByProjectId,
} = tasksSlice.actions;
export default tasksSlice.reducer;
