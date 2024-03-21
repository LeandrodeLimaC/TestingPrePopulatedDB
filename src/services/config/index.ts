import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
SQLite.DEBUG(false);

export const openConnection = async () => {
  const db = await SQLite.openDatabase({
    name: 'users.db',
    createFromLocation: '~users.db',
    location: 'Library',
  });

  return db;
};

export const getDbInstance = async () => openConnection();

export * from './utils';
