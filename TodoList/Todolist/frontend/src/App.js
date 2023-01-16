import { AppContext } from './AppContextProvider';
import { useContext } from 'react';
import useGet from './hooks/useGet';
import { Routes, Route} from 'react-router-dom';
import TodoItem from './views/todoItem';
import TodoItemAdd from './views/todoItemAdd';
import TodoItems from './views/todoItems';

function App() {

  // const { message } = useContext(AppContext);
  // const { data: itemList } = useGet('/api/todos', []);

  return (
    <Routes>
      <Route path='/' element={<TodoItems />}/>
      <Route path='/todos/:id' element={<TodoItem />} />
      <Route path='/add' element={<TodoItemAdd />} />
    </Routes>
  );
}

export default App;