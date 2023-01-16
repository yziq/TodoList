import axios from 'axios';

export const addTodoItem = (description, dueDate, completedStatus = false) => {
  return axios.post('/api/todos', {
    description,
    dueDate,
    completedStatus
  });
}

export const getTodoItem = (id) => {
  return axios.get('/api/todos/' + id);
}

export const updateTodoItem = (id, description, dueDate, completedStatus) => {
  return axios.put('/api/todos/' + id, {
    description,
    dueDate,
    completedStatus
  })
}

export const deleteTodoItem = (id) => {
  return axios.delete('/api/todos/' + id);
}