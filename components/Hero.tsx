"use client";
import Navbar from "./Navbar";
import { BackgroundBeamsWithCollision } from "./ui/BackgroundBeamsWithCollision";
import Button from "./ui/Button";

const Hero = () => {
  return (
    <>
      {/** Background Beam / Rain animation - Acernity UI */}
      {/** Components/ui */}
      <BackgroundBeamsWithCollision>
        <div className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          <h2 className="mb-4">Clear skies or stormy weather</h2>

          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">we&apos;ve got you covered</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">we&apos;ve got you covered</span>
            </div>
          </div>
          <div className="mt-10">
            <Button title="View Map" />
          </div>
          <Navbar />
        </div>
      </BackgroundBeamsWithCollision>
    </>
  );
};

export default Hero;
