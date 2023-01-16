import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContextProvider";
import { Link } from 'react-router-dom';
const styles = {
  table: {
    width: '50%',
    margin: 'auto',
  },
  action: {
    textAlign: 'center'
  },
  createButton: {
    margin: '0 0 10px 10px' 
  },
  sortButton: {
    margin: '10px 0 10px 10px',
    fontWeight: 'bold'
  }
}

function TodoItems() {
  const [sort, setSort] = useState(1);
  const { todoItems: data, refresh, isLoading } = useContext(AppContext);
  const [todoItems, setTodoItems] = useState(data);  
  useEffect(() => {
    refresh();
  }, []);
  useEffect(() => {
    let sortedTodoItems = [...data];
    sortedTodoItems.sort((prev, next) => {
      if (sort === 1) {
        return new Date(next.dueDate).getTime() - new Date(prev.dueDate).getTime();
      } else {
        return new Date(prev.dueDate).getTime() - new Date(next.dueDate).getTime();
      }
    });
    setTodoItems(sortedTodoItems);
  }, [data, sort]);
  const TodoItems = todoItems.map((todoItem, index) => {
    return <tr key={todoItem._id}>
      <td>{index + 1}</td>
      <td>{todoItem.description}</td>
      <td>{new Date(todoItem.dueDate).toLocaleString()}</td>
      <td>{todoItem.completedStatus ? 'Finshed' : 'Not Finished'}</td>
      <td style={styles.action}>
        <Link to={'/todos/' + todoItem._id}>Details</Link>
      </td>
    </tr>
  })
  return <div>
    <table border="1" style={styles.table}>
      <caption>
      <span style={styles.loadingText}>{isLoading ? 'Loading...' : ''}</span>
        <span>TODO ITEMS</span>
        <Link to={'/add'}>
          <button style={styles.createButton}>Create</button>
        </Link>
      </caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>
            DueDate
            <button onClick={() => setSort(sort * -1)} style={styles.sortButton}>Sort {sort === 1 ? '↓' : '↑' }</button>
          </th>
          <th>CompletedStatus</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {TodoItems}
      </tbody>
    </table>
  </div>
}

export default TodoItems;