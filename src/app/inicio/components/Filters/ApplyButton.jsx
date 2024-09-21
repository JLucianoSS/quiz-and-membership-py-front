export const ApplyButton = ({ onApply, preguntas }) => {
    return (
      <div className="fixed z-10 bottom-0 px-4 lg:px-20 xl:px-44 flex items-center justify-between w-full py-2 border-t bg-white">
        <span className="text-sm sm:text-base text-gray-600">
          Se encontraron{" "}
          <span className="text-primary font-bold">{preguntas} Preguntas</span>
        </span>
        <button onClick={onApply} className="bg-primary sm:text-lg font-semibold text-white py-1 sm:py-2 px-4 rounded-lg">
          Aplicar
        </button>
      </div>
    );
  };
  

  