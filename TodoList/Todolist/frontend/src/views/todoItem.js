import { useEffect, useState } from 'react';
import { useParams, Link,useNavigate } from 'react-router-dom';
import { deleteTodoItem, getTodoItem, updateTodoItem } from '../http';
import dayjs from 'dayjs';

function TodoItem() {
  const navigate = useNavigate();
  const [going, setGoing] = useState('');
  const {id} = useParams();
  const [todoItem, setTodoItem] = useState(null);
  const [reload, setReload] = useState(true);
  const handleFinish = () => {
    setGoing("Requesting to finish todo item................");
    setTodoItem({
      ...todoItem,
      completedStatus: true
    })
    updateTodoItem(id, todoItem.description, todoItem.dueDate, true)
    .then(res => {
      setReload(!reload);
      // alert('Success to finish todo item!');
      setGoing('');
    }, err => {
      setReload(!reload);
      setGoing('');
      alert('PUT '+err);
    })
  }
  const handleDelete = () => {
    setGoing("Request deleting todo item ..........................");
    deleteTodoItem(id)
    .then(res => {
      alert('Success to delete todo item!');
      setGoing('');
      navigate('/');
    }, err => {
      setGoing('');
      alert('DELETE '+err);
    })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setGoing("Request updating todo item................");
    updateTodoItem(id, todoItem.description, todoItem.dueDate, todoItem.completedStatus)
    .then(res => {
      alert('Success to update todo item!');
      setGoing('');
      setReload(!reload);
    }, err => {
      setGoing('');
      setReload(!reload);
      alert('PUT '+err);
    })
  }
  useEffect(() => {
    getTodoItem(id)
    .then(res => {
      if (res && res.data) {
        setTodoItem(res.data);
      }
    }, err => {
      alert('GET '+err);     
    });
  }, [id, reload]);
  if (todoItem === null) {
    return <></>
  }
  return <div>
    <h1>Todo Details</h1>
    <Link to={'/'}>Back</Link>
    <form onSubmit={handleFormSubmit}>
      <p>Description:</p>
      <p>
        <textarea value={todoItem.description} 
                  cols={40} 
                  rows={10} 
                  required
                  onChange={(event) => setTodoItem({...todoItem, description: event.target.value})}/>
      </p>
      <p>Due Date:</p>
      <p>
        <input type={'datetime-local'} 
               required
               value={dayjs(todoItem.dueDate).format('YYYY-MM-DDTHH:mm')}
               onChange={(event) => {
                 setTodoItem({...todoItem, dueDate: event.target.value})
               }}/>
      </p>
      <p>CompletedStatus:</p>
      <p>{todoItem.completedStatus ? 'Finished' : 'Not Finished'}</p>
      <p>
        <button type='button' onClick={handleFinish}>Finish</button>
        <input type={'submit'} value='Update' />
        <button type='button' onClick={handleDelete}>Delete</button>
      </p>
    </form>
    <p>{going}</p>
  </div>
}

export default TodoItem;