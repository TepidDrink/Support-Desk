import axios from 'axios'
import { createConfig } from '../../utils'

const API_URL = '/api/tickets'

const getNotes = async (ticketId, token) => {
  const response = await axios.get(
    `${ API_URL }/${ ticketId }/notes`,
    createConfig(token))
  return response.data
}

const createNote = async (noteText, ticketId, token) => {
  const response = await axios.post(
    `${ API_URL }/${ ticketId }/notes`,
    { text: noteText },
    createConfig(token))
  return response.data
}

const noteService = {
  getNotes,
  createNote,
}

export default noteService
