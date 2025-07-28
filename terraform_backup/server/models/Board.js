const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Board title is required'],
    trim: true,
    maxlength: [100, 'Board title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Board description cannot exceed 500 characters']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Board must have an owner']
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['admin', 'member', 'viewer'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  columns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column'
  }],
  settings: {
    isPublic: {
      type: Boolean,
      default: false
    },
    allowComments: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'blue', 'green'],
      default: 'light'
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
boardSchema.virtual('taskCount', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'board',
  count: true
});

// Virtual for member count
boardSchema.virtual('memberCount').get(function() {
  return this.members.length;
});

// Index for faster queries
boardSchema.index({ owner: 1, createdAt: -1 });
boardSchema.index({ 'members.user': 1 });
boardSchema.index({ title: 'text', description: 'text' });

// Middleware to populate references
boardSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'owner',
    select: 'name email'
  }).populate({
    path: 'members.user',
    select: 'name email'
  });
  next();
});

// Method to check if user is member
boardSchema.methods.isMember = function(userId) {
  return this.members.some(member => member.user._id.equals(userId)) || this.owner._id.equals(userId);
};

// Method to get user role
boardSchema.methods.getUserRole = function(userId) {
  if (this.owner._id.equals(userId)) return 'owner';
  const member = this.members.find(member => member.user._id.equals(userId));
  return member ? member.role : null;
};

// Method to add member
boardSchema.methods.addMember = function(userId, role = 'member') {
  if (!this.isMember(userId)) {
    this.members.push({
      user: userId,
      role: role
    });
  }
  return this.save();
};

// Method to remove member
boardSchema.methods.removeMember = function(userId) {
  this.members = this.members.filter(member => !member.user._id.equals(userId));
  return this.save();
};

module.exports = mongoose.model('Board', boardSchema);
