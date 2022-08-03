import React, {useState, useEffect} from 'react';
import './Register.css'
import {Link} from 'react-router-dom'
import {FormData, RegisterForm} from '../model'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {useNavigate} from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify';
import Spinner from './Spinner';
function Register() {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
  })

  const {firstname, lastname, email, password, password2} = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state: any) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
      
    if (isSuccess && user) {
      toast.success(message)
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match')
    }
      const userData: RegisterForm = {
        firstname,
        lastname,
        email,
        password,
      }
      dispatch(register(userData))
    
  }

   if (isLoading) {
    <Spinner />
  }

  return (
    <div className='App'>
      <div className='register'>
        <h1 className='register_heading'>Register</h1>
      </div>
      <div className='register_form'>
        <form onSubmit={onSubmit}>
          <div className='register_form_div'>
            <input  className='register_form_input' type='text' placeholder='First Name' id='firstname' name='firstname' value={firstname} onChange={handleChange} />
          </div>
          <div className='register_form_div'>
            <input type='text' placeholder='Last Name'  className='register_form_input' id='lastname' name='lastname' value={lastname} onChange={handleChange} />
          </div>
          <div className='register_form_div'>
            <input type='text' placeholder='Email'  className='register_form_input' id='email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className='register_form_div'>
            <input type='password' placeholder="Password"  className='register_form_input' id='password' name='password' value={password} onChange={handleChange} />
          </div>
          <div  className='register_form_div'>
            <input  className='register_form_input' type='password' placeholder="Confirm Password" name='password2' id='password2' value={password2} onChange={handleChange} />
          </div>
          <div className='register_form_div'>
            <input type='submit' placeholder="Register"  className='register_form_btn' />
          </div>
        </form>
        <div className='forgot_password'>
          <p>forgot password?</p>
          <Link className='register_text' to='/login'>
          <p>Login</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register