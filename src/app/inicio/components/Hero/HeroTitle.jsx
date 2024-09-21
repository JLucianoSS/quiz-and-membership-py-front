import Image from "next/image"

export const HeroTitle = ({ title, imgSrc, imgPositionY }) => {
  return (
    <div className="w-full h-[140px] sm:h-[250px] relative">
        <Image 
            className={`w-full h-full object-cover object-[center_${imgPositionY}]`} // Ajusta el foco hacia abajo
            src={imgSrc} 
            alt={`img ` + title} 
            width={1000} 
            height={1000}
        />
        <div className="bg-gray-800 bg-opacity-60 absolute top-0 w-full h-full flex items-center justify-center">
            <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white font-semibold">{title}</h1>
        </div>
    </div>
  )
}
