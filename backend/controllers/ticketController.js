const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Ticket = require('../models/ticketModel')

/**
 * @desc Get user tickets
 * @route GET /api/tickets
 * @access Private
 */
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id })

  res.status(200).json(tickets)
})

/**
 * @desc Get single user ticket
 * @route GET /api/tickets/:id
 * @access Private
 */
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('TicketItem not found')
  }

  if (ticket.user.toString() !== req.user.id.toString()) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(ticket)
})

/**
 * @desc update a tickets
 * @route GET /api/tickets/:id
 * @access Private
 */
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('TicketItem not found')
  }

  if (ticket.user.toString() !== req.user.id.toString()) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true })

  res.status(200).json(updatedTicket)
})

/**
 * @desc delete a ticket
 * @route DELETE /api/tickets/:id
 * @access Private
 */
const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('TicketItem not found')
  }

  if (ticket.user.toString() !== req.user.id.toString()) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await ticket.remove()

  res.status(200).json({ success: true })
})

/**
 * @desc Create user tickets
 * @route POST /api/tickets
 * @access Private
 */
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  const ticket = await Ticket.create({
    product, description, user: req.user._id, status: 'new',
  })

  res.status(201).json({ message: 'TicketItem created', payload: ticket })
})

module.exports = {
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  createTicket,
}
