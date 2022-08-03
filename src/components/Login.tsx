import { useState, useEffect } from 'react';
import { LoginForm } from '../model';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate, Link } from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify';
import Spinner from './Spinner';


function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  })

  const { email, password } = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state: any) => state.auth)

  useEffect(() => { 
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && user) {
      toast.success("Login Successful")
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
     const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData: LoginForm = {
      email,
      password,
    }
    dispatch(login(userData))
  }
  
  if (isLoading) {
    <Spinner />
  }

  return (
    <div className='App'>
      <div className='register'>
        <h1 className='register_heading'>Login</h1>
      </div>
      <div className='register_form'>
        <form onSubmit={onSubmit}>
          <div className='register_form_div'>
            <input type='text' placeholder='Email'  className='register_form_input' id='email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className='register_form_div'>
            <input type='password' placeholder="Password"  className='register_form_input' id='password' name='password' value={password} onChange={handleChange} />
          </div>
          <div className='register_form_div'>
            <input type='submit' placeholder="Register"  className='register_form_btn' />
          </div>
        </form>
         <div className='forgot_password'>
          <p>forgot password?</p>
          <Link className='register_text' to='/register'>
          <p>Register</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login