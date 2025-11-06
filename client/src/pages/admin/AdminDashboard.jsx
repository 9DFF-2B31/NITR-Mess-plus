import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const meals = [
    { value: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { value: 'lunch', label: 'Lunch', icon: '🍛' },
    { value: 'snacks', label: 'Snacks', icon: '☕' },
    { value: 'dinner', label: 'Dinner', icon: '🍽️' }
  ];

  const fetchMealList = async (meal) => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const { data } = await api.get(`/admin/meal-list?meal=${meal}`);
      setStudentList(data.students);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to fetch meal list'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMealList(selectedMeal);
  }, [selectedMeal]);

  const handleVerify = async (bookingId) => {
    try {
      await api.put('/admin/verify-meal', {
        bookingId,
        meal: selectedMeal
      });
      
      // Remove the verified student from the list
      setStudentList(studentList.filter(student => student.bookingId !== bookingId));
      setMessage({
        type: 'success',
        text: 'Meal verified successfully'
      });
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 2000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Verification failed'
      });
    }
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-IN', {
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
        <div className="bg-contentBg rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-textDark mb-2">Admin Verification Panel</h1>
          <p className="text-gray-600 mb-6">Today: {getTodayDate()}</p>

          {message.text && (
            <div className={`px-4 py-3 rounded mb-6 ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-accent text-accent'
            }`}>
              {message.text}
            </div>
          )}

          {/* Meal Selection Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {meals.map((meal) => (
              <button
                key={meal.value}
                onClick={() => setSelectedMeal(meal.value)}
                className={`px-6 py-3 rounded font-semibold transition ${
                  selectedMeal === meal.value
                    ? 'bg-primary text-textLight'
                    : 'bg-gray-200 text-textDark hover:bg-gray-300'
                }`}
              >
                <span className="mr-2">{meal.icon}</span>
                {meal.label}
              </button>
            ))}
          </div>

          {/* Student List */}
          <div className="bg-pageBg p-4 rounded">
            <h2 className="text-xl font-bold text-secondary mb-4">
              Students who booked {meals.find(m => m.value === selectedMeal)?.label}
              <span className="ml-2 text-sm font-normal text-gray-600">
                ({studentList.length} students)
              </span>
            </h2>

            {loading ? (
              <p className="text-center py-8 text-gray-600">Loading...</p>
            ) : studentList.length === 0 ? (
              <p className="text-center py-8 text-gray-600">
                No students have booked this meal or all have been verified
              </p>
            ) : (
              <div className="space-y-3">
                {studentList.map((student) => (
                  <div
                    key={student.bookingId}
                    className="bg-contentBg p-4 rounded-lg shadow flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {student.photo?.url ? (
                        <img
                          src={student.photo.url}
                          alt={student.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-textLight text-xl font-bold">
                          {student.name.charAt(0)}
                        </div>
                      )}
                      
                      <div>
                        <p className="font-bold text-lg text-textDark">{student.name}</p>
                        <p className="text-gray-600">Roll No: {student.rollNo}</p>
                        <p className="text-gray-600 text-sm">Mess: {student.messName}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleVerify(student.bookingId)}
                      className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition flex items-center gap-2"
                    >
                      <span className="text-xl">✓</span>
                      Verify
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;