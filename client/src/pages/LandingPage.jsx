import { Link } from "react-router-dom";
import { GraduationCap, Shield } from "lucide-react";
import heroImage from "../assets/react.svg"; // adjust path if needed

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EduPortal
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Welcome to Your
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Learning Portal
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Access your educational resources, assignments, and more. Choose your portal to get started.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/student/login" className="flex-1">
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold
                  bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 transition-all
                  shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <GraduationCap className="h-5 w-5" />
                  Student Portal
                </button>
              </Link>

              <Link to="/admin/login" className="flex-1">
                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold
                  bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:opacity-90 transition-all
                  shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Shield className="h-5 w-5" />
                  Admin Portal
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <img
              src={heroImage}
              alt="Students learning together"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">
            © 2024 EduPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
