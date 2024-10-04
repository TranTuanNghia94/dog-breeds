import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './contexts/Auth/AuthContext';
import { Login } from './pages/login';
import { SignUp } from './pages/signup';
import { ProtectedRoute } from './routes/protectedRoute';
import { Feed } from './pages/feed';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-red-100">
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
