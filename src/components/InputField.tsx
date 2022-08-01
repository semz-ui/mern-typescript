import { useRef } from 'react';
import './InputField.css';

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

function InputField({todo, setTodo, handleAdd}: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className='input' onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur()
    }}>
        <input type='text' placeholder='Enter a task' className='input__box' value={todo} onChange={(e) => setTodo(e.target.value)} ref={inputRef} />
        <button type='submit' className='input__button'>Go</button>
    </form>
  )
}

export default InputField