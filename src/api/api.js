import axios from 'axios';

export const getTodoList = params => {
  return axios.get(`/todo/list`, {
    params
  });
};

export const addTodo = params => {
  return axios.post(`/todo/addTodo`, params).then(res => res.data);
};
