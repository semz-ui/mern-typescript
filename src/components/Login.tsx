import { useState, useEffect } from 'react';
import { LoginForm } from '../model';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useNavigate, Link } from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { BsEyeSlash, BsEye } from 'react-icons/bs'


function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  })
  const [passwordHide, setPasswordHide] = useState<boolean>(false)

  const { email, password } = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector((state: any) => state.auth)

  useEffect(() => { 
    if (isError) {
      toast.error(message)
    }
    if (user) {
      navigate('/')
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

  const showText = () => {
    setPasswordHide((passwordHide) => !passwordHide)
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
            <input type={passwordHide ? "text" : "password"} placeholder="Password"  className='register_form_input' id='password' name='password' value={password} onChange={handleChange} />
          </div>
          <div onClick={showText} className="btn_pass">
              {
              passwordHide ? <BsEyeSlash color='black' size={20} /> : <BsEye color='black' size={20} />
            }
            </div>
          <div className='register_form_div'>
            <button className='register_form_btn'>Login</button>
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