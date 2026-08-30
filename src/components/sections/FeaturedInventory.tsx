"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface FeaturedVehicle {
  id: string;
  number: string;
  categoryTag: string;
  year: number;
  make: string;
  model: string;
  price: string;
  engineSpec: string;
  powerSpec: string;
  bgImage: string;
  cardImage: string;
}

const featuredVehicles: FeaturedVehicle[] = [
  {
    id: "ferrari-laferrari",
    number: "01",
    categoryTag: "SUPERCAR",
    year: 2015,
    make: "FERRARI",
    model: "LAFERRARI",
    price: "$3,500,000",
    engineSpec: "6.3L V12 + KERS",
    powerSpec: "950 HP",
    bgImage: "/images/vehicles/LaFerrari.jpeg",
    cardImage: "/images/vehicles/LaFerrari-Thumbnail.png",
  },
  {
    id: "mercedes-s-class",
    number: "02",
    categoryTag: "LUXURY SEDAN",
    year: 2024,
    make: "MERCEDES-BENZ",
    model: "S-CLASS",
    price: "$128,150",
    engineSpec: "4.0L BITURBO V8",
    powerSpec: "496 HP",
    bgImage: "/images/vehicles/S-Class.jpeg",
    cardImage: "/images/vehicles/Mercedes-SClass-Thumbnail.png",
  },
  {
    id: "bmw-m8-gran-coupe",
    number: "03",
    categoryTag: "PERFORMANCE",
    year: 2024,
    make: "BMW",
    model: "M8 GRAN COUPE",
    price: "$139,900",
    engineSpec: "4.4L TWIN-POWER V8",
    powerSpec: "617 HP",
    bgImage: "/images/vehicles/BMW-M8-Gran-Coupe(Hero).png",
    cardImage: "/images/vehicles/BMW-M8-Thumbnail.png",
  },
  {
    id: "rolls-royce-ghost",
    number: "04",
    categoryTag: "LUXURY",
    year: 2024,
    make: "ROLLS-ROYCE",
    model: "GHOST",
    price: "$392,000",
    engineSpec: "6.75L TWIN-TURBO V12",
    powerSpec: "563 HP",
    bgImage: "/images/vehicles/Rolls-Royce-Ghost(Hero).png",
    cardImage: "/images/vehicles/Rolls-Royce-Ghost-Thumbnail.png",
  },
  {
    id: "toyota-tacoma",
    number: "05",
    categoryTag: "TRUCK",
    year: 2024,
    make: "TOYOTA",
    model: "TACOMA",
    price: "$63,700",
    engineSpec: "2.4L i-FORCE MAX",
    powerSpec: "326 HP",
    bgImage: "/images/vehicles/Toyota-Tacoma(Hero).png",
    cardImage: "/images/vehicles/TacomaThumbnail.png",
  },
];

export function FeaturedInventory() {
  const [activeCarId, setActiveCarId] = useState(featuredVehicles[0].id);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeCar =
    featuredVehicles.find((car) => car.id === activeCarId) || featuredVehicles[0];
  const activeIndex = featuredVehicles.findIndex((car) => car.id === activeCar.id);

  const goPrev = () => {
    const prevIndex = (activeIndex - 1 + featuredVehicles.length) % featuredVehicles.length;
    setActiveCarId(featuredVehicles[prevIndex].id);
    document
      .getElementById(`featured-card-${featuredVehicles[prevIndex].id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % featuredVehicles.length;
    setActiveCarId(featuredVehicles[nextIndex].id);
    document
      .getElementById(`featured-card-${featuredVehicles[nextIndex].id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <section className="relative h-screen min-h-[750px] w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          key={activeCar.id}
          src={activeCar.bgImage}
          alt={activeCar.model}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-opacity duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-between px-8 py-10 md:px-16 md:py-14">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-light tracking-[0.3em] text-white/60 uppercase">
            02 / FEATURED INVENTORY
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <button
                onClick={goPrev}
                aria-label="Previous vehicle"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next vehicle"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="text-xs font-light tracking-[0.25em] text-white/70">
              0{activeIndex + 1} / 0{featuredVehicles.length}
            </div>
          </div>
        </div>

        {/* Center Editorial Display */}
        <div className="my-auto max-w-xl space-y-8">
          <div className="flex flex-col items-start">
            <h2 className="text-4xl font-extralight tracking-[0.2em] text-white uppercase sm:text-5xl md:text-6xl">
              FEATURED
            </h2>
            <h2 className="text-4xl font-extralight tracking-[0.2em] text-white uppercase sm:text-5xl md:text-6xl">
              INVENTORY
            </h2>
            <p className="mt-4 max-w-sm text-xs font-light leading-relaxed text-white/60">
              A curated selection of exceptional vehicles from the MSyntra collection.
            </p>

            <Link
              href="/catalog"
              className="group relative mt-6 inline-flex items-center gap-2 pb-1 text-[11px] font-light tracking-[0.25em] text-white/80 transition-colors hover:text-white"
            >
              <span>VIEW FULL INVENTORY</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-colors group-hover:bg-white" />
            </Link>
          </div>

          <div className="flex flex-col items-start space-y-3 pt-4">
            <div className="text-xs font-light text-white/50">{activeCar.year}</div>
            <h3 className="text-3xl font-extralight tracking-[0.15em] text-white uppercase sm:text-4xl">
              {activeCar.make} {activeCar.model}
            </h3>
            <div className="text-xs font-light tracking-[0.15em] text-white/60 uppercase">
              {activeCar.engineSpec} • {activeCar.powerSpec}
            </div>
            <div className="text-2xl font-light tracking-[0.1em] text-white">
              {activeCar.price}
            </div>

            <Link
              href={`/catalog/${activeCar.id}`}
              className="group relative inline-flex items-center gap-2 pt-2 pb-1 text-[11px] font-light tracking-[0.2em] text-white/80 transition-colors hover:text-white"
            >
              <span>VIEW VEHICLE</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="absolute bottom-0 left-0 h-[1px] w-full bg-white/20 transition-colors group-hover:bg-white" />
            </Link>
          </div>
        </div>

        {/* Bottom Horizontal Carousel */}
        <div className="w-full pt-6">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredVehicles.map((car) => {
              const isActive = car.id === activeCar.id;

              return (
                <button
                  id={`featured-card-${car.id}`}
                  key={car.id}
                  onClick={() => setActiveCarId(car.id)}
                  className={`group relative flex shrink-0 flex-col overflow-hidden rounded-md text-left transition-all duration-300 ${
                    isActive
                      ? "border border-white/80 bg-black/60 shadow-2xl backdrop-blur-md"
                      : "border border-white/10 bg-black/30 hover:border-white/40 backdrop-blur-sm opacity-70 hover:opacity-100"
                  } w-[180px] sm:w-[220px] md:w-[240px]`}
                >
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden">
                    <Image
                      src={car.cardImage}
                      alt={car.model}
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute left-3 top-3 text-[9px] font-light tracking-[0.15em] text-white/70 uppercase">
                      {car.number} {car.categoryTag}
                    </div>
                  </div>

                  <div className="p-3">
                    <h4 className="truncate text-xs font-light tracking-[0.1em] text-white uppercase">
                      {car.make} {car.model}
                    </h4>
                    <div className="mt-1 text-xs font-light text-white/70">
                      {car.price}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}