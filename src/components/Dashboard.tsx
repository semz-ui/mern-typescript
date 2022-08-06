import React, { useState } from 'react'
import InputField from './InputField'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate, Link } from 'react-router-dom';
import TodoList from './TodoList'
import { Todo } from '../model'
import { logout, reset } from '../features/auth/authSlice';
import '../App.css'

function Dashboard() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const { user } = useAppSelector((state: any) => state.auth)

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(todo.length > 0) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
      setTodo("");
    }
  }
  return (
     <div className="App">
      {
        user ? 
          <div className='logout_btn'>
        <button className='btn' onClick={onLogout}>Logout</button>
      </div>
        
        : 
          <div className='logout_btn'>
            <Link to='/login'>
              <button className='btn'>Login</button>
            </Link>
      </div>
        
      }
      {
        user ? (
          <>
             <span className='heading'>Taskify</span>
             <p>Welcome {user.firstname}</p>
          </>
        ) : <p></p>
      }
      {
        user ? (
          <>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} />
          </>
        ): 
        (
          <div className='notloggedin_text'>
            <span className='heading'>Taskify</span>
            <p className='heading not_loggedin'>Please login to continue</p>
          </div>
        )
      }
    </div>
  )
}

export default Dashboard