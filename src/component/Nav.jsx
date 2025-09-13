
import { useRouter } from 'next/navigation';
import React, { forwardRef } from 'react'

const Nav = forwardRef((props, ref) => {      
   const router = useRouter();




    const handleNavigate = (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      router.push('/library');
   };
   // when we wrap forwardRef we can pass the ref to the component and define ref in the parent component return statement is not allowed
   return (
      <nav ref={ref} className="nav-container  p-3 ">
         <div className="nav-links ">
            <a href='#'>Overview</a>
            <a href='#' >Solutions</a>
            <a href='#'>Resources</a>
         </div>
         {/* <div className="nav-logo">
            <a href='#'>
               <img src="/logo.png" alt="Logo" className="logo-img" />
            </a>
         </div> */}
         <div className="nav-buttons">
            <button onClick={handleNavigate}  className="btn-primary"><a href='#' className='p-7 text-white'>Live Demo</a></button>
            <button onClick={handleNavigate} className="btn-secondary"><a href='#' className='text-black p-7'>Get Started</a></button>
         </div>
      </nav>
   );
});


export default Nav
