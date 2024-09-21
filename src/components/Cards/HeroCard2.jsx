import Image from 'next/image';
import Link from 'next/link';

export const HeroCard2 = ({ 
  title, 
  highlightText, 
  description, 
  buttonText, 
  buttonLink, 
  imageSrc, 
  imageAlt,
  handleAction
}) => {
  return (
    <div className="py-8 px-10 flex items-center mb-10 justify-center shadow-sm rounded-xl bg-white h-full">
      <div className="items-center flex flex-col-reverse lg:flex-row lg:h-full">
        {/* Columna de texto */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between h-full">
          <div className="lg:max-w-lg flex flex-col items-start h-full">
            <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl">
              {title}{" "}<span className="text-primary">{highlightText}</span>
            </h1>

            <p className="mt-3 text-gray-800 text-sm lg:text-base">
              {description}
            </p>

            {handleAction 
              ? <button onClick={handleAction} className=" px-6 py-2 mt-4 tracking-wider text-white transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto hover:bg-secondary focus:outline-none focus:bg-secondary">
                  {buttonText}
                </button> 
              : 
                <Link href={buttonLink} className="px-6 py-2 mt-4 tracking-wider text-white transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto hover:bg-secondary focus:outline-none focus:bg-secondary">
                  {buttonText}
                </Link>}
          </div>
        </div>

        {/* Columna de imagen */}
        <div className="lg:flex items-center justify-center lg:w-1/2 lg:h-full">
          <div className="max-w-sm">
            <Image
              className="max-w-[150px] lg:w-full h-full lg:max-w-3xl object-cover"
              width={500}
              height={500}
              src={imageSrc}
              alt={imageAlt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
