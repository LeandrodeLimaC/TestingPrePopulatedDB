import {ResultSet, SQLError, Transaction} from 'react-native-sqlite-storage';
import {getDbInstance} from '.';

export const rowsArrayFrom = <T>(result: ResultSet): T[] => {
  const tmp: T[] = [];
  for (let i = 0; result.rows.length > i; i++) {
    tmp.push(result.rows.item(i) as T);
  }

  return tmp;
};

interface ExecuteAsyncSqlProps<T extends any> {
  query: string;
  params?: unknown[];
  onSuccess: (tx: Transaction, result: ResultSet) => T;
  onError?: (tx: Transaction, error: SQLError) => void;
}

export const executeAsyncSql = async <T = void>({
  query,
  params = [],
  onSuccess,
  onError = console.log,
}: ExecuteAsyncSqlProps<T>) => {
  const db = await getDbInstance();

  return new Promise<T>(async resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        query,
        params,
        (tx, result) => {
          resolve(onSuccess(tx, result));
        },
        onError,
      );
    });
  });
};
