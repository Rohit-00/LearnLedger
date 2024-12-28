import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { ConnectWallet } from './connectWallet';
import { NavLink } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="text-white font-bold text-xl">Logo</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/quizzes" className="text-gray-300 hover:text-white transition-colors">
              Quiz
            </NavLink>
            <NavLink to="/articles" className="text-gray-300 hover:text-white transition-colors">
              Articles
            </NavLink>
            <a href="/write" className="text-gray-300 hover:text-white transition-colors">
              Write
            </a>
         <ConnectWallet/>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="/quiz" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Quiz
              </a>
              <a 
                href="/articles" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </a>
              <a 
                href="/write" 
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Write
              </a>
              <button 
                className="text-gray-300 hover:text-white transition-colors flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <User size={24} />
                <span className="ml-2">Profile</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;