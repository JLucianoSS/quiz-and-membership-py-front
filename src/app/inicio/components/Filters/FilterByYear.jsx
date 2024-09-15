


export const FilterByYear = ({ preguntas }) => {
  return (
    <div className="mt-6 max-w-md">
      <h2 className="text-lg font-semibold text-gray-700">Año</h2>
      <div className="flex justify-between text-sm text-gray-600">
        <span>2009</span>
        <span>2021</span>
      </div>
      <input type="range" min="2009" max="2021" className="w-full" />
    </div>
  );
};
