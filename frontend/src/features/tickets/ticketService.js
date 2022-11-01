import axios from 'axios'
import { createConfig } from '../../utils'

const API_URL = '/api/tickets'

const createTicket = async (ticketData, token) => {
  const response = await axios.post(
    API_URL,
    ticketData,
    createConfig(token))
  return response.data
}

const getTickets = async (token) => {
  const response = await axios.get(
    API_URL,
    createConfig(token))
  return response.data
}

const getTicket = async (ticketId, token) => {
  const response = await axios.get(
    `${ API_URL }/${ ticketId }`,
    createConfig(token))
  return response.data
}

const closeTicket = async (ticketId, token) => {
  const response = await axios.put(
    `${ API_URL }/${ ticketId }`,
    { status: 'closed' },
    createConfig(token))
  return response.data
}

const updateTicket = async (ticketId, ticketData, token) => {
  const response = await axios.put(
    `${ API_URL }/${ ticketId }`,
    ticketData,
    createConfig(token))
  return response.data
}

const deleteTicket = async (ticketId, token) => {
  const response = await axios.delete(
    `${ API_URL }/${ ticketId }`,
    createConfig(token))
  return response.data
}


const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
  updateTicket,
  deleteTicket,
}

export default ticketService
