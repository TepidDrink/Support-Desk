import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { closeTicket, getTicket } from '../features/tickets/ticketSlice'

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message }
          = useSelector((state) => state.tickets)

  const { ticketId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
  }, [isError, message, dispatch, ticketId])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  if (isLoading) {
    return <Spinner/>
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return <div className='ticket-page'>
    <header className='ticket-header'>
      <BackButton/>
      <h2>
        Ticket ID: { ticket._id }
        <span className={ `status status-${ ticket.status }` }>{ ticket.status }</span>
      </h2>
      <h3>
        Date Submitted: { new Date(ticket.createdAt).toLocaleString('en-UK') }
      </h3>
      <h3>Product: { ticket.product }</h3>
      <hr/>
      <div className='ticket-desc'>
        <h3>Description of Issue</h3>
        <p>{ ticket.description }</p>
      </div>
    </header>

    {ticket.status !== 'closed' && (
      <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
    )}
  </div>
}

export default Ticket
