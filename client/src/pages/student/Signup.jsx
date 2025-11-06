import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    password: '',
    name: '',
    messName: '',
    photo: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let photoBase64 = '';
      
      // Convert photo to base64 if provided
      if (formData.photo) {
        const reader = new FileReader();
        photoBase64 = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.photo);
        });
      }

      await signup({
        rollNo: formData.rollNo,
        password: formData.password,
        name: formData.name,
        messName: formData.messName,
        photoBase64
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pageBg flex items-center justify-center px-4 py-8">
      <div className="bg-contentBg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          NITR Mess Plus
        </h1>
        <h2 className="text-xl text-textDark mb-6 text-center">Create Account</h2>

        {error && (
          <div className="bg-red-100 border border-accent text-accent px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-textDark mb-2">Roll Number</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
              placeholder="e.g., 123CS1001"
            />
          </div>

          <div className="mb-4">
            <label className="block text-textDark mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-textDark mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
              minLength="6"
            />
          </div>

          <div className="mb-4">
            <label className="block text-textDark mb-2">Mess Name</label>
            <select
              name="messName"
              value={formData.messName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
              required
            >
              <option value="">Select Mess</option>
              <option value="Mess A">Mess A</option>
              <option value="Mess B">Mess B</option>
              <option value="Mess C">Mess C</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-textDark mb-2">Profile Photo (Optional)</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-textLight py-3 rounded hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6 text-textDark">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;