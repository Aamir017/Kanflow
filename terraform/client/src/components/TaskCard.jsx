import React, { useState, useEffect, useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, User, AlertCircle, Edit, Trash2, MoreHorizontal } from 'lucide-react';

const TaskCard = ({ task, index, onEditTask, onDeleteTask }) => {
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActions]);
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3
            hover:shadow-md transition-shadow duration-200
            ${snapshot.isDragging ? 'shadow-lg rotate-2 transform' : ''}
          `}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900 flex-1">
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              {task.priority && (
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium border
                  ${getPriorityColor(task.priority)}
                `}>
                  {task.priority}
                </span>
              )}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActions(!showActions);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <MoreHorizontal size={12} />
                </button>
                {showActions && (
                  <div ref={actionsRef} className="absolute right-0 top-6 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1 min-w-[120px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditTask(task);
                        setShowActions(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit size={14} className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Are you sure you want to delete this task?')) {
                          onDeleteTask(task.id);
                        }
                        setShowActions(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {task.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              {task.assignee && (
                <div className="flex items-center space-x-1">
                  <User size={12} />
                  <span>{task.assignee}</span>
                </div>
              )}
              {task.dueDate && (
                <div className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            
            {task.tags && task.tags.length > 0 && (
              <div className="flex space-x-1">
                {task.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {task.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{task.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
