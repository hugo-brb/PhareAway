import React from 'react';

type NavbarProps = {
    onCenterChange: (center: [number, number]) => void;
};
  
  const Navbar: React.FC<NavbarProps> = ({ onCenterChange}) => {
    return (
        <aside className="flex flex-row gap-4 justify-between absolute top-2 right-1/2 translate-x-1/2 bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-6 py-4 z-50"
        >
            <button onClick={() => onCenterChange([-1.6282904,49.6299822])}>Cherbourg</button>
            <button onClick={() => onCenterChange([-1.6427344,47.2382032])}>Nantes</button>
            <button onClick={() => onCenterChange([-0.586012,44.8637178])}>Bordeaux</button>
            <button onClick={() => onCenterChange([4.2604586,43.8321256])}>Nimes</button>
        </aside>
    );
};

export default Navbar;
