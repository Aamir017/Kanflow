const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Board = require('./models/Board');
const Column = require('./models/Column');
const Task = require('./models/Task');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Board.deleteMany({});
    await Column.deleteMany({});
    await Task.deleteMany({});

    console.log('Existing data cleared');

    // Create sample users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123'
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Sample users created');

    // Create sample board
    const board = new Board({
      title: 'Sample Project Board',
      description: 'A sample Kanban board for project management',
      owner: createdUsers[0]._id,
      members: [
        { user: createdUsers[0]._id, role: 'admin' },
        { user: createdUsers[1]._id, role: 'member' },
        { user: createdUsers[2]._id, role: 'member' }
      ]
    });

    const createdBoard = await board.save();
    console.log('Sample board created');

    // Create sample columns
    const columns = [
      {
        title: 'To Do',
        board: createdBoard._id,
        position: 0,
        color: 'gray'
      },
      {
        title: 'In Progress',
        board: createdBoard._id,
        position: 1,
        color: 'blue'
      },
      {
        title: 'Done',
        board: createdBoard._id,
        position: 2,
        color: 'green'
      }
    ];

    const createdColumns = await Column.insertMany(columns);
    console.log('Sample columns created');

    // Create sample tasks
    const tasks = [
      {
        title: 'Design user interface',
        description: 'Create wireframes and mockups for the new dashboard',
        board: createdBoard._id,
        column: createdColumns[0]._id, // To Do
        assignee: createdUsers[0]._id,
        creator: createdUsers[0]._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        priority: 'high',
        tags: ['Design', 'UI/UX'],
        completionStatus: 'not_started'
      },
      {
        title: 'Implement authentication',
        description: 'Set up user login and registration system',
        board: createdBoard._id,
        column: createdColumns[1]._id, // In Progress
        assignee: createdUsers[1]._id,
        creator: createdUsers[0]._id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        priority: 'high',
        tags: ['Backend', 'Security'],
        completionStatus: 'in_progress'
      },
      {
        title: 'Write unit tests',
        description: 'Create comprehensive test suite for API endpoints',
        board: createdBoard._id,
        column: createdColumns[2]._id, // Done
        assignee: createdUsers[2]._id,
        creator: createdUsers[0]._id,
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        priority: 'medium',
        tags: ['Testing', 'QA'],
        completionStatus: 'completed'
      },
      {
        title: 'Setup database',
        description: 'Configure MongoDB and create necessary collections',
        board: createdBoard._id,
        column: createdColumns[2]._id, // Done
        assignee: createdUsers[1]._id,
        creator: createdUsers[0]._id,
        dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        priority: 'medium',
        tags: ['Database', 'Setup'],
        completionStatus: 'completed'
      },
      {
        title: 'Create API documentation',
        description: 'Document all API endpoints with examples',
        board: createdBoard._id,
        column: createdColumns[0]._id, // To Do
        assignee: createdUsers[2]._id,
        creator: createdUsers[0]._id,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        priority: 'low',
        tags: ['Documentation', 'API'],
        completionStatus: 'not_started'
      }
    ];

    await Task.insertMany(tasks);
    console.log('Sample tasks created');

    console.log('\\n=== SEEDING COMPLETED ===');
    console.log('Test users created:');
    console.log('Email: john@example.com, Password: password123');
    console.log('Email: jane@example.com, Password: password123');
    console.log('Email: bob@example.com, Password: password123');
    console.log('\\nSample board and tasks have been created!');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
