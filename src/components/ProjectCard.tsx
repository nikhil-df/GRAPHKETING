import React, { memo, useCallback, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { Project } from '../utils/types';
import { ProgressBar } from './ProgressBar';
import { useProjectCardStyles } from '../theme/styles';

interface ProjectCardProps {
  project: Project & { totalTasks: number; completion: number };
  onPress: (projectId: string) => void;
  onRenameRequest: (projectId: string, currentName: string) => void;
  onDeleteRequest: (projectId: string) => void;
}

function ProjectCardComponent({
  project,
  onPress,
  onRenameRequest,
  onDeleteRequest,
}: ProjectCardProps) {
  const styles = useProjectCardStyles();
  const menuButtonRef = useRef<TouchableOpacity | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const handlePress = useCallback(
    () => onPress(project.id),
    [onPress, project.id]
  );

  const openMenu = useCallback(() => {
    menuButtonRef.current?.measureInWindow((x, y, w, h) => {
      const { width: screenW, height: screenH } = Dimensions.get('window');
      const menuW = 180;
      const margin = 12;
      const preferredLeft = x + w - menuW;
      const left = Math.max(margin, Math.min(preferredLeft, screenW - menuW - margin));
      const preferredTop = y + h + 8;
      const top = Math.max(margin, Math.min(preferredTop, screenH - margin));

      setMenuPos({ top, left });
      setMenuOpen(true);
    });
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const confirmDelete = useCallback(() => {
    closeMenu();
    Alert.alert(
      'Delete Project',
      `Delete "${project.name}"? This will delete all tasks in the project too.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDeleteRequest(project.id),
        },
      ]
    );
  }, [closeMenu, onDeleteRequest, project.id, project.name]);

  const handleRename = useCallback(() => {
    closeMenu();
    onRenameRequest(project.id, project.name);
  }, [closeMenu, onRenameRequest, project.id, project.name]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>
          {project.name}
        </Text>
        <TouchableOpacity
          ref={(node) => {
            menuButtonRef.current = node;
          }}
          style={styles.menuButton}
          onPress={openMenu}
          accessibilityRole="button"
          accessibilityLabel={`Project menu for ${project.name}`}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.taskCount}>
        {project.totalTasks} {project.totalTasks === 1 ? 'task' : 'tasks'}
      </Text>
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={project.completion}
          label={`${Math.round(project.completion * 100)}% complete`}
        />
      </View>

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.menuBackdrop} onPress={closeMenu}>
          <View
            style={[styles.menuPopover, { top: menuPos.top, left: menuPos.left }]}
          >
            <TouchableOpacity style={styles.menuItem} onPress={handleRename}>
              <Text style={styles.menuItemText}>Rename</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={confirmDelete}>
              <Text style={styles.menuItemDangerText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
