import React from 'react';

type NavbarProps = {
    onCenterChange: (center: [number, number]) => void;
  };
  
  const Navbar: React.FC<NavbarProps> = ({ onCenterChange }) => {
    return (
        <aside className="flex flex-row gap-4 justify-betweenabsolute, top-2 right-1/2 translate-x-1/2 bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-6 py-4 absolute z-50"
        >
            <button onClick={() => onCenterChange([-74.006, 40.7128])}>New York</button>
            <button onClick={() => onCenterChange([-0.1276, 51.5074])}>Londres</button>
            <button onClick={() => onCenterChange([139.6917, 35.6895])}>Tokyo</button>
        </aside>
    );
};

export default Navbar;
