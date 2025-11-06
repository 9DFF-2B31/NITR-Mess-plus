import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login(formData.rollNo, formData.password);
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid Admin UniqueId or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pageBg flex items-center justify-center px-4">
      <div className="bg-contentBg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          NITR Mess Plus
        </h1>
        <h2 className="text-xl text-textDark mb-6 text-center">Admin Login</h2>

        {error && (
          <div className="bg-red-100 border border-accent text-accent px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-textDark mb-2">Admin UniqueID</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
              placeholder="Admin@123"
            />
          </div>

          <div className="mb-6">
            <label className="block text-textDark mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              placeholder='password'
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-textLight py-3 rounded hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;