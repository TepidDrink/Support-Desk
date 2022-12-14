import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'
import Spinner from '../components/Spinner'
import { createNote, getNotes } from '../features/notes/noteSlice'
import { closeTicket, getTicket } from '../features/tickets/ticketSlice'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}
Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticket, isLoading, isError, message }
          = useSelector((state) => state.tickets)
  const { notes, isLoading: notesIsLoading, isError: notesIsError }
          = useSelector((state) => state.notes)

  const { ticketId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
  }, [isError, message, dispatch, ticketId])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
    setNoteText('')
    closeModal()
  }

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading || notesIsLoading) {
    return <Spinner/>
  }

  if (isError || notesIsError) {
    return <h3>Something Went Wrong</h3>
  }

  return <div className='ticket-page'>
    <header className='ticket-header'>
      <BackButton url='/tickets'/>
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

    { ticket.status !== 'closed' && (
      <button onClick={ openModal } className='btn'><FaPlus/> Add Note</button>
    ) }

    <Modal
      isOpen={ modalIsOpen }
      onRequestClose={ closeModal }
      style={ customStyles }
      contentLabel='Add Note'>
      <h2>Add Note</h2>
      <button className='btn-close' onClick={ closeModal }>X</button>

      <form onSubmit={ onNoteSubmit }>
        <div className='form-group'>
          <textarea
            name='noteText'
            id='noteText'
            className='form-control'
            placeholder='Note text'
            value={ noteText }
            onChange={ (e) => setNoteText(e.target.value) }></textarea>
        </div>

        <div className='form-group'>
          <button className='btn' type='submit'>Submit</button>
        </div>
      </form>
    </Modal>

    { notes.map((note) => (
      <NoteItem key={ note._id } note={ note }/>
    )) }

    { ticket.status !== 'closed' && (
      <button onClick={ onTicketClose } className='btn btn-block btn-danger'>Close Ticket</button>
    ) }
  </div>
}

export default Ticket
