import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

const BookMeal = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    snacks: false,
    dinner: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleCheckbox = (meal) => {
    setMeals({ ...meals, [meal]: !meals[meal] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    // Check if at least one meal is selected
    if (!meals.breakfast && !meals.lunch && !meals.snacks && !meals.dinner) {
      setMessage({ type: 'error', text: 'Please select at least one meal' });
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/student/book-tomorrow', { meals });
      setMessage({ type: 'success', text: data.message });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Booking failed'
      });
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-pageBg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-contentBg rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-textDark">Book Meals for Tomorrow</h1>
            <Link to="/dashboard" className="text-primary hover:underline">
              ← Back
            </Link>
          </div>

          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6">
            <p className="font-semibold">Booking for: {getTomorrowDate()}</p>
            <p className="text-sm mt-1">Each meal costs 1 token. Tokens will be deducted immediately.</p>
          </div>

          {message.text && (
            <div className={`px-4 py-3 rounded mb-6 ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-accent text-accent'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              <div className="border-2 rounded-lg p-4 hover:border-primary transition">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🍳</span>
                    <div>
                      <p className="font-bold text-lg text-textDark">Breakfast</p>
                      <p className="text-sm text-gray-600">Available tokens: {user.tokens.breakfast}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={meals.breakfast}
                    onChange={() => handleCheckbox('breakfast')}
                    className="w-6 h-6 accent-primary"
                    disabled={user.tokens.breakfast === 0}
                  />
                </label>
              </div>

              <div className="border-2 rounded-lg p-4 hover:border-primary transition">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🍛</span>
                    <div>
                      <p className="font-bold text-lg text-textDark">Lunch</p>
                      <p className="text-sm text-gray-600">Available tokens: {user.tokens.lunch}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={meals.lunch}
                    onChange={() => handleCheckbox('lunch')}
                    className="w-6 h-6 accent-primary"
                    disabled={user.tokens.lunch === 0}
                  />
                </label>
              </div>

              <div className="border-2 rounded-lg p-4 hover:border-primary transition">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">☕</span>
                    <div>
                      <p className="font-bold text-lg text-textDark">Snacks</p>
                      <p className="text-sm text-gray-600">Available tokens: {user.tokens.snacks}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={meals.snacks}
                    onChange={() => handleCheckbox('snacks')}
                    className="w-6 h-6 accent-primary"
                    disabled={user.tokens.snacks === 0}
                  />
                </label>
              </div>

              <div className="border-2 rounded-lg p-4 hover:border-primary transition">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🍽️</span>
                    <div>
                      <p className="font-bold text-lg text-textDark">Dinner</p>
                      <p className="text-sm text-gray-600">Available tokens: {user.tokens.dinner}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={meals.dinner}
                    onChange={() => handleCheckbox('dinner')}
                    className="w-6 h-6 accent-primary"
                    disabled={user.tokens.dinner === 0}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-textLight py-3 rounded hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookMeal;