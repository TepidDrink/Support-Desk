import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const {name, email, password, confirmPassword} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    }
  }

  return <>
    <section className='heading'>
      <h1>
        <FaUser/> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            value={name}
            onChange={onChange}
            placeholder='Enter your name'
            required
          />
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Enter your email'
            required
          />
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Choose your password'
            required
          />
          <input
            type='password'
            className='form-control'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChange}
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
