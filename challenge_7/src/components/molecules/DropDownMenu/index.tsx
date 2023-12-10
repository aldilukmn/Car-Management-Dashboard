import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

function DropDownMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    googleLogout();
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <>
      <div className="relative">
        <div className='mt-2'>
          <button
            type="button"
            id="menu-button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleMenu}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          </button>
        </div>
        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
            <div className="py-2" role="none">
              <a onClick={handleClick} className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-100 cursor-pointer" role="menuitem" id="menu-item-0">Sign Out</a>
            </div>
          </div>
        )}
    </div>
    </>
  )
}

export default DropDownMenu