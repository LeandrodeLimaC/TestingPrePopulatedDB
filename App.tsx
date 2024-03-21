import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {UsersService} from './src/services';
import {insertUser} from './src/services/users';

export interface Person {
  id: number;
  name: string;
  age: number;
}

function App(): React.JSX.Element {
  const [users, setUsers] = useState<Person[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const usersFromDB = await UsersService.selectUsers();
    setUsers(usersFromDB);
  }

  async function addUser() {
    await insertUser({name: 'Sarah Melo', age: 24});
    loadUsers();
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {users.map(user => (
          <Text key={user.id}>
            {user.name} {user.age}
          </Text>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={addUser}>
        <Text>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
