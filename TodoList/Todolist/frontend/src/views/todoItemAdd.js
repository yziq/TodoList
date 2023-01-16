import { useState } from "react";
import { Link } from "react-router-dom";
import { addTodoItem } from "../http";

function TodoItemAdd() {
  const [going, setGoing] = useState('');
  const [todoItem, setTodoItem] = useState({
    description: '',
    dueDate: new Date()
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setGoing('Adding todo item......');
    addTodoItem(todoItem.description, todoItem.dueDate)
    .then(res => {
      alert('Success to add new todo item!');
      setTodoItem({description: '', dueDate: new Date()})
    }, (err) => {
      setGoing('');
      alert('POST'+err);
    })
    
  }
  return <div>
    <h1>Add Todo Item</h1>
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
               value={todoItem.dueDate}
               onChange={(event) => {
                 setTodoItem({...todoItem, dueDate: event.target.value})
               }}/>
      </p>
      <p>
        <input type={'submit'} value='add' />
      </p>
    </form>
    <p>{going}</p>
  </div>
}

export default TodoItemAdd;