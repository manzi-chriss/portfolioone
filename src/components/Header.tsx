import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleLoader } from 'react-spinners';
import Logo from '../assets/Logo.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    // Simulate a page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (path) => {
    return `hover:text-red-500 ${location.pathname === path ? 'text-red-500 font-bold' : ''}`;
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' }
  };

  return (
    <>
      <motion.header 
        className="bg-gray-800 text-white shadow-md relative z-10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="text-lg font-bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
        <Link to="/">
          <img src={Logo} alt="Logo" style={{ height: '60px', width: 'auto' }} />
        </Link>
          </motion.div>
          <motion.nav 
            className="hidden md:flex space-x-4"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {['/', '/about', '/contact'].map((path) => (
              <motion.div key={path} variants={linkVariants}>
                <Link to={path} className={getLinkClass(path)}>
                  {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          <motion.div 
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </motion.div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden bg-gray-800 text-white"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <nav className="flex flex-col space-y-2 px-4 pb-4">
                {['/', '/about', '/contact'].map((path) => (
                  <motion.div 
                    key={path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={path} 
                      className={getLinkClass(path)} 
                      onClick={() => setIsOpen(false)}
                    >
                      {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Full-screen CircleLoader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <CircleLoader color="#FF0000" size={60} /> {/* Adjust color and size as needed */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;