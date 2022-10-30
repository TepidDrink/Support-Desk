import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { register, reset } from '../features/auth/authSlice'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { name, email, password, confirmPassword } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message }
          = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess && user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const userData = { name, email, password }
    dispatch(register(userData))
  }

  if (isLoading) {
    return <Spinner/>
  }

  return <>
    <section className='heading'>
      <h1>
        <FaUser/> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form onSubmit={ onSubmit }>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={ name }
            onChange={ onChange }
            placeholder='Enter your name'
            required
          />
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={ email }
            onChange={ onChange }
            placeholder='Enter your email'
            required
          />
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={ password }
            onChange={ onChange }
            placeholder='Choose your password'
            required
          />
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
            name='confirmPassword'
            value={ confirmPassword }
            onChange={ onChange }
            placeholder='Confirm password'
            required
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>Submit</button>
        </div>
      </form>
    </section>
  </>
}

export default Register
