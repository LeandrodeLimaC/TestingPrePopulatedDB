import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {openDatabase} from 'react-native-sqlite-storage';

AppRegistry.registerComponent(appName, () => App);

global.db = openDatabase(
  {
    name: 'users.db',
    createFromLocation: '~users.db',
    location: 'Library',
  },
  db => {
    return db;
  },
  error => {
    console.log('ERROR: ' + error);
  },
);
