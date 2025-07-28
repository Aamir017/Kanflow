// Column definitions
export const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'gray' },
  { id: 'inprogress', title: 'In Progress', color: 'blue' },
  { id: 'done', title: 'Done', color: 'green' }
];

// Priority levels
export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'red' }
];

// Task status
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'inprogress',
  DONE: 'done'
};

// Local storage keys
export const STORAGE_KEYS = {
  TASKS: 'kanban_tasks',
  BOARD_SETTINGS: 'kanban_board_settings'
};

// API endpoints
export const API_ENDPOINTS = {
  TASKS: '/api/tasks',
  USERS: '/api/users',
  BOARDS: '/api/boards'
};

// Validation constraints
export const VALIDATION = {
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  ASSIGNEE_MAX_LENGTH: 50,
  TAG_MAX_LENGTH: 20,
  MAX_TAGS_PER_TASK: 5
};

// UI constants
export const UI = {
  SEARCH_DEBOUNCE_MS: 300,
  ANIMATION_DURATION: 200,
  DRAG_DELAY: 150
};
