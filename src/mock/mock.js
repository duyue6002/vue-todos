import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import {
  Todos
} from './data/todoList';

export default {
  start() {
    let mock = new MockAdapter(axios);
    mock.onGet('/todo/list').reply(config => {
      let mockTodo = Todos.map(tode => {
        return {
          id: tode.id,
          title: tode.title,
          count: tode.record.filter((data) => {
            if (data.checked === false) return true;
            return false;
          }).length,
          locked: tode.locked,
          isDelete: tode.isDelete
        };
      }).filter(tode => {
        if (tode.isDelete === true) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todos: mockTodo
          }]);
        }, 200);
      });
    });

    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200]);
        }, 200);
      });
    });
  }
};
