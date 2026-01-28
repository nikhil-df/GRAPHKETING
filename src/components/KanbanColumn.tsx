import React, { memo } from 'react';
import { View, Text } from 'react-native';
import type { TaskStatus } from '../utils/types';
import { TaskCard } from './TaskCard';
import type { Task } from '../utils/types';
import { useKanbanColumnStyles } from '../theme/styles';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
}

function KanbanColumnComponent({ status: _status, title, tasks }: KanbanColumnProps) {
  const styles = useKanbanColumnStyles();

  return (
    <View style={styles.column}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.list}>
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </View>
    </View>
  );
}

export const KanbanColumn = memo(KanbanColumnComponent);
