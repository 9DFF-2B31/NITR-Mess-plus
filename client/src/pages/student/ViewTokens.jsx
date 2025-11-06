import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../utils/api';

const ViewTokens = () => {
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data } = await api.get('/student/my-tokens');
        setTokens(data.tokens);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-pageBg">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pageBg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-contentBg rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-textDark">Your Meal Tokens</h1>
            <Link to="/student/dashboard" className="text-primary hover:underline">
              ← Back to Dashboard
            </Link>
          </div>

          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6">
            <p>Tokens reset to 15 for each meal on the 1st of every month.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-primary rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-textDark">Breakfast</h2>
                <span className="text-4xl">🍳</span>
              </div>
              <p className="text-5xl font-bold text-primary text-center">
                {tokens.breakfast}
              </p>
              <p className="text-center text-gray-600 mt-2">tokens remaining</p>
            </div>

            <div className="border-2 border-primary rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-textDark">Lunch</h2>
                <span className="text-4xl">🍛</span>
              </div>
              <p className="text-5xl font-bold text-primary text-center">
                {tokens.lunch}
              </p>
              <p className="text-center text-gray-600 mt-2">tokens remaining</p>
            </div>

            <div className="border-2 border-primary rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-textDark">Snacks</h2>
                <span className="text-4xl">☕</span>
              </div>
              <p className="text-5xl font-bold text-primary text-center">
                {tokens.snacks}
              </p>
              <p className="text-center text-gray-600 mt-2">tokens remaining</p>
            </div>

            <div className="border-2 border-primary rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-textDark">Dinner</h2>
                <span className="text-4xl">🍽️</span>
              </div>
              <p className="text-5xl font-bold text-primary text-center">
                {tokens.dinner}
              </p>
              <p className="text-center text-gray-600 mt-2">tokens remaining</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/book-meal"
              className="inline-block bg-primary text-textLight px-8 py-3 rounded hover:bg-opacity-90 transition"
            >
              Book Meals for Tomorrow
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTokens;