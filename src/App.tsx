import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './contexts/Auth/AuthContext';
import { Login } from './pages/login/login';
import { SignUp } from './pages/signup/signup';
import { ProtectedRoute } from './routes/protectedRoute';
import { Feed } from './pages/feed/feed';
import { Verified } from './pages/verified/verified';

function App() {
  return (
    <AuthProvider>
      <Router>
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
          <Route path="/" element={<Verified />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
