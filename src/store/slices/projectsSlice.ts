import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '../../utils/types';

interface ProjectsState {
  items: Project[];
}

const initialState: ProjectsState = {
  items: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const i = state.items.findIndex((p) => p.id === action.payload.id);
      if (i >= 0) state.items[i] = action.payload;
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setProjects, addProject, updateProject, removeProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
