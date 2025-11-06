import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-pageBg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-contentBg rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            {user.photo?.url ? (
              <img
                src={user.photo.url}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-primary"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-textLight text-3xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}
            
            <div>
              <h1 className="text-3xl font-bold text-textDark">{user.name}</h1>
              <p className="text-gray-600">Roll No: {user.rollNo}</p>
              <p className="text-gray-600">Mess: {user.messName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/view-menu" className="bg-contentBg rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-center">
              <div className="text-4xl mb-4">📋</div>
              <h2 className="text-xl font-bold text-textDark mb-2">View Mess Menu</h2>
              <p className="text-gray-600">Check today's menu</p>
            </div>
          </Link>

          <Link to="/view-tokens" className="bg-contentBg rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-center">
              <div className="text-4xl mb-4">🎫</div>
              <h2 className="text-xl font-bold text-textDark mb-2">Check Current Tokens</h2>
              <p className="text-gray-600">View your meal tokens</p>
            </div>
          </Link>

          <Link to="/book-meal" className="bg-contentBg rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h2 className="text-xl font-bold text-textDark mb-2">Book Coupons</h2>
              <p className="text-gray-600">Book meals for tomorrow</p>
            </div>
          </Link>
        </div>

        <div className="bg-contentBg rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-textDark mb-4">Quick Token Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-pageBg rounded">
              <p className="text-gray-600 mb-1">Breakfast</p>
              <p className="text-3xl font-bold text-primary">{user.tokens.breakfast}</p>
            </div>
            <div className="text-center p-4 bg-pageBg rounded">
              <p className="text-gray-600 mb-1">Lunch</p>
              <p className="text-3xl font-bold text-primary">{user.tokens.lunch}</p>
            </div>
            <div className="text-center p-4 bg-pageBg rounded">
              <p className="text-gray-600 mb-1">Snacks</p>
              <p className="text-3xl font-bold text-primary">{user.tokens.snacks}</p>
            </div>
            <div className="text-center p-4 bg-pageBg rounded">
              <p className="text-gray-600 mb-1">Dinner</p>
              <p className="text-3xl font-bold text-primary">{user.tokens.dinner}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;