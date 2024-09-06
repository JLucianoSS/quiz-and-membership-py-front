export const FilterBy = ({ titulo, filterBy, selectedItems, toggleItem }) => {
    return (
      <>
        <h2 className="text-lg font-semibold">{titulo}</h2>
        <div className="flex flex-wrap gap-2">
          {filterBy.map((item) => (
            <button
              key={item.id} // Usamos item.id como key
              onClick={() => toggleItem(item.nombre)}
              className={`px-4 py-2 rounded-md ${selectedItems.includes(item.nombre) ? 'bg-primary text-white' : 'bg-gray-200'}`}
            >
              {item.nombre} {/* Asegúrate de que item.nombre sea el campo a mostrar */}
            </button>
          ))}
        </div>
      </>
    );
  };
  