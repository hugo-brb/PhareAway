import { useState } from "react";

const Button = ({ onSortChange }) => {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (button) => {
    setActiveButton(button);
    onSortChange(button); // Appel de la fonction de rappel pour mettre à jour le tri
  };

  return (
    <div>
      <button
        className={`flex items-center gap-2 ${activeButton === 'name' ? 'bg-blue-500 text-white' : 'bg-white text-black'} ring-2 ring-blue-500 rounded-2xl duration-200 w-fit self-center py-2 px-3 text-base`}
        onClick={() => handleButtonClick('name')}
      >
        Nom
      </button>
      <button
        className={`flex items-center gap-2 ${activeButton === 'date' ? 'bg-blue-500 text-white' : 'bg-white text-black'} ring-2 ring-blue-500 rounded-2xl duration-200 w-fit self-center py-2 px-3 text-base`}
        onClick={() => handleButtonClick('date')}
      >
        Date
      </button>
      <button
        className={`flex items-center gap-2 ${activeButton === 'price' ? 'bg-blue-500 text-white' : 'bg-white text-black'} ring-2 ring-blue-500 rounded-2xl duration-200 w-fit self-center py-2 px-3 text-base`}
        onClick={() => handleButtonClick('price')}
      >
        Prix
      </button>
    </div>
  );
};

export default Button;
