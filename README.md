# 🚀 Kanflow - Task Management Board

**Kanflow** is a modern, intuitive Kanban-style task management application built with the MERN stack. Streamline your workflow with drag-and-drop functionality, task filtering, and real-time collaboration features.

## ✨ Features

### 🎯 Core Functionality
- **Drag & Drop Interface** - Seamlessly move tasks between columns (To Do, In Progress, Done)
- **Task Management** - Create, edit, delete, and organize tasks with ease
- **Priority System** - Assign High, Medium, or Low priority levels
- **Due Date Tracking** - Set and monitor task deadlines
- **Task Assignment** - Assign tasks to team members

### 🔍 Advanced Features
- **Smart Filtering** - Filter tasks by priority, assignee, and due date
- **Persistent Storage** - Persistent storage via MongoDB with real-time backend synchronization
- **Responsive Design** - Works flawlessly on desktop, tablet, and mobile
- **Toast Notifications** - Real-time feedback for user actions
- **Modern UI/UX** - Clean, professional interface with smooth animations

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Lightning--fast%20build-purple)
![DnD](https://img.shields.io/badge/Drag--and--Drop-React%20Beautiful%20DnD-9cf)
![Toastify](https://img.shields.io/badge/Notifications-React%20Toastify-orange)
![CSS3](https://img.shields.io/badge/Styling-CSS3-blue)


### Backend
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Mongoose](https://img.shields.io/badge/ODM-Mongoose-orange)



## 📁 Project Structure

```
kanflow/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Board.jsx            # Main kanban board
│   │   │   ├── Column.jsx           # Task columns (To Do, In Progress, Done)
│   │   │   ├── TaskCard.jsx         # Individual task cards
│   │   │   ├── AddTaskModal.jsx     # Task creation modal
│   │   │   ├── EditTaskModal.jsx    # Task editing modal
│   │   │   └── Footer.jsx           # Application footer
│   │   ├── services/                # API integration services
│   │   │   ├── api.js               # Base API configuration
│   │   │   ├── taskService.js       # Task CRUD operations
│   │   │   └── boardService.js      # Board management
│   │   ├── styles/                  # Component-specific CSS
│   │   └── App.jsx                  # Main application component
│   └── package.json                 # Frontend dependencies

├── server/                          # Backend Node.js application
│   ├── models/                      # MongoDB data models
│   ├── routes/                      # API route handlers
│   ├── middleware/                  # Custom middleware
│   └── server.js                    # Express server configuration

├── ansible/                         # Ansible configuration for provisioning
│   ├── inventory.ini                # Inventory of servers
│   ├── playbook.yml                 # Main Ansible playbook
│   └── roles/                       # Ansible roles
│       ├── common/                  # Common setup tasks
│       │   ├── tasks/
│       │   │   └── main.yml         # Common tasks
│       │   └── vars/
│       │       └── main.yml         # Common variables
│       ├── docker/                  # Docker installation & setup
│       │   ├── tasks/
│       │   │   └── main.yml         # Docker tasks
│       │   └── vars/
│       │       └── main.yml         # Docker variables
│       ├── helm/                    # Helm installation & charts
│       │   ├── tasks/
│       │   │   └── main.yml         # Helm tasks
│       │   └── vars/
│       │       └── main.yml         # Helm variables
│       ├── jenkins/                 # Jenkins server setup
│       │   ├── tasks/
│       │   │   └── main.yml         # Jenkins tasks
│       │   └── vars/
│       │       └── main.yml         # Jenkins variables
│       └── kubectl/                 # kubectl installation & setup
│           ├── tasks/
│           │   └── main.yml         # Kubectl tasks
│           └── vars/
│               └── main.yml         # Kubectl variables

├── jenkins/                         # Jenkins automation
│   ├── Jenkinsfile                  # CI/CD pipeline definition

k8s/
├── base/               # Base k8s manifests for different components
│   ├── backend/        # Backend service k8s configs
│   │   ├── configmap.yaml
│   │   ├── deployment.yaml
│   │   ├── kanflow-secrets.yaml
│   │   └── service.yaml
│   │
│   ├── frontend/       # Frontend service k8s configs
│   │   ├── configmap.yaml
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   │
│   ├── ingress/        # Ingress configs
│   │   └── ingress.yaml
│   │
│   ├── mongo/          # MongoDB configs
│   │   ├── mongodb-deployment.yaml
│   │   └── mongodb-service.yaml
│   │
│   └── namespace.yaml  # Namespace definition
├── secrets.yaml        # Additional secrets file (possibly Kubernetes Secret manifest)

├── terraform/                       # Terraform IaC scripts
│   ├── main.tf                      # Main Terraform configuration
│   ├── variables.tf                 # Variable definitions
│   └── outputs.tf                   # Output values

├── scripts/                         # Utility scripts
│   ├── check.ps1                    # Build script
│   ├── diagnose.ps1                    # Deployment helper
│   └── start.ps1 
├── .gitignore                       # Files and directories to ignore in Git
├── README.md                        # Main project README
├── SETUP_INSTRUCTIONS.md           # Step-by-step setup guide
└── docker-compose.yml              # Docker Compose configuration


```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aamir017/kanflow.git
   cd kanflow
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/kanflow
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Start the development servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 🎮 Usage Guide

### Creating Tasks
1. Click the "+ Add Task" button
2. Fill in task details (title, description, priority, assignee, due date)
3. Click "Create Task" to add it to the "To Do" column

### Managing Tasks
- **Edit**: Click the edit icon on any task card
- **Delete**: Click the delete icon and confirm
- **Move**: Drag and drop tasks between columns
- **Filter**: Use the filter button to narrow down tasks

### Filtering Tasks
- **By Priority**: Show only High, Medium, or Low priority tasks
- **By Assignee**: Filter tasks assigned to specific team members
- **By Due Date**: View tasks due within specific timeframes


## 🎨 Customization

### Styling
Customize the application's appearance by modifying CSS files in `src/styles/`. The project uses CSS custom properties for easy theming.

### Adding Features
1. Create new components in `src/components/`
2. Add corresponding CSS files
3. Update the main `Board.jsx` or `App.jsx` as needed
4. Implement backend endpoints if data persistence is required

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Configure environment variables on your hosting platform
# Deploy the server directory
```
## 🔁 CI/CD & DevOps Pipeline
Kanflow is equipped with a production-ready DevOps pipeline to automate the full application lifecycle — from code to deployment.

## 🧩 Pipeline Components

| 🛠️ Tool        | 📌 Role                                                       |
|----------------|----------------------------------------------------------------|
| 🧪 Jenkins     | Continuous Integration / Deployment (CI/CD)                   |
| 🧰 Ansible     | Configuration management and provisioning                     |
| 🐳 Docker      | Containerization of frontend/backend apps                     |
| ☸️ Kubernetes  | Container orchestration and scaling                           |
| 🌍 Terraform   | Infrastructure provisioning (Infrastructure as Code - IaC)    |


## 🔄 Pipeline Flow

1. Code Push (GitHub)

   * Triggers Jenkins CI pipeline via webhook.

2. Jenkins Pipeline

   * Installs dependencies

   * Runs linting & tests

   * Builds Docker images for frontend/backend

   * Pushes images to Docker Hub

3. Provisioning

   * Terraform spins up infrastructure on cloud (e.g., AWS)

   * Ansible configures servers with Docker, Kubernetes, Helm, and Jenkins

4. Deployment

   * Ingress and Secrets configured for service exposure

![CI](https://img.shields.io/badge/Jenkins-Build-Passing?style=flat&logo=Jenkins&color=green)
![Docker](https://img.shields.io/badge/Docker-Automated-blue?logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Deployed-blueviolet?logo=kubernetes)


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 👨‍💻 Author

**Sk Aamir**

📧 [aamir.sk.dev@gmail.com](mailto:aamir.sk.dev@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/skaamir10)

## 🙏 Acknowledgments

- React Beautiful DnD for the excellent drag-and-drop library
- The React and Node.js communities for comprehensive documentation
- Contributors and testers who helped improve Kanflow

---

⭐ **Star this repository if you found it helpful!**

🐛 **Found a bug?** [Report it here](https://github.com/Aamir017/kanflow/issues)

💡 **Have a feature request?** [Let us know!](https://github.com/Aamir017/kanflow/issues)
