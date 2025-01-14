import { useState } from "react";

const Button = () => {
  const [value, setValue] = useState('');
  const [activeButtons, setActiveButtons] = useState({
    name: false,
    date: false,
    price: false,
  });

  const toggleButton = (button) => {
    setActiveButtons((prev) => ({
      ...prev,
      [button]: !prev[button],
    }));
  };

  const handleNomClick = () => {
    setValue('name');
    toggleButton('name');
  };

  const handleDateClick = () => {
    setValue('date');
    toggleButton('date');
  };

  const handlePrixClick = () => {
    setValue('price');
    toggleButton('price');
  };

  return (
    <div>
      <button
        className={`flex items-center gap-2 ${activeButtons.name ? 'bg-blue-500 text-white' : 'bg-white text-black'} ring-2 ring-blue-500 rounded-2xl duration-200 w-fit self-center py-2 px-3 text-base`}
        onClick={handleNomClick}
      >
        Nom
      </button>
      <button
        className={`flex items-center gap-2 ${activeButtons.price ? 'bg-blue-500 text-white' : 'bg-white text-black'} ring-2 ring-blue-500 rounded-2xl duration-200 w-fit self-center py-2 px-3 text-base`}
        onClick={handlePrixClick}
      >
        Trié
      </button>
      <button
        className={`flex items-center gap-2 ${activeButtons.date ? 'bg-blue-500 text-white' : 'bg-white text-black'} ring-2 ring-blue-500 rounded-2xl duration-200 w-fit self-center py-2 px-3 text-base`}
        onClick={handleDateClick}
      >
        Date
      </button>
    </div>
  );
};

export default Button;
