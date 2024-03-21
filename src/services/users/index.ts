import {Person} from '../../../App';
import {executeAsyncSql, rowsArrayFrom} from '../config';

export const selectUsers = async () => {
  const query = 'SELECT * from Users';

  return executeAsyncSql<Person[]>({
    query,
    onSuccess: (_, result) => rowsArrayFrom(result),
  });
};

interface InsertUserProps {
  name: string;
  age: number;
}

export const insertUser = async (user: InsertUserProps) => {
  const params = [user.name, user.age];
  const query = `
    INSERT INTO 
    Users
    (
      name, 
      age
    )
    VALUES
    (?, ?)
  `;

  return await executeAsyncSql({
    query,
    params,
    onSuccess: (_, result) => {
      if (result.rowsAffected > 0) {
        return 'Usuario inserido com sucesso';
      }
    },
  });
};
