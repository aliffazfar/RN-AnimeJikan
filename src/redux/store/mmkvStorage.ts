import {MMKV} from 'react-native-mmkv';

interface MMKVStorage {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  delete: (key: string) => void;
  clearAll: () => void;
}

const createMMKVStorage = (): MMKVStorage => {
  let data: Record<string, string> = {};

  const getString = (key: string): string | undefined => {
    return data[key];
  };

  const set = (key: string, value: string): void => {
    data[key] = value;
  };

  const delete_ = (key: string): void => {
    if (data[key]) {
      data[key] = undefined as unknown as string;
    }
  };

  const clearAll = (): void => {
    data = {};
  };

  return {
    getString,
    set,
    delete: delete_,
    clearAll,
  };
};

// #region MMKV setup
export const storage: MMKVStorage = __DEV__ ? createMMKVStorage() : new MMKV();
