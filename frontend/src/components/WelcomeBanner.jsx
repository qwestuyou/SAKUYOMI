import React from "react";

export default function WelcomeBanner() {
  return (
    <section
      className="w-full h-[80vh] bg-cover bg-center relative animate-fadeIn"
      style={{ backgroundImage: "url('/images/snapedit_1744989767535.png')" }}
    >
      <div className="flex items-center justify-center h-full">
        <h1 className="text-5xl font-semibold text-center text-[#c97476] px-4 sm:text-4xl animate-fadeIn">
          キラキラマーケットへようこそ!
        </h1>
      </div>
    </section>
  );
}
