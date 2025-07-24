const express = require('express');
const { body, param } = require('express-validator');
const { auth, boardMemberAuth, boardAdminAuth } = require('../middleware/auth');
const Column = require('../models/Column');

const router = express.Router();

// @route   POST /api/columns
// @desc    Create a new column
// @access  Private
router.post('/',
  auth,
  // boardAdminAuth,
  [
    body('title', 'Title is required').notEmpty(),
    body('title', 'Title must not exceed 50 characters').isLength({ max: 50 })
  ],
  async (req, res) => {
    try {
      const { title, boardId, position, color } = req.body;

      const newColumn = new Column({
        title,
        board: boardId,
        position,
        color: color || 'gray',
      });

      const column = await newColumn.save();
      res.status(201).json(column);
    } catch (error) {
      console.error('Error creating column:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/columns/:columnId
// @desc    Update a column
// @access  Private
router.put('/:columnId',
  auth,
  boardAdminAuth,
  [
    body('title', 'Title must not exceed 50 characters').optional().isLength({ max: 50 }),
    body('description', 'Description must not exceed 200 characters').optional().isLength({ max: 200 })
  ],
  async (req, res) => {
    try {
      const { title, description, position, color } = req.body;

      const column = await Column.findById(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }

      if (title !== undefined) column.title = title;
      if (description !== undefined) column.description = description;
      if (position !== undefined) column.position = position;
      if (color !== undefined) column.color = color;

      const updatedColumn = await column.save();
      res.json(updatedColumn);
    } catch (error) {
      console.error('Error updating column:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/columns/:columnId
// @desc    Delete a column
// @access  Private
router.delete('/:columnId',
  auth,
  boardAdminAuth,
  async (req, res) => {
    try {
      const column = await Column.findById(req.params.columnId);
      if (!column) {
        return res.status(404).json({ message: 'Column not found' });
      }
      await column.deleteOne();
      res.json({ message: 'Column deleted successfully' });
    } catch (error) {
      console.error('Error deleting column:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
