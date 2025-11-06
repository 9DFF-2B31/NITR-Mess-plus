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
      <div className="min-h-screen bg-pageBg">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xl">Loading menu...</p>
        </div>
      </div>
    );
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  return (
    <div className="min-h-screen bg-pageBg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-contentBg rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-textDark">Weekly Mess Menu</h1>
            <Link to="/dashboard" className="text-primary hover:underline">
              ← Back to Dashboard
            </Link>
          </div>

          <div className="space-y-6">
            {days.map((day) => (
              <div key={day} className="border-2 border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">{dayLabels[day]}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-pageBg p-4 rounded">
                    <h3 className="font-bold text-textDark mb-2 flex items-center gap-2">
                      <span>🍳</span> Breakfast
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {menu[day].breakfast.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-pageBg p-4 rounded">
                    <h3 className="font-bold text-textDark mb-2 flex items-center gap-2">
                      <span>🍛</span> Lunch
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {menu[day].lunch.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-pageBg p-4 rounded">
                    <h3 className="font-bold text-textDark mb-2 flex items-center gap-2">
                      <span>☕</span> Snacks
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {menu[day].snacks.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-pageBg p-4 rounded">
                    <h3 className="font-bold text-textDark mb-2 flex items-center gap-2">
                      <span>🍽️</span> Dinner
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-1">
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