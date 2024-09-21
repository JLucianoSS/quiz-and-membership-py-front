import { IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

export const HistorialCard = ({ pregunta, respuestaDada, fechaRespuesta, esCorresta }) => {
  return (
    <div className="w-full p-4 bg-white  rounded-lg border border-gray-100 shadow-md">
      <div className="text-gray-500 text-sm font-semibold">
        { pregunta }
      </div>
      <p className="mt-2 text-gray-600 text-xs overflow-hidden text-ellipsis line-clamp-2">
        { respuestaDada }
      </p>
      <div className="flex items-center mt-4 text-sm">
        {esCorresta ?<IoCheckmarkCircleOutline className="text-green-600 font w-5 h-5 mr-2" />:  <IoCloseCircleOutline className="text-red-600 w-5 h-5 mr-2" />}
        <span className="text-xs font-semibold text-gray-600">Respondida el { fechaRespuesta }</span>
      </div>
    </div>
  );
};
