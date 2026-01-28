import React, { useCallback, useMemo, useState, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import type { KanbanBoardScreenProps } from '../navigation/types';
import { useKanbanBoardStyles } from '../theme/styles';
import { DraggableKanbanColumn } from '../components/DraggableKanbanColumn';
import { DraggedCardOverlay } from '../components/DraggedCardOverlay';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addTask, updateTaskStatus } from '../store/slices';
import { useFakeSync } from '../hooks/useStorageSync';
import { TASK_STATUSES } from '../utils/constants';
import type { TaskStatus, Task } from '../utils/types';
import type { DragLayout } from '../components/DraggedCardOverlay';
import type { DragSharedValues } from '../components/DraggableTaskCard';

export function KanbanBoardScreen({
  route,
  navigation,
}: KanbanBoardScreenProps) {
  const { projectId } = route.params;
  const styles = useKanbanBoardStyles();
  const dispatch = useAppDispatch();
  const sync = useFakeSync();

  const containerRef = useRef<View>(null);
  const [boardOrigin, setBoardOrigin] = useState<{ x: number; y: number } | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragLayout, setDragLayout] = useState<DragLayout | null>(null);
  const [dragRefs, setDragRefs] = useState<DragSharedValues | null>(null);

  const measureBoard = useCallback(() => {
    (containerRef.current as unknown as { measureInWindow?: (cb: (x: number, y: number) => void) => void })?.measureInWindow?.(
      (x, y) => setBoardOrigin({ x, y })
    );
  }, []);

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
    (Object.keys(grouped) as TaskStatus[]).forEach((status) => {
      grouped[status].sort((a, b) => a.order - b.order);
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

  const handleDragStart = useCallback(
    (taskId: string, layout: DragLayout, refs: DragSharedValues) => {
      const task = projectTasks.find((t) => t.id === taskId);
      if (task) {
        setDraggedTask(task);
        setDragLayout(layout);
        setDragRefs(refs);
      }
    },
    [projectTasks]
  );

  const handleDragEndCallback = useCallback(() => {
    setDraggedTask(null);
    setDragLayout(null);
    setDragRefs(null);
  }, []);

  const columnTitles: Record<TaskStatus, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
  };

  return (
    <View
      ref={containerRef}
      style={styles.container}
      onLayout={measureBoard}
      collapsable={false}
    >
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
            onDragStart={handleDragStart}
            onDragEndCallback={handleDragEndCallback}
            boardOrigin={boardOrigin}
          />
        ))}
      </ScrollView>
      {draggedTask && dragLayout && dragRefs && (
        <DraggedCardOverlay
          task={draggedTask}
          layout={dragLayout}
          translateX={dragRefs.translateX}
          translateY={dragRefs.translateY}
          scale={dragRefs.scale}
        />
      )}
    </View>
  );
}
