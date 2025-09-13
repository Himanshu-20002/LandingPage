import { useRouter } from 'next/navigation';
import React, { forwardRef, useState } from 'react'

const Nav = forwardRef((props, ref) => {      
   const router = useRouter();
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const handleNavigate = (e) => {
      e.preventDefault();
      router.push('/library');
   };

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <nav ref={ref} className="nav-container p-3">
         {/* Mobile Menu Button */}
         <button 
            className="mobile-menu-btn md:hidden" 
            onClick={toggleMenu}
         >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
               )}
            </svg>
         </button>

         {/* Navigation Links */}
         <div className={`nav-links ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
            <a href='#'>Overview</a>
            <a href='#'>Solutions</a>
            <a href='#'>Resources</a>
         </div>

         {/* Navigation Buttons */}
         <div className={`nav-buttons ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
            <button onClick={handleNavigate} className="btn-primary">
               <span className='text-white'>Live Demo</span>
            </button>
            <button onClick={handleNavigate} className="btn-secondary">
               <span className='text-black'>Get Started</span>
            </button>
         </div>
      </nav>
   );
});

Nav.displayName = 'Nav';
export default Nav;