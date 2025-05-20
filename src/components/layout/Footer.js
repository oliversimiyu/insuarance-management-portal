import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {currentYear} InsureManage Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
