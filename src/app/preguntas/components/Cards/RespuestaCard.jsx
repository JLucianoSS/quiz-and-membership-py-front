export const RespuestaCard = ({ 
  letter, 
  answer, 
  isCorrect, 
  onClick, 
  isSelected, 
  showCorrect, 
  disableClicks, 
  isStriked, 
  onToggleStrike, 
  disableStrike,
  isAnswered // Nuevo prop para saber si la pregunta ya fue respondida
}) => {

  // Determinar los estilos según si la opción ha sido seleccionada o si debe mostrar la correcta
  const containerStyles = () => {
    if (!isAnswered) {
      // Estilos antes de responder
      return isSelected 
        ? "border-gray-400 bg-gray-200" // Gris más oscuro para selección
        : "border-gray-300 bg-white"; // Gris claro para no seleccionado
    } else {
      // Estilos después de responder
      if (isSelected && isCorrect) {
        return "border-green-500 bg-green-100";
      } else if (isSelected && !isCorrect) {
        return "border-red-500 bg-red-100";
      } else if (showCorrect) {
        return "border-green-500 bg-green-100"; // Mostrar la correcta si se seleccionó otra
      }
      return "border-gray-300 bg-white"; // Estilos neutros para opciones no seleccionadas
    }
  };

  return (
    <div className={`flex items-center gap-2 ${disableClicks ? 'pointer-events-none' : ''}`} >
      <div 
        className={`flex items-center gap-8 border rounded-md py-2 px-3 w-[90%] cursor-pointer ${containerStyles()}`} 
        onClick={onClick}
      >
        <div className="w-[10%] max-w-[40px] h-full">
          <div className="bg-gray-100 p-2 rounded-full border w-10 h-10 flex justify-center items-center">
            <span className="text-sm text-gray-500">{letter}</span>
          </div>
        </div>

        <div className="w-[90%]">
          <p className={`text-[13px] sm:text-[15px] text-gray-500 w-full ${isStriked ? 'line-through' : ''}`}>
            {answer}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center w-[10%] cursor-pointer">
        <div
          className={`bg-gray-100 p-2 rounded-full h-8 w-8 flex justify-center items-center ${isStriked ? "bg-gray-400" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!disableStrike && !disableClicks) {
              onToggleStrike();
            }
          }}
        >
          <span className={`text-[12px] text-gray-500 ${isStriked ? "text-white line-through" : ""}`}>T</span>
        </div>
      </div>
    </div>
  );
};