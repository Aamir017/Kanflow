const express = require('express');
const { body, param } = require('express-validator');
const { auth, boardMemberAuth } = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/',
  auth,
  // boardMemberAuth,
  [
    body('title', 'Title is required').notEmpty(),
    body('title', 'Title must not exceed 100 characters').isLength({ max: 100 })
  ],
  async (req, res) => {
    try {
      const { title, description, columnId, boardId, assignee, dueDate, priority } = req.body;

      const newTask = new Task({
        title,
        description,
        board: boardId,
        column: columnId,
        assignee,
        creator: req.user._id,
        dueDate,
        priority,
      });

      const task = await newTask.save();
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PUT /api/tasks/:taskId
// @desc    Update a task
// @access  Private
router.put('/:taskId',
  auth,
  boardMemberAuth,
  [
    body('title', 'Title must not exceed 100 characters').optional().isLength({ max: 100 }),
    body('description', 'Description must not exceed 500 characters').optional().isLength({ max: 500 })
  ],
  async (req, res) => {
    try {
      const { title, description, column, dueDate, priority, tags } = req.body;

      const task = await Task.findById(req.params.taskId).populate('board');
      if (!task || task.board._id.toString() !== req.board._id.toString()) {
        return res.status(404).json({ message: 'Task not found or you don’t have permission' });
      }

      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (column !== undefined) task.column = column;
      if (dueDate !== undefined) task.dueDate = dueDate;
      if (priority !== undefined) task.priority = priority;
      if (tags !== undefined) task.tags = tags;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   DELETE /api/tasks/:taskId
// @desc    Delete a task
// @access  Private
router.delete('/:taskId',
  auth,
  boardMemberAuth,
  async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId).populate('board');
      if (!task || task.board._id.toString() !== req.board._id.toString()) {
        return res.status(404).json({ message: 'Task not found or you don’t have permission' });
      }
      await task.deleteOne();
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;

