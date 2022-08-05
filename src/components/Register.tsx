import React, {useState, useEffect} from 'react';
import './Register.css'
import {RegisterForm} from '../model'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {useNavigate, Link} from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { BsEyeSlash, BsEye } from 'react-icons/bs'
function Register() {
  const [formData, setFormData] = useState<RegisterForm>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
  })
  const [passwordHide, setPasswordHide] = useState<boolean>(false)

  const {firstname, lastname, email, password, password2} = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state: any) => state.auth)

  useEffect(() => { 
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success("Registration Successful")
      navigate('/login')
    }
    if (user) {
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
    } else {
      const userData: RegisterForm = {
        firstname,
        lastname,
        email,
        password,
        password2
    }
      dispatch(register(userData))
  }
    
  }

   if (isLoading) {
    return <Spinner />
  }

  const showText = () => {
    setPasswordHide((passwordHide) => !passwordHide)
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
          <div className='register_form_div '>
            <input type='text' placeholder='Email'  className='register_form_input' id='email' name='email' value={email} onChange={handleChange} />
          </div>
          <div className='register_form_div'>
            <input type={passwordHide ? "text" : "password"} placeholder="Password"  className='register_form_input' id='password' name='password' value={password} onChange={handleChange} />
          </div>
            <div onClick={showText} className="btn_pass">
              {
              passwordHide ? <BsEyeSlash color='black' size={20} /> : <BsEye color='black' size={20} />
            }
            </div>
          <div  className='register_form_div'>
            <input  className='register_form_input' type='password' placeholder="Confirm Password" name='password2' id='password2' value={password2} onChange={handleChange} />
          </div>
          <div className='register_form_div'>
            <button className='register_form_btn'>Register</button>
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