import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { ClipboardList, Ticket, Utensils } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Updated unified brand color
  const PRIMARY_COLOR = "#B95C40";

  const TOKEN_COLORS = {
    Breakfast: "linear-gradient(135deg, #B95C40, #A44E36)",
    Lunch: "linear-gradient(135deg, #B95C40, #93432D)",
    Snacks: "linear-gradient(135deg, #B95C40, #A44E36)",
    Dinner: "linear-gradient(135deg, #B95C40, #93432D)",
  };

  return (
    <div
      className="min-h-screen font-sans text-gray-800"
      style={{ backgroundColor: "#F9F9F9" }}
    >
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* Profile Card */}
        <div
          className="text-white rounded-2xl shadow-2xl p-8 mb-10 flex items-center gap-6 border transform transition hover:scale-105"
          style={{
            background: "linear-gradient(90deg, #B95C40, #A44E36)",
            borderColor: "#E8CFC5",
          }}
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
              style={{
                background: "linear-gradient(90deg, #B95C40, #A44E36)",
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-extrabold mb-1 text-white">
              {user.name}
            </h1>
            <p className="font-medium">Roll No: {user.rollNo}</p>
            <p className="font-medium">Mess: GDB Hall</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link
            to="/view-menu"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="text-center">
              <ClipboardList
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: PRIMARY_COLOR }}
              />
              <h2 className="text-xl font-bold mb-1 text-gray-800">
                View Mess Menu
              </h2>
              <p className="text-gray-500 text-sm">
                Check today’s delicious menu
              </p>
            </div>
          </Link>

          <Link
            to="/view-tokens"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="text-center">
              <Ticket
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: PRIMARY_COLOR }}
              />
              <h2 className="text-xl font-bold mb-1 text-gray-800">
                Check Current Tokens
              </h2>
              <p className="text-gray-500 text-sm">
                View your current meal tokens
              </p>
            </div>
          </Link>

          <Link
            to="/book-meal"
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div className="text-center">
              <Utensils
                className="mx-auto h-12 w-12 mb-4"
                style={{ color: PRIMARY_COLOR }}
              />
              <h2 className="text-xl font-bold mb-1 text-gray-800">
                Book Meal Coupons
              </h2>
              <p className="text-gray-500 text-sm">
                Reserve your meals for tomorrow
              </p>
            </div>
          </Link>
        </div>

        {/* Token Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Breakfast", count: user.tokens.breakfast },
            { label: "Lunch", count: user.tokens.lunch },
            { label: "Snacks", count: user.tokens.snacks },
            { label: "Dinner", count: user.tokens.dinner },
          ].map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-xl text-center shadow-md hover:scale-105 transition"
              style={{
                background: TOKEN_COLORS[item.label],
                color: "#fff",
              }}
            >
              <p className="font-medium mb-1">{item.label}</p>
              <p className="text-3xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-sm text-gray-500 font-medium">
          © {new Date().getFullYear()} National Institute of Technology, Rourkela
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
