import Image from 'next/image';
import Link from 'next/link';

export const HeroCard = ({ 
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
    <div className="bg-white w-full flex justify-between shadow-sm pt-6 pb-10 lg:py-2 px-6 lg:px-20 xl:px-44 ">
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between sm:gap-6 w-full">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg flex flex-col items-center sm:items-start">
            <h1 className="text-2xl font-semibold text-gray-800 lg:text-4xl">
              {title}{" "}<span className="text-primary">{highlightText}</span>
            </h1>

            <p className="mt-3 text-gray-600 text-sm text-center sm:text-start">
              {description}
            </p>

            {handleAction 
              ? <button onClick={handleAction} className="px-5 py-2 mt-4 tracking-wider text-white transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto hover:bg-secondary focus:outline-none focus:bg-secondary">
                  {buttonText}
                </button> 
              : 
                <Link href={buttonLink} className="px-5 py-2 mt-4 tracking-wider text-white transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto hover:bg-secondary focus:outline-none focus:bg-secondary">
                  {buttonText}
                </Link>}
          </div>
        </div>
        <div className="w-full  flex items-center justify-center lg:flex-row lg:w-1/2">
          <div className='max-w-[14rem] lg:max-w-sm'>
              <Image
                className="w-full h-full object-cover"
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
