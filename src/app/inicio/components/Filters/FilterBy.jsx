export const FilterBy = ({ titulo, filterBy, selectedItems, toggleItem }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-1">{titulo}</h2>
      <div className="flex flex-wrap gap-2">
        {filterBy.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.nombre, item.id)}  // Pasamos nombre e ID
            className={`px-4 py-2 rounded-md ${
              selectedItems.includes(item.nombre) ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            {item.nombre}
          </button>
        ))}
      </div>
    </>
  );
};