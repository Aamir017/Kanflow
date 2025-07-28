import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Search, Filter, Plus, X, ChevronDown } from 'lucide-react';
import Column from './Column';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import taskService from '../services/taskService';
import boardService from '../services/boardService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Board = () => {
  const { user } = useAuth(); // Get the current user
  
  const [columns] = useState([
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ]);

  const [tasks, setTasks] = useState([]);
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priority: 'all',
    assignee: 'all',
    dueDate: 'all'
  });

  // Load tasks on component mount and when user changes
  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      
      // Use user-specific localStorage approach
      console.log('Loading tasks from localStorage for user:', user?.email);
      
      // Create a user-specific board for persistence
      const userId = user?.id || user?.email || 'anonymous';
      const userBoard = {
        _id: `board-${userId}`,
        title: `${user?.name || user?.email || 'My'} Kanban Board`,
        description: 'Personal task board'
      };
      setBoard(userBoard);

      // Default tasks (only shown for new users)
      const defaultTasks = [
        {
          id: '1',
          title: 'Welcome to your Kanban Board!',
          description: 'This is a sample task. You can edit or delete it and create your own tasks.',
          assignee: user?.name || user?.email || 'You',
          dueDate: '2025-07-25',
          priority: 'medium',
          tags: ['Welcome', 'Tutorial'],
          status: 'todo'
        }
      ];
      
      // Load from user-specific localStorage or use defaults
      const savedTasks = localStorage.getItem(`tasks_${userBoard._id}`);
      if (savedTasks) {
        console.log('Loading saved tasks from localStorage');
        setTasks(JSON.parse(savedTasks));
      } else {
        console.log('First time user - using welcome tasks');
        setTasks(defaultTasks);
        localStorage.setItem(`tasks_${userBoard._id}`, JSON.stringify(defaultTasks));
      }
      
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    let updatedTasks;
    
    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const columnTasks = tasks.filter(task => task.status === source.droppableId);
      const [reorderedTask] = columnTasks.splice(source.index, 1);
      columnTasks.splice(destination.index, 0, reorderedTask);
      
      updatedTasks = tasks.map(task => {
        if (task.status === source.droppableId) {
          const index = columnTasks.findIndex(t => t.id === task.id);
          return { ...task, order: index };
        }
        return task;
      });
    } else {
      // Moving between columns
      updatedTasks = tasks.map(task => {
        if (task.id === result.draggableId) {
          return { ...task, status: destination.droppableId };
        }
        return task;
      });
      
      toast.success(`Task moved to ${columns.find(col => col.id === destination.droppableId)?.title}!`);
    }
    
    setTasks(updatedTasks);
    if (board) {
      localStorage.setItem(`tasks_${board._id}`, JSON.stringify(updatedTasks));
    }
  };

  const handleAddTask = (columnId) => {
    setSelectedColumn(columnId);
    setIsModalOpen(true);
  };

  const handleAddNewTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    if (board) {
      localStorage.setItem(`tasks_${board._id}`, JSON.stringify(updatedTasks));
    }
    toast.success('Task added successfully!');
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    if (board) {
      localStorage.setItem(`tasks_${board._id}`, JSON.stringify(updatedTasks));
    }
    toast.success('Task updated successfully!');
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    if (board) {
      localStorage.setItem(`tasks_${board._id}`, JSON.stringify(updatedTasks));
    }
    toast.success('Task deleted successfully!');
  };

  const applyFilters = (tasksToFilter) => {
    return tasksToFilter.filter(task => {
      const priorityMatch = filters.priority === 'all' || task.priority === filters.priority;
      const assigneeMatch = filters.assignee === 'all' || task.assignee === filters.assignee;
      const dueDateMatch = filters.dueDate === 'all' || checkDueDateFilter(task.dueDate, filters.dueDate);
      
      return priorityMatch && assigneeMatch && dueDateMatch;
    });
  };

  const checkDueDateFilter = (dueDate, filter) => {
    if (!dueDate) return filter === 'no-date';
    
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch (filter) {
      case 'overdue':
        return diffDays < 0;
      case 'today':
        return diffDays === 0;
      case 'tomorrow':
        return diffDays === 1;
      case 'this-week':
        return diffDays >= 0 && diffDays <= 7;
      case 'no-date':
        return false;
      default:
        return true;
    }
  };

  const getFilteredTasks = (columnId) => {
    let filteredTasks = tasks
      .filter(task => task.status === columnId)
      .filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return applyFilters(filteredTasks);
  };

  const getUniqueAssignees = () => {
    const assignees = tasks.map(task => task.assignee).filter(Boolean);
    return [...new Set(assignees)];
  };

  const clearFilters = () => {
    setFilters({
      priority: 'all',
      assignee: 'all',
      dueDate: 'all'
    });
  };

  const getTotalTasks = () => tasks.length;
  const getCompletedTasks = () => tasks.filter(task => task.status === 'done').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadTasks}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Board</h1>
            <p className="text-gray-600 mt-1">
              {getTotalTasks()} tasks • {getCompletedTasks()} completed
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                showFilters 
                  ? 'text-blue-700 bg-blue-100 hover:bg-blue-200' 
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Filter size={20} className="mr-2" />
              Filter
              <ChevronDown size={16} className={`ml-1 transition-transform ${
                showFilters ? 'rotate-180' : ''
              }`} />
            </button>
            
            {/* Add Task Button */}
            <button
              onClick={() => handleAddTask('todo')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            {/* Assignee Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignee
              </label>
              <select
                value={filters.assignee}
                onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Assignees</option>
                {getUniqueAssignees().map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            </div>
            
            {/* Due Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <select
                value={filters.dueDate}
                onChange={(e) => setFilters({ ...filters, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Dates</option>
                <option value="overdue">Overdue</option>
                <option value="today">Due Today</option>
                <option value="tomorrow">Due Tomorrow</option>
                <option value="this-week">Due This Week</option>
                <option value="no-date">No Due Date</option>
              </select>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(filters.priority !== 'all' || filters.assignee !== 'all' || filters.dueDate !== 'all') && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {filters.priority !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Priority: {filters.priority}
                    <button
                      onClick={() => setFilters({ ...filters, priority: 'all' })}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.assignee !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Assignee: {filters.assignee}
                    <button
                      onClick={() => setFilters({ ...filters, assignee: 'all' })}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {filters.dueDate !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Due: {filters.dueDate.replace('-', ' ')}
                    <button
                      onClick={() => setFilters({ ...filters, dueDate: 'all' })}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Board */}
      <div className="p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map(column => (
              <Column
                key={column.id}
                column={column}
                tasks={getFilteredTasks(column.id)}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddNewTask}
        columnId={selectedColumn}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateTask={handleUpdateTask}
        task={selectedTask}
      />
    </div>
  );
};

export default Board;
