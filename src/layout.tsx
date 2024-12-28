import React from 'react';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';



const Layout: React.FC  = () => {
  return (
    <>
    <div className=" relative flex flex-col min-h-screen dark:bg-black">
    <div className='bg-gradient-to-r from-custom-green via-black to-custom-blue'></div>

      <Navbar />

      <Outlet />
      </div>
    
    </>
  );
};

export default Layout;
