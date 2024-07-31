import { HomeIcon, HousePlusIcon } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-white">TN LOAN</div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-white focus:outline-none">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
        <div className={`space-x-4 md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center space-x-2 text-white hover:text-gray-300">
            <HomeIcon size={24} />
            <a href="#home" className="">
              Home
            </a>
          </div>
          <div className="flex items-center space-x-2 text-white hover:text-gray-300">
            <HousePlusIcon size={24} />
            <a href="#home" className="">
              Recommend
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
