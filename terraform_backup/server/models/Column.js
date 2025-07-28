const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Column title is required'],
    trim: true,
    maxlength: [50, 'Column title cannot exceed 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Column description cannot exceed 200 characters']
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: [true, 'Column must belong to a board']
  },
  position: {
    type: Number,
    required: [true, 'Column position is required'],
    min: 0
  },
  color: {
    type: String,
    enum: ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'],
    default: 'gray'
  },
  settings: {
    taskLimit: {
      type: Number,
      min: 0,
      default: null // null means no limit
    },
    isCollapsed: {
      type: Boolean,
      default: false
    },
    autoAssignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
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

// Virtual for task count
columnSchema.virtual('taskCount', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'column',
  count: true
});

// Virtual for tasks
columnSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'column'
});

// Index for faster queries
columnSchema.index({ board: 1, position: 1 });
columnSchema.index({ board: 1, isActive: 1 });

// Middleware to populate references
columnSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'settings.autoAssignee',
    select: 'name email'
  });
  next();
});

// Method to check if column can accept more tasks
columnSchema.methods.canAcceptTask = function(taskCount) {
  if (!this.settings.taskLimit) return true;
  return taskCount < this.settings.taskLimit;
};

// Method to move column position
columnSchema.methods.moveToPosition = function(newPosition) {
  this.position = newPosition;
  return this.save();
};

// Static method to get columns for a board
columnSchema.statics.getByBoard = function(boardId) {
  return this.find({ board: boardId, isActive: true })
    .sort({ position: 1 })
    .populate('tasks');
};

// Static method to reorder columns
columnSchema.statics.reorderColumns = async function(boardId, columnIds) {
  const bulkOperations = columnIds.map((columnId, index) => ({
    updateOne: {
      filter: { _id: columnId, board: boardId },
      update: { position: index }
    }
  }));
  
  return this.bulkWrite(bulkOperations);
};

module.exports = mongoose.model('Column', columnSchema);
