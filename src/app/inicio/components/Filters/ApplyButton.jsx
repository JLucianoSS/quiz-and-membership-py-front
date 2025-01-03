

export const ApplyButton = ({ onApply, preguntas, isDisabled }) => {
  return (
    <div className="fixed z-10 bottom-0 px-4 lg:px-20 xl:px-44 flex items-center justify-between w-full py-2 border-t bg-white">
      <span className="text-sm sm:text-base text-gray-600">
        Se encontraron{" "}
        <span className="text-primary font-bold">{preguntas} Preguntas</span>
      </span>
      <button
        onClick={onApply}
        disabled={isDisabled} // Deshabilita el botón si isDisabled es true
        className={`${
          isDisabled
            ? "bg-gray-300 cursor-not-allowed text-gray-400 font-normal"
            : "bg-primary text-white"
        } sm:text-lg font-semibold py-1 sm:py-2 px-4 rounded-lg`}
      >
        Aplicar
      </button>
    </div>
  );
};
