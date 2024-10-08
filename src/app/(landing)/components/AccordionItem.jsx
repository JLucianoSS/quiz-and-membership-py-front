
"use client"
import { useState } from 'react';

export function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-2 border-white bg-white rounded-lg mb-4">
      <button
        className="w-full flex justify-between items-center gap-2 p-4 rounded-lg focus:outline-none"
        onClick={toggleAccordion}
      >
        <span className="text-gray-800 text-start">{question}</span>
        <span className='text-gray-800 text-lg font-semibold'>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white text-gray-700 rounded-b-lg text-sm">
          {answer}
        </div>
      )}
    </div>
  );
}
