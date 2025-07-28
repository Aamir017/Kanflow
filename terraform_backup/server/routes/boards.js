const express = require('express');
const { body, param } = require('express-validator');
const { auth, boardMemberAuth, boardAdminAuth } = require('../middleware/auth');
const Board = require('../models/Board');
const Column = require('../models/Column');

const router = express.Router();

// @route   POST /api/boards
// @desc    Create a new board
// @access  Private
router.post('/',
  auth,
  [
    body('title', 'Title is required').notEmpty(),
    body('title', 'Title must not exceed 100 characters').isLength({ max: 100 })
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;

      const newBoard = new Board({
        title,
        description,
        owner: req.user._id,
        members: [{ user: req.user._id, role: 'admin' }]
      });

      const board = await newBoard.save();
      res.status(201).json(board);
    } catch (error) {
      console.error('Error creating board:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET /api/boards/:boardId
// @desc    Get a board by ID
// @access  Private
router.get('/:boardId',
  auth,
  // boardMemberAuth,
  async (req, res) => {
    try {
      const board = await Board.findById(req.params.boardId).populate('columns');
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
      res.json(board);
    } catch (error) {
      console.error('Error fetching board:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/boards/:boardId
// @desc    Update a board
// @access  Private (Board admin)
router.put('/:boardId',
  auth,
  boardAdminAuth,
  [
    body('title', 'Title must not exceed 100 characters').optional().isLength({ max: 100 }),
    body('description', 'Description must not exceed 500 characters').optional().isLength({ max: 500 })
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;

      if (title !== undefined) req.board.title = title;
      if (description !== undefined) req.board.description = description;

      const updatedBoard = await req.board.save();
      res.json(updatedBoard);
    } catch (error) {
      console.error('Error updating board:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/boards/:boardId
// @desc    Delete a board
// @access  Private (Board admin)
router.delete('/:boardId',
  auth,
  boardAdminAuth,
  async (req, res) => {
    try {
      await Column.deleteMany({ board: req.board._id });
      await req.board.deleteOne();
      res.json({ message: 'Board deleted successfully' });
    } catch (error) {
      console.error('Error deleting board:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
