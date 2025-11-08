import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../utils/api';

const ViewMenu = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await api.get('/public/menu');
        setMenu(data.menu);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{
          background: 'linear-gradient(to bottom, #F9F5F3, #E8D7D2)',
        }}
      >
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div
            className="text-xl font-semibold animate-pulse"
            style={{ color: '#B95C40' }}
          >
            🍽️ Loading Weekly Menu...
          </div>
        </div>
      </div>
    );
  }

  const days = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const dayLabels = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #F9F5F3, #F2E3DF)',
      }}
    >
      <Navbar />

      {/* Hero Banner */}
      <div
        className="relative text-white py-12 shadow-md"
        style={{
          background: 'linear-gradient(90deg, #B95C40, #A24A33)',
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            🍴 Weekly Mess Menu
          </h1>
          <p className="text-lg opacity-90">
            Stay updated with this week’s delicious meals at your hostel mess
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{
            background: 'linear-gradient(90deg, #B95C40, #8C3B26)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div
          className="backdrop-blur-md rounded-2xl shadow-lg p-8 border"
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#E8CFC5',
          }}
        >
          <div className="flex justify-end mb-6">
            <Link
              to="/student/dashboard"
              className="font-semibold transition"
              style={{
                color: '#B95C40',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#8C3B26')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#B95C40')}
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="space-y-10">
            {days.map((day) => (
              <div
                key={day}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                {/* Day Header */}
                <div
                  className="text-white px-6 py-4 flex items-center justify-between"
                  style={{
                    background: 'linear-gradient(90deg, #B95C40, #A44E36)',
                  }}
                >
                  <h2 className="text-2xl font-bold">{dayLabels[day]}</h2>
                  <span className="text-sm font-light opacity-90">
                    🍚 Fresh | 🍛 Tasty | ☕ Energizing
                  </span>
                </div>

                {/* Meals Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6">
                  {/* Breakfast */}
                  <div
                    className="rounded-lg p-4 hover:scale-[1.02] transition"
                    style={{
                      background: 'linear-gradient(135deg, #F4E1DA, #F9ECE7)',
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-3 flex items-center gap-2"
                      style={{ color: '#B95C40' }}
                    >
                      <span>🍳</span> Breakfast
                    </h3>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {menu[day].breakfast.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Lunch */}
                  <div
                    className="rounded-lg p-4 hover:scale-[1.02] transition"
                    style={{
                      background: 'linear-gradient(135deg, #F3DFD8, #F7EAE5)',
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-3 flex items-center gap-2"
                      style={{ color: '#B95C40' }}
                    >
                      <span>🍛</span> Lunch
                    </h3>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {menu[day].lunch.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Snacks */}
                  <div
                    className="rounded-lg p-4 hover:scale-[1.02] transition"
                    style={{
                      background: 'linear-gradient(135deg, #F4E1DA, #F8EBE6)',
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-3 flex items-center gap-2"
                      style={{ color: '#B95C40' }}
                    >
                      <span>☕</span> Snacks
                    </h3>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {menu[day].snacks.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Dinner */}
                  <div
                    className="rounded-lg p-4 hover:scale-[1.02] transition"
                    style={{
                      background: 'linear-gradient(135deg, #F6E4DD, #FAEFEB)',
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-3 flex items-center gap-2"
                      style={{ color: '#B95C40' }}
                    >
                      <span>🍽️</span> Dinner
                    </h3>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {menu[day].dinner.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMenu;
