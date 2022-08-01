import React from 'react'
import { Todo } from '../model'
import SingleTodo from './SingleTodo';
import './TodoList.css'
interface Todos {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
function TodoList({todos, setTodos}: Todos)  {
  return (
    <div className='todos'>
        {todos.map((todo) => {
            return (
                <SingleTodo todo={todo} setTodos={setTodos} todos={todos} />
            )
        })}
    </div>
  )
}

export default TodoList