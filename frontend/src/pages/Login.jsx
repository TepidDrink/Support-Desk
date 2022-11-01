import { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { login, reset } from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData

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

    const userData = { email, password }
    dispatch(login(userData))
      .unwrap()
      .then((user) => {
        toast.success(`Logged in as ${ user.name }`)
        navigate('/')
      })
      .catch(toast.error)
  }

  if (isLoading) {
    return <Spinner/>
  }

  return <>
    <section className='heading'>
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p>Please login to get support</p>
    </section>

    <section className='form'>
      <form onSubmit={ onSubmit }>
        <div className='form-group'>
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
            placeholder='Enter your password'
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

export default Login
