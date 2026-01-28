import React, { useCallback, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import type { KanbanBoardScreenProps } from '../navigation/types';
import { useKanbanBoardStyles } from '../theme/styles';
import { DraggableKanbanColumn } from '../components/DraggableKanbanColumn';
import { useAppSelector, useAppDispatch } from '../hooks';
// Tasks filtered in component for better performance
import { updateTaskStatus, addTask } from '../store/slices';
import { useFakeSync } from '../hooks/useStorageSync';
import { TASK_STATUSES } from '../utils/constants';
import type { TaskStatus, Task } from '../utils/types';

export function KanbanBoardScreen({
  route,
  navigation,
}: KanbanBoardScreenProps) {
  const { projectId } = route.params;
  const styles = useKanbanBoardStyles();
  const dispatch = useAppDispatch();
  const sync = useFakeSync();

  const allTasks = useAppSelector((state) => state.tasks.items);
  const projectTasks = useMemo(
    () => allTasks.filter((t) => t.projectId === projectId),
    [allTasks, projectId]
  );

  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };
    projectTasks.forEach((task) => {
      grouped[task.status].push(task);
    });
    return grouped;
  }, [projectTasks]);

  const handleTaskMove = useCallback(
    (taskId: string, newStatus: TaskStatus, newOrder: number) => {
      dispatch(updateTaskStatus({ id: taskId, status: newStatus, order: newOrder }));
      sync();
    },
    [dispatch, sync]
  );

  const handleAddTask = useCallback(
    (status: TaskStatus) => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        projectId,
        title: '',
        description: '',
        status,
        order: tasksByStatus[status].length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addTask(newTask));
      sync();

      // Navigate to task details to edit
      setTimeout(() => {
        navigation.navigate('TaskDetails', { projectId, taskId: newTask.id });
      }, 100);
    },
    [dispatch, projectId, tasksByStatus, navigation, sync]
  );

  const handleTaskPress = useCallback(
    (taskId: string) => {
      navigation.navigate('TaskDetails', { projectId, taskId });
    },
    [navigation, projectId]
  );

  const columnTitles: Record<TaskStatus, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.columnsContainer}
      >
        {TASK_STATUSES.map((status) => (
          <DraggableKanbanColumn
            key={status}
            status={status}
            title={columnTitles[status]}
            tasks={tasksByStatus[status]}
            onTaskMove={handleTaskMove}
            onAddTask={handleAddTask}
            onTaskPress={handleTaskPress}
          />
        ))}
      </ScrollView>
    </View>
  );
}
