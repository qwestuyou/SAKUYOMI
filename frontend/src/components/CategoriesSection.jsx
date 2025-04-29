import React, { useRef, useEffect } from "react";

const categories = [
  {
    name: "Figures",
    image: "/images/narutocategory.png",
    link: "/catalog?category=figures",
  },
  {
    name: "Clothing",
    image: "/images/futbolkacategory.png",
    link: "/catalog?category=clothing",
  },
  {
    name: "Accessories",
    image: "/images/acsesyarycategory.png",
    link: "/catalog?category=accessories",
  },
  {
    name: "Manga",
    image: "/images/mangacategory.png",
    link: "/catalog?category=manga",
  },
  {
    name: "Poster",
    image: "/images/postercategory.png",
    link: "/catalog?category=poster",
  },
  {
    name: "Badge",
    image: "/images/badgecategory.png",
    link: "/catalog?category=badge",
  },
  {
    name: "Funko Pop! Anime",
    image: "/images/funkocategory.png",
    link: "/catalog?category=funko pop! anime",
  },
  {
    name: "Stationery",
    image: "/images/stationerycategory.png",
    link: "/catalog?category=stationery"
  }
  
];

export default function CategoriesSection() {
  return (
    <section className="px-20 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-[#fedfe1] p-4 rounded-2xl shadow flex flex-col items-center"
          >
            <img
              src={category.image}
              alt={category.name}
              className="rounded-xl mb-5 w-full h-75 object-cover"
            />
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <a
              href={category.link}
              className="bg-[#f59c9e] text-white px-8 py-2 rounded-xl hover:bg-[#e0bcbc] transition-colors duration-300"
            >
              View all
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
