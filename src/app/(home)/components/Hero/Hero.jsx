
export const Hero = () => {
  return (
    <div className="container py-8 mx-auto">
      <div className="items-center lg:flex">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
              Best place to choose <br /> your{" "}
              <span className={`text-primary`}>clothes</span>
            </h1>

            <p className="mt-3 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
              beatae error laborum ab amet sunt recusandae? Reiciendis natus
              perspiciatis optio.
            </p>

            <button className={`w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto hover:bg-secondary focus:outline-none focus:bg-secondary`}>
              Shop Now
            </button>
          </div>
        </div>

        {/* <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
          <img
            className="w-full h-full lg:max-w-3xl"
            src="https://merakiui.com/images/components/Catalogue-pana.svg"
            alt="Catalogue-pana.svg"
          />
        </div> */}
      </div>
    </div>
  );
};
