# GRAPHKETING - Mini Project Management App

A production-quality React Native app for managing projects and tasks with a Kanban board interface. Built with performance, animations, and offline-first architecture in mind.

## 🎯 Features

### Core Features
- **Project Management**: Create and manage multiple projects
- **Kanban Board**: Drag & drop tasks between columns (To Do, In Progress, Done)
- **Task Details**: Full task editing with image upload support
- **Offline-First**: All data persisted locally using MMKV
- **Smooth Animations**: 60fps animations using Reanimated 3
- **Performance Optimized**: Memoized components, optimized FlatLists

### Technical Highlights
- ✅ Redux Toolkit for state management
- ✅ TypeScript throughout
- ✅ MMKV for fast local storage
- ✅ React Native Reanimated 3 for animations
- ✅ React Native Gesture Handler for drag & drop
- ✅ React Navigation with smooth transitions
- ✅ Dark mode support (system-based)
- ✅ Fake sync server simulation

## 📁 Architecture

```
src/
├── components/        # Reusable UI components (memoized)
│   ├── DraggableTaskCard.tsx
│   ├── DraggableKanbanColumn.tsx
│   ├── ProjectCard.tsx
│   ├── ProgressBar.tsx
│   ├── FAB.tsx
│   └── StorageInitializer.tsx
├── screens/           # Screen containers
│   ├── ProjectListScreen.tsx
│   ├── KanbanBoardScreen.tsx
│   └── TaskDetailsScreen.tsx
├── navigation/        # Navigation setup
│   ├── index.tsx
│   └── types.ts
├── store/             # Redux Toolkit
│   ├── index.ts
│   ├── selectors.ts
│   └── slices/
│       ├── projectsSlice.ts
│       └── tasksSlice.ts
├── services/          # Business logic
│   ├── storage.ts     # MMKV persistence
│   └── sync.ts        # Fake sync server
├── hooks/             # Custom hooks
│   ├── useStorageSync.ts
│   ├── useAppDispatch.ts
│   └── useAppSelector.ts
├── utils/             # Helpers & constants
│   ├── types.ts
│   └── constants.ts
└── theme/             # Theming system
    ├── colors.ts
    ├── styles.ts
    └── index.ts
```

## 🚀 Setup

### Prerequisites
- Node.js >= 20
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Run the app**
   ```bash
   # Android
   npm run android

   # iOS
   npm run ios
   ```

## 📱 Screens

### 1. Project List Screen
- Displays all projects in an optimized FlatList
- Shows completion percentage with animated progress bars
- Floating Action Button (FAB) to add new projects
- Tap a project to navigate to its Kanban board

### 2. Kanban Board Screen
- Three columns: To Do, In Progress, Done
- Drag & drop tasks between columns
- Swipe gestures for quick status changes
- Add task button in each column
- Smooth layout animations

### 3. Task Details Screen
- Editable fields:
  - Title
  - Description
  - Status (To Do, In Progress, Done)
  - Due Date
  - Assigned User
  - Estimated Hours
  - Image upload with preview
- Auto-save on change (debounced)
- Delete task option
- Fade-in animation on open

## 🎨 Animations

All animations use React Native Reanimated 3 for 60fps performance:

- **Progress Bars**: Spring animation from 0 to completion value
- **Drag & Drop**: Smooth pan gestures with scale and opacity feedback
- **Screen Transitions**: Native stack transitions
- **Task Cards**: Spring-based animations on drag
- **FAB**: Scale animation on press

## 💾 Storage

- **MMKV**: Fast key-value storage for projects and tasks
- **Automatic Persistence**: Data saved on every state change
- **Offline-First**: App works completely offline

## 🔄 Sync Logic

Fake sync server simulates server synchronization:
- Called on app launch
- Called when projects/tasks change
- 1.5 second delay to simulate network latency

## ⚡ Performance Optimizations

1. **Memoization**: All list items wrapped in `React.memo`
2. **FlatList Optimization**:
   - `removeClippedSubviews`
   - `maxToRenderPerBatch={10}`
   - `updateCellsBatchingPeriod={50}`
   - `initialNumToRender={10}`
   - `windowSize={10}`
3. **Reanimated Worklets**: All animations run on UI thread
4. **Selectors**: Memoized Redux selectors prevent unnecessary re-renders
5. **Callback Optimization**: `useCallback` for all event handlers

## 🛠️ Libraries

- **@reduxjs/toolkit**: State management
- **react-redux**: React bindings for Redux
- **react-native-mmkv**: Fast local storage
- **react-native-reanimated**: Animations
- **react-native-gesture-handler**: Gesture handling
- **@react-navigation/native**: Navigation
- **react-native-image-picker**: Image selection
- **react-native-safe-area-context**: Safe area handling

## 🎁 Bonus Features

- ✅ **Dark Mode**: Automatic theme switching based on system preferences
- ✅ **Smooth Animations**: All interactions are animated
- ✅ **Performance**: Optimized for 60fps even with 50+ tasks

## 📝 Code Quality

- TypeScript throughout (no `any` types)
- Clean architecture with separation of concerns
- Reusable components
- Consistent naming conventions
- Memoization where needed
- No inline styles in render loops

## 🔧 Development

```bash
# Start Metro bundler
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📄 License

Private project for hiring assignment.

---

**Built with ❤️ using React Native**
