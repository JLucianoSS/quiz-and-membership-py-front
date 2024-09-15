import Image from 'next/image';
import Link from 'next/link';

export const HeroCard = ({ 
  title, 
  highlightText, 
  description, 
  buttonText, 
  buttonLink, 
  imageSrc, 
  imageAlt 
}) => {
  return (
    <div className="py-5 px-10 flex items-center justify-center border rounded-xl border-gray-100 bg-gray-100">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-2xl font-semibold text-gray-800 lg:text-4xl">
              {title}{" "}<span className="text-primary">{highlightText}</span>
            </h1>

            <p className="mt-3 text-gray-600 text-sm">
              {description}
            </p>

            <Link href={buttonLink}>
              <button className="w-full px-5 py-1 mt-4 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto hover:bg-secondary focus:outline-none focus:bg-secondary">
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <div className='max-w-sm'>
              <Image
                className="w-full h-full lg:max-w-3xl object-cover"
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
