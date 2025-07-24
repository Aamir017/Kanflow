import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal } from 'lucide-react';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, onAddTask, onEditTask, onDeleteTask }) => {
  const getColumnColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'bg-gray-50 border-gray-200';
      case 'inprogress':
        return 'bg-blue-50 border-blue-200';
      case 'done':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getHeaderColor = (columnId) => {
    switch (columnId) {
      case 'todo':
        return 'text-gray-700';
      case 'inprogress':
        return 'text-blue-700';
      case 'done':
        return 'text-green-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className={`
      rounded-lg border-2 border-dashed p-4 min-h-[500px] flex flex-col
      ${getColumnColor(column.id)}
    `}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className={`font-semibold text-lg ${getHeaderColor(column.id)}`}>
            {column.title}
          </h2>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onAddTask(column.id)}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
            title="Add new task"
          >
            <Plus size={16} />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-md transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 transition-colors duration-200
              ${snapshot.isDraggingOver ? 'bg-blue-100 bg-opacity-50' : ''}
            `}
          >
            {tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index} 
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
            {provided.placeholder}
            
            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-sm">No tasks yet</p>
                <button
                  onClick={() => onAddTask(column.id)}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Add your first task
                </button>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
