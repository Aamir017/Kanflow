const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Task title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Task description cannot exceed 500 characters']
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Task must belong to a board']
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: [true, 'Task must belong to a column']
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  dueDate: {
    type: Date,
    default: null
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: {
    type: [String],
    default: [],
    validate: [arrayLimit, '{PATH} exceeds limit of 10']
  },
  completionStatus: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed', 'archived'],
    default: 'not_started'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Validate array length
function arrayLimit(val) {
  return val.length <= 10;
}

// Index for faster queries
taskSchema.index({ board: 1, column: 1, isActive: 1 });
taskSchema.index({ column: 1, completionStatus: 1 });

taskSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Middleware to populate references
taskSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'assignee',
    select: 'name email'
  }).populate({
    path: 'creator',
    select: 'name email'
  });
  next();
});

// Method to change completion status
taskSchema.methods.markAsCompleted = function() {
  this.completionStatus = 'completed';
  return this.save();
};

module.exports = mongoose.model('Task', taskSchema);
