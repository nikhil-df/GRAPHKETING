import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { launchImageLibrary, type ImagePickerResponse } from 'react-native-image-picker';
import Animated, { FadeIn } from 'react-native-reanimated';
import type { TaskDetailsScreenProps } from '../navigation/types';
import { useTaskDetailsStyles } from '../theme/styles';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateTask, removeTask } from '../store/slices';
import { useFakeSync } from '../hooks/useStorageSync';
import type { TaskStatus } from '../utils/types';
import { TASK_STATUSES } from '../utils/constants';

const AnimatedView = Animated.createAnimatedComponent(View);

export function TaskDetailsScreen({
  route,
  navigation,
}: TaskDetailsScreenProps) {
  const { projectId, taskId } = route.params;
  const styles = useTaskDetailsStyles();
  const dispatch = useAppDispatch();
  const sync = useFakeSync();

  const task = useAppSelector((state) =>
    state.tasks.items.find((t) => t.id === taskId && t.projectId === projectId)
  );

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [assignedUser, setAssignedUser] = useState(task?.assignedUser || '');
  const [estimatedHours, setEstimatedHours] = useState(
    task?.estimatedHours?.toString() || ''
  );
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');
  const [imageUri, setImageUri] = useState(task?.imageUri || '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(task.dueDate || '');
      setAssignedUser(task.assignedUser || '');
      setEstimatedHours(task.estimatedHours?.toString() || '');
      setStatus(task.status);
      setImageUri(task.imageUri || '');
    }
  }, [task]);

  const handleSave = useCallback(() => {
    if (!task) return;

    const updatedTask = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.trim() || undefined,
      assignedUser: assignedUser.trim() || undefined,
      estimatedHours: estimatedHours ? parseInt(estimatedHours, 10) : undefined,
      status,
      imageUri: imageUri || undefined,
      updatedAt: new Date().toISOString(),
    };

    dispatch(updateTask(updatedTask));
    sync();
  }, [
    task,
    title,
    description,
    dueDate,
    assignedUser,
    estimatedHours,
    status,
    imageUri,
    dispatch,
    sync,
  ]);

  useEffect(() => {
    const timer = setTimeout(handleSave, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, dueDate, assignedUser, estimatedHours, status, imageUri]);

  const handleDelete = useCallback(() => {
    if (!task) return;

    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeTask(task.id));
            sync();
            navigation.goBack();
          },
        },
      ]
    );
  }, [task, dispatch, sync, navigation]);

  const handleImagePicker = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
      },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets[0]?.uri) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  }, []);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  const statusLabels: Record<TaskStatus, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
  };

  return (
    <AnimatedView entering={FadeIn.duration(300)} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
            placeholderTextColor={styles.placeholder?.color}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Task description"
            placeholderTextColor={styles.placeholder?.color}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            {TASK_STATUSES.map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statusButton,
                  status === s && styles.statusButtonActive,
                ]}
                onPress={() => setStatus(s)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    status === s && styles.statusButtonTextActive,
                  ]}
                >
                  {statusLabels[s]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Due Date</Text>
          <TextInput
            style={styles.input}
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={styles.placeholder?.color}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Assigned User</Text>
          <TextInput
            style={styles.input}
            value={assignedUser}
            onChangeText={setAssignedUser}
            placeholder="User name"
            placeholderTextColor={styles.placeholder?.color}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Estimated Hours</Text>
          <TextInput
            style={styles.input}
            value={estimatedHours}
            onChangeText={setEstimatedHours}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor={styles.placeholder?.color}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Image</Text>
          {imageUri ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setImageUri('')}
              >
                <Text style={styles.removeImageText}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={handleImagePicker}
            >
              <Text style={styles.imagePickerText}>Pick Image</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </AnimatedView>
  );
}
