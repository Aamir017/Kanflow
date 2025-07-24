# Frontend - Kanban Board Application

This is the frontend of the MERN stack Kanban board application, built with React, Vite, and Tailwind CSS.

## 🚀 Features

### ✅ Completed
- **Responsive Kanban Board Layout** with three columns: To Do, In Progress, Done
- **Drag and Drop Functionality** using @hello-pangea/dnd
- **Task Management**:
  - Add new tasks with detailed information
  - Edit task properties (title, description, assignee, due date, priority, tags)
  - Delete tasks
  - Move tasks between columns
- **Beautiful UI** with Tailwind CSS
- **Search Functionality** to filter tasks
- **Priority Levels** (Low, Medium, High) with color coding
- **Task Cards** with rich information display
- **Modal System** for adding new tasks
- **Local State Management** with React hooks

### 🎨 Components

#### 1. **Board Component** (`src/components/Board.jsx`)
- Main container for the entire Kanban board
- Manages global state for tasks and columns
- Implements drag-and-drop context
- Handles search functionality
- Provides header with stats and actions

#### 2. **Column Component** (`src/components/Column.jsx`)
- Represents individual columns (To Do, In Progress, Done)
- Implements droppable area for tasks
- Shows task count and column actions
- Handles empty state display

#### 3. **TaskCard Component** (`src/components/TaskCard.jsx`)
- Individual task representation
- Draggable task item
- Displays task details (title, description, assignee, due date, priority, tags)
- Color-coded priority badges
- Responsive design

#### 4. **AddTaskModal Component** (`src/components/AddTaskModal.jsx`)
- Modal for creating new tasks
- Form validation
- Rich input fields for all task properties
- Supports tags input with comma separation
- Date picker for due dates
- Priority selection dropdown

### 🛠️ Technical Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS 3** - Utility-first CSS framework
- **@hello-pangea/dnd** - Drag and drop functionality (React 19 compatible)
- **lucide-react** - Beautiful icons
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### 📁 Project Structure

```
src/
├── components/
│   ├── Board.jsx           # Main Kanban board
│   ├── Column.jsx          # Individual columns
│   ├── TaskCard.jsx        # Task card items
│   └── AddTaskModal.jsx    # New task modal
├── utils/
│   ├── helpers.js          # Utility functions
│   └── constants.js        # App constants
├── App.jsx                 # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles with Tailwind
```

### 🎯 Key Features Implemented

1. **Drag and Drop**:
   - Tasks can be dragged between columns
   - Smooth animations and visual feedback
   - Proper state management for position changes

2. **Task Management**:
   - Create tasks with comprehensive details
   - Priority levels with color coding
   - Due date tracking
   - Tag system for categorization
   - Assignee assignment

3. **Search and Filter**:
   - Real-time search across task titles, descriptions, and assignees
   - Filter placeholder for future enhancements

4. **Responsive Design**:
   - Mobile-friendly layout
   - Responsive grid system
   - Touch-friendly drag and drop

5. **User Experience**:
   - Loading states
   - Empty state handling
   - Smooth transitions
   - Intuitive icons and visual cues

### 🔧 Configuration

#### Tailwind CSS Configuration
```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Vite Configuration
- Hot module replacement enabled
- PostCSS integration
- ES modules support

### 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

### 🎨 Design System

#### Colors
- **Primary**: Blue (used for actions and in-progress items)
- **Success**: Green (used for completed items)
- **Warning**: Yellow (used for medium priority)
- **Danger**: Red (used for high priority)
- **Neutral**: Gray (used for todo items and general UI)

#### Typography
- **System fonts**: system-ui, Avenir, Helvetica, Arial, sans-serif
- **Font weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

#### Spacing
- **Consistent spacing**: Using Tailwind's spacing scale
- **Grid system**: CSS Grid for responsive layouts
- **Flexbox**: For component internal layouts

### 🔮 Future Enhancements

1. **Advanced Filtering**:
   - Filter by priority
   - Filter by assignee
   - Filter by due date
   - Filter by tags

2. **Task Details**:
   - Task editing modal
   - Task comments
   - Task attachments
   - Task history

3. **Board Customization**:
   - Custom columns
   - Column limits
   - Board themes
   - Column reordering

4. **Data Persistence**:
   - Local storage integration
   - Backend API integration
   - Real-time updates

5. **User Management**:
   - User avatars
   - User roles
   - Team management

6. **Analytics**:
   - Task completion metrics
   - Time tracking
   - Progress charts

### 📝 Notes

- The application uses mock data for demonstration
- All components are fully functional and interactive
- Responsive design works on mobile and desktop
- Code is well-structured and maintainable
- TypeScript support can be added easily

This frontend provides a solid foundation for a production-ready Kanban board application with modern React practices and beautiful UI.
