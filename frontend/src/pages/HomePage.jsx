import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const { token } = useContext(AuthContext);

  const [text] = useTypewriter({
    words: ['Schedule Meetings', 'Plan Events', 'Organize Life', 'Boost Productivity'],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Hero Section */}
      <div className="pt-20 pb-32 px-4 animate-fadeIn">
        <div className="max-w-6xl mx-auto text-center">
          <Calendar className="w-20 h-20 text-blue-400 mx-auto mb-8 animate-float" />
          <h1 className="text-6xl font-bold text-white mb-6 animate-slideUp">
            Smart Calendar for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {text}
            </span>
            <Cursor cursorStyle="_" />
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-slideUp animation-delay-200">
            Transform your scheduling experience with our intelligent calendar solution
          </p>
          
          {!token ? (
            <div className="space-y-4 animate-slideUp animation-delay-400">
              <GoogleSignInButton />
              <p className="text-blue-200 mt-4">Join thousands of organized professionals</p>
            </div>
          ) : (
            <Link 
              to="/calendar"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
              hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
              animate-slideUp animation-delay-400"
            >
              View Your Calendar
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Clock className="w-12 h-12 text-blue-400 mb-4" />,
              title: "Smart Scheduling",
              description: "AI-powered scheduling that learns your preferences",
              delay: "100"
            },
            {
              icon: <Users className="w-12 h-12 text-purple-400 mb-4" />,
              title: "Team Sync",
              description: "Seamlessly coordinate with your team members",
              delay: "200"
            },
            {
              icon: <CheckCircle className="w-12 h-12 text-green-400 mb-4" />,
              title: "Smart Reminders",
              description: "Never miss an important meeting again",
              delay: "300"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300
              animate-slideUp animation-delay-${feature.delay}`}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default HomePage;










