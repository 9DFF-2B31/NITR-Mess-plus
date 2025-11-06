import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Student Pages
import Login from './pages/student/Login';
import Signup from './pages/student/Signup';
import Dashboard from './pages/student/Dashboard';
import ViewTokens from './pages/student/ViewTokens';
import BookMeal from './pages/student/BookMeal';
import ViewMenu from './pages/student/ViewMenu';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Student Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/view-tokens" element={
            <ProtectedRoute>
              <ViewTokens />
            </ProtectedRoute>
          } />
          <Route path="/book-meal" element={
            <ProtectedRoute>
              <BookMeal />
            </ProtectedRoute>
          } />
          <Route path="/view-menu" element={
            <ProtectedRoute>
              <ViewMenu />
            </ProtectedRoute>
          } />
          
          {/* Admin Protected Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;