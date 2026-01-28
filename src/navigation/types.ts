import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ProjectList: undefined;
  KanbanBoard: { projectId: string };
  TaskDetails: { projectId: string; taskId: string };
};

export type ProjectListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProjectList'
>;
export type KanbanBoardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'KanbanBoard'
>;
export type TaskDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskDetails'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
