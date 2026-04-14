# SaveMemo - Personal Memo Manager

A full-stack web application for creating, managing, and organizing personal memos with tags, search, and auto-save capabilities.

## 🚀 Features

- **CRUD Operations**: Create, read, update, and delete memos
- **Tags & Categories**: Organize memos with multiple tags
- **Search Functionality**: Search memos by title or content
- **Auto-save**: Changes are automatically saved
- **Export/Import**: Export memos to file or import from file
- **Dark/Light Theme**: Switch between light and dark modes
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Context API for state management

### Backend
- Node.js with Express
- Supabase (PostgreSQL) for database
- CORS enabled for frontend communication

## 🛠️ Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Supabase account (for database)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SaveMemo
   ```

2. **Configure Environment Variables**

   **Backend** - Create `backend/.env`:
   ```env
   PORT=3001
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Frontend** - Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

3. **Install Dependencies**

   Backend:
   ```bash
   cd backend
   npm install
   ```

   Frontend:
   ```bash
   cd frontend
   npm install
   ```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Backend:
```bash
cd backend
npm run build
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
SaveMemo/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server setup
│   │   └── routes/
│   │       └── memos.js       # Memo API endpoints
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/           # Context API
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── .env.example
│
└── README.md
```

## 🔧 API Endpoints

- `GET /api/memos` - Get all memos
- `GET /api/memos/:id` - Get a specific memo
- `POST /api/memos` - Create a new memo
- `PUT /api/memos/:id` - Update a memo
- `DELETE /api/memos/:id` - Delete a memo
- `GET /api/memos/search/query?q=<query>` - Search memos

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.
