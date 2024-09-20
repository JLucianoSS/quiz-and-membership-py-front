import Image from "next/image";

export const TestimonialCard = ({ testimonio }) => {
  return (
    <div className="bg-white py-[50px] mb-10 px-6 rounded-lg shadow-sm h-full flex flex-col items-center">
      <Image
        src={testimonio.imageSrc}
        alt={testimonio.nombre}
        className="w-14 h-14 object-cover rounded-full mb-4"
        width={200}
        height={200}
      />
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        {testimonio.nombre}
      </h3>
      <p className="text-center text-gray-600 italic">{`${testimonio.comentario}`}</p>
    </div>
  );
};
