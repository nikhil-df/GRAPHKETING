import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { ProjectListScreen } from '../screens/ProjectListScreen';
import { KanbanBoardScreen } from '../screens/KanbanBoardScreen';
import { TaskDetailsScreen } from '../screens/TaskDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
      initialRouteName="ProjectList"
    >
      <Stack.Screen
        name="ProjectList"
        component={ProjectListScreen}
        options={{ title: 'Projects' }}
      />
      <Stack.Screen
        name="KanbanBoard"
        component={KanbanBoardScreen}
        options={{ title: 'Board' }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{ title: 'Task' }}
      />
    </Stack.Navigator>
  );
}
