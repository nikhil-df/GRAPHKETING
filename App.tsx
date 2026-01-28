/**
 * @format
 */
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { AppNavigator } from './src/navigation';
import { useNavigationTheme } from './src/theme';
import { useAppStyles } from './src/theme/styles';
import { StorageInitializer } from './src/components/StorageInitializer';

function App() {
  const theme = useNavigationTheme();
  const styles = useAppStyles();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Provider store={store}>
          <StorageInitializer />
          <NavigationContainer theme={theme}>
            <StatusBar
              barStyle={theme.dark ? 'light-content' : 'dark-content'}
              backgroundColor={theme.colors.background}
            />
            <AppNavigator />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
