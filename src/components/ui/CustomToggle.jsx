export const CustomToggle = ({ isChecked, onChange }) => (
    <div
      className={`relative inline-block w-10 h-6 transition-colors duration-200 ease-in-out rounded-full cursor-pointer ${
        isChecked ? 'bg-blue-600' : 'bg-gray-300'
      }`}
      onClick={onChange}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 transition-transform duration-200 ease-in-out transform ${
          isChecked ? 'translate-x-4' : 'translate-x-0'
        } bg-white rounded-full shadow-md`}
      />
    </div>
  );