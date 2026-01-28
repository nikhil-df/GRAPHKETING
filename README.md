# GRAPHKETING - Mini Project Management App

A production-quality React Native app for managing projects and tasks with a Kanban board interface. Built with performance, animations, and offline-first architecture in mind.

## 🚀 Setup Steps

### Prerequisites
- **Node.js** >= 20
- **React Native CLI** (install globally: `npm install -g react-native-cli`)
- **Android Studio** (for Android development)
  - Android SDK Platform 33+
  - Android SDK Build-Tools
  - Android Emulator or physical device
- **Xcode** (for iOS development, macOS only)
  - Xcode Command Line Tools
  - CocoaPods (`sudo gem install cocoapods`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GRAPHKETING
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Run the app**
   ```bash
   # Start Metro bundler (in one terminal)
   npm start

   # Run on Android (in another terminal)
   npm run android

   # Run on iOS (macOS only, in another terminal)
   npm run ios
   ```

### Building APK (Android)

To build a release APK:
```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at:
```
android/app/build/outputs/apk/release/app-release.apk
```

For a debug APK (faster, no signing required):
```bash
cd android
./gradlew assembleDebug
```

#### Quick try (prebuilt APK)

If you just want to quickly try the app on Android without setting up the toolchain, you can use a prebuilt APK placed in the project root (for example `app-release.apk`):

1. Copy the APK from the project root to your Android device.
2. On the device, enable installing apps from unknown sources (if prompted).
3. Open the APK on the device and confirm the installation.

## ✨ Features Implemented

### Core Project Management
- ✅ **Create Projects**: Add new projects with custom names via modal prompt
- ✅ **Project List View**: View all projects with completion statistics
- ✅ **Rename Projects**: Edit project names via hamburger menu
- ✅ **Delete Projects**: Remove projects with confirmation dialog (cascades to delete all tasks)
- ✅ **Project Cards**: Display project name, task count, and completion percentage

### Kanban Board
- ✅ **Drag & Drop**: Move tasks between columns (To Do, In Progress, Done)
- ✅ **Three Columns**: Organized workflow with status-based columns
- ✅ **Add Tasks**: Create new tasks directly from columns
- ✅ **Smooth Animations**: 60fps drag animations with visual feedback

### Task Management
- ✅ **Task Details Screen**: Full editing interface for tasks
- ✅ **Task Fields**:
  - Title and Description
  - Status selection (To Do, In Progress, Done)
  - Due Date
  - Assigned User
  - Estimated Hours
  - Image upload with preview
- ✅ **Auto-Save**: Changes saved automatically with debouncing
- ✅ **Delete Tasks**: Remove tasks with confirmation

### UI/UX Features
- ✅ **Hamburger Menu**: In-app popover menu on project cards (Rename/Delete)
- ✅ **Name Prompt Modal**: Reusable modal for project creation and renaming
- ✅ **Progress Bars**: Visual completion indicators with animations
- ✅ **Floating Action Button (FAB)**: Quick access to create new projects
- ✅ **Dark Mode**: Automatic theme switching based on system preferences
- ✅ **Smooth Transitions**: Native stack navigation animations

### Data Management
- ✅ **Offline-First**: All data persisted locally using MMKV
- ✅ **Redux State Management**: Centralized state with Redux Toolkit
- ✅ **Automatic Persistence**: Data saved on every state change
- ✅ **Fake Sync Server**: Simulated server synchronization with latency

## 📚 Libraries Used

### Core Framework
- **react** (19.2.0) - React library
- **react-native** (0.83.1) - React Native framework

### State Management
- **@reduxjs/toolkit** (^2.11.2) - Redux Toolkit for state management
- **react-redux** (^9.2.0) - React bindings for Redux

### Navigation
- **@react-navigation/native** (^7.1.28) - Navigation library
- **@react-navigation/native-stack** (^7.11.0) - Stack navigator
- **react-native-safe-area-context** (^5.5.2) - Safe area handling
- **react-native-screens** (^4.20.0) - Native screen components

### Storage & Performance
- **react-native-mmkv** (^4.1.1) - Fast key-value storage
- **react-native-nitro-modules** (^0.33.2) - Performance modules
- **react-native-worklets** (^0.7.2) - Worklet support

### Animations & Gestures
- **react-native-reanimated** (^4.2.1) - 60fps animations
- **react-native-gesture-handler** (^2.30.0) - Gesture handling for drag & drop

### Media
- **react-native-image-picker** (^8.2.1) - Image selection and upload

### Development Tools
- **typescript** (^5.8.3) - TypeScript compiler
- **eslint** (^8.19.0) - Code linting
- **prettier** (^2.8.8) - Code formatting
- **jest** (^29.6.3) - Testing framework

## 🎁 Bonus Features

### Performance Optimizations
- ✅ **Memoized Components**: All list items wrapped in `React.memo` to prevent unnecessary re-renders
- ✅ **Optimized FlatLists**: Configured with `removeClippedSubviews`, `maxToRenderPerBatch`, and `windowSize` for smooth scrolling
- ✅ **Reanimated Worklets**: All animations run on UI thread for 60fps performance
- ✅ **Memoized Selectors**: Redux selectors prevent unnecessary component updates
- ✅ **Callback Optimization**: `useCallback` for all event handlers

### User Experience
- ✅ **In-App Popover Menu**: Custom hamburger menu instead of system alerts
- ✅ **Name Validation**: Input validation for project names (required field)
- ✅ **Confirmation Dialogs**: Delete confirmations to prevent accidental deletions
- ✅ **Cascade Delete**: Deleting a project automatically removes all associated tasks
- ✅ **Auto-Focus**: Name input modals auto-focus for better UX
- ✅ **Keyboard Handling**: Proper keyboard avoidance in modals

### Code Quality
- ✅ **TypeScript**: Fully typed codebase with no `any` types
- ✅ **Clean Architecture**: Separation of concerns (components, screens, store, services)
- ✅ **Reusable Components**: Modular, reusable UI components
- ✅ **Consistent Styling**: Theme-based styling system
- ✅ **Error Handling**: Proper error states and user feedback

### Animations
- ✅ **Spring Animations**: Natural-feeling animations for progress bars and interactions
- ✅ **Drag Feedback**: Visual feedback during drag operations (scale, opacity)
- ✅ **Screen Transitions**: Smooth native stack transitions
- ✅ **Fade Animations**: Modal and screen entrance animations

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── DraggableTaskCard.tsx
│   ├── DraggableKanbanColumn.tsx
│   ├── ProjectCard.tsx          # Project card with hamburger menu
│   ├── ProgressBar.tsx
│   ├── FAB.tsx                  # Floating Action Button
│   ├── NamePromptModal.tsx      # Reusable name input modal
│   └── StorageInitializer.tsx
├── screens/           # Screen containers
│   ├── ProjectListScreen.tsx    # Main project list with create/rename/delete
│   ├── KanbanBoardScreen.tsx    # Kanban board with drag & drop
│   └── TaskDetailsScreen.tsx   # Task editing screen
├── navigation/        # Navigation setup
│   ├── index.tsx
│   └── types.ts
├── store/             # Redux Toolkit state management
│   ├── index.ts
│   ├── selectors.ts
│   └── slices/
│       ├── projectsSlice.ts     # Project CRUD operations
│       └── tasksSlice.ts         # Task CRUD operations
├── services/          # Business logic
│   ├── storage.ts               # MMKV persistence
│   └── sync.ts                  # Fake sync server
├── hooks/             # Custom React hooks
│   ├── useStorageSync.ts
│   ├── useAppDispatch.ts
│   └── useAppSelector.ts
├── utils/             # Helpers & constants
│   ├── types.ts
│   └── constants.ts
└── theme/             # Theming system
    ├── colors.ts
    ├── hooks.ts
    ├── styles.ts
    └── index.ts
```

## 🔧 Development Commands

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Run tests
npm test
```

## 📝 Code Quality Standards

- ✅ TypeScript throughout (strict mode)
- ✅ Clean architecture with separation of concerns
- ✅ Reusable, memoized components
- ✅ Consistent naming conventions
- ✅ No inline styles in render loops
- ✅ Proper error handling and user feedback
- ✅ Accessibility labels and roles

## 📄 License

Private project for hiring assignment.

---

**Built with ❤️ using React Native**
