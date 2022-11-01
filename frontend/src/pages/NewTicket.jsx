import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { createTicket, reset } from '../features/tickets/ticketSlice'

function NewTicket() {
  const { user }
          = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message }
          = useSelector((state) => state.tickets)

  const productList = ['iPhone', 'Macbook Pro', 'iMac', 'iPad']

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState(productList[0])
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner/>
  }

  return <>
    <BackButton url='/'/>

    <section className='heading'>
      <h1>Create New Ticket</h1>
      <p>Please fill out the form below</p>
    </section>

    <section className='form'>
      <div className='form-group'>
        <label htmlFor='name'>Customer name</label>
        <input type='text'
               className='form-control'
               value={ name }
               disabled/>
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Customer email</label>
        <input type='text'
               className='form-control'
               value={ email }
               disabled/>
      </div>

      <form onSubmit={ onSubmit }>
        <div className='form-group'>
          <label htmlFor='product'>Product</label>
          <select name='product'
                  id='product'
                  value={ product }
                  onChange={ (e) => setProduct(e.target.value) }>
            {
              productList.map((option) => (
                <option value={ option } key={ option }>{ option }</option>
              ))
            }
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='description'>Description of the issue</label>
          <textarea name='description'
                    id='description'
                    className='form-control'
                    placeholder='Description'
                    value={ description }
                    onChange={ (e) => setDescription(e.target.value) }/>
        </div>
        <div className='form-group'>
          <button className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>
  </>
}

export default NewTicket
