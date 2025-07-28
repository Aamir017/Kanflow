const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'User account is deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin authorization middleware
const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Board member authorization middleware
const boardMemberAuth = async (req, res, next) => {
  try {
    const Board = require('../models/Board');
    const boardId = req.params.boardId || req.body.boardId || req.query.boardId;
    
    if (!boardId) {
      return res.status(400).json({ message: 'Board ID is required' });
    }

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    if (!board.isMember(req.user._id)) {
      return res.status(403).json({ message: 'Access denied: You are not a member of this board' });
    }

    req.board = board;
    req.userRole = board.getUserRole(req.user._id);
    next();
  } catch (error) {
    console.error('Board member auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Board admin authorization middleware
const boardAdminAuth = async (req, res, next) => {
  try {
    if (req.userRole !== 'owner' && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Board admin access required' });
    }
    next();
  } catch (error) {
    console.error('Board admin auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  auth,
  adminAuth,
  boardMemberAuth,
  boardAdminAuth
};
