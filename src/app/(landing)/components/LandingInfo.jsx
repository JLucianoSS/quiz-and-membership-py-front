
import Image from 'next/image'

export const LandingInfo = ({ onScrollToPlans }) => {

  return (
    <section className="">
      <div className="flex flex-col items-center h-[500px] lg:flex-row">


        <div className="flex justify-center bg-white p-6 rounded-lg w-full shadow-sm lg:w-1/2 ">
          <div className='max-w-[450px]'>
            <Image src="/imgs/landing-img.png" alt='project-img' width={800} height={800} className='w-full h-full object-cover'/>
          </div>
        </div>



        <div className="w-full lg:w-1/2 h-full flex items-center relative">
          <div className='mx-4 lg:mx-0 bg-[#3a3a3a] flex flex-col gap-6 p-7 rounded-lg mt-[-55px] lg:mt-0 lg:p-8 lg:absolute lg:left-[-40px] xl:left-[-80px]'>
            <h2 className="text-2xl font-bold text-gray-50">
              Te ayudamos a rendir tu examen de ingreso
            </h2>
            <p className="text-gray-50 text-sm lg:text-base">
              ¿Estás preparándote para ingresar a la universidad? Somos expertos en exámenes de admisión y te proporcionamos todas las herramientas necesarias para que puedas estudiar de manera eficiente.
              Encuentra quizes personalizados y preguntas relacionadas con tu área de estudio para aumentar tus posibilidades de éxito.
            </p>
            <button onClick={onScrollToPlans} className="bg-primary sm:max-w-[250px] text-white px-6 py-2 rounded-lg transition-all duration-300 lg:mb-2">
              Ver planes
            </button>
          </div>
        </div>



      </div>
    </section>
  )
}