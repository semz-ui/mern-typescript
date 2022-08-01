import { Todo } from '../model';
import './SingleTodo.css'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone} from 'react-icons/md'
import React, { useEffect, useRef, useState } from 'react';


interface TodoProps {
    todo: Todo; 
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
function SingleTodo({todo, todos, setTodos}: TodoProps) {

    const [edit, setEdit] = useState<boolean>(false);
    const [newTodo, setNewTodo] = useState<string>(todo.todo);

  const done = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const submit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => todo.id === id ? {...todo, todo: newTodo} : todo))
    setEdit(false);
  }
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      inputRef.current?.focus();
  }, [edit])


  return (
    <form className='todos_single' onSubmit={(e) => submit(e, todo.id)}>
        {edit ? (
            <input ref={inputRef} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className='todos__single__text' />
        ) : (
        todo.isDone ? 
        (<s className='todos__single__text'>
        {todo.todo}
      </s>) : 
      (<span className='todos__single__text'>
        {todo.todo}
      </span>)
        ) }
      
      <div>
        <span className='icon' onClick={ () => {
          if(!edit && !todo.isDone) {
            setEdit(!edit)
          }
        } }><AiFillEdit /></span>
        <span className='icon' onClick={() => deleteTodo(todo.id)}><AiFillDelete /></span>
        <span className='icon' onClick={() => done(todo.id)}><MdDone /></span>
      </div>
    </form>
  )
}

export default SingleTodo