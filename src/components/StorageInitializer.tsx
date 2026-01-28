import { useStorageSync } from '../hooks/useStorageSync';

export function StorageInitializer() {
  // useStorageSync will handle delayed initialization
  useStorageSync();
  return null;
}
