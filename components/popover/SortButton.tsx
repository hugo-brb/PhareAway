import { useState } from "react";

interface ButtonProps {
  onSortChange: (sortType: string) => void;
}

const Button = ({ onSortChange }: ButtonProps) => {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (button: string) => {
    // Vérifiez si le bouton cliqué est déjà actif
    if (activeButton === button) {
      setActiveButton('');
      onSortChange('');
    } else {
      setActiveButton(button);
      onSortChange(button);
    }
  };

  {/** TODO a mettre au propre */}
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
