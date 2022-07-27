import Image from "next/image";

function Banner() {
  return (
    <>
      <div className="bg-white object-contain h-96 bg-cover bg-inherit bg-[url('https://images7.alphacoders.com/857/thumb-1920-857340.jpg')]">
        <div className="ml-8 pt-32 h-48">
          <h1 className="text-5xl font-extrabold pb-1">
            Avengers Infinity War
          </h1>
          <div>
            <button className="cursor-pointer text-white bg-gray-900 outline-none border-none font-bold rounded-sm px-8 pr-8 mr-4 pt-2 pb-2">
              Play
            </button>
            <button className="cursor-pointer text-white bg-gray-900 outline-none border-none font-bold rounded-sm px-8 pr-8 mr-4 pt-2 pb-2">
              My List
            </button>
          </div>
          <h1 className="w-96 leading-5 font-xs max-w-xs h-20 text-white">
            As the Avengers and their allies have continued to protect the world
            from threats too large for any one hero to handle, a new danger has
            emerged from the cosmic shadows: Thanos.
          </h1>
          {/* <div className="h-28 bg-gradient-to-t from-gray-700 to-black-500">
            ssss
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Banner;
