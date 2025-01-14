import React from "react";
import Image from "next/image";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white w-[100vw] h-[100vh] z-[1000]">
      <div className="loader"></div>{" "}
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/icones/loadloop.gif"
          alt="loop"
          width={300}
          height={300}
          className="mx-auto"
        />
        <p className="text-black-500 mt-4 text-2xl">
          Chargement de la carte
          <span className="dot-1">.</span>
          <span className="dot-2">.</span>
          <span className="dot-3">.</span>
        </p>
        <style jsx>{`
          @keyframes blink {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          .dot-1 {
            animation: blink 1s infinite 0s;
          }
          .dot-2 {
            animation: blink 1s infinite 0.33s;
          }
          .dot-3 {
            animation: blink 1s infinite 0.66s;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;
