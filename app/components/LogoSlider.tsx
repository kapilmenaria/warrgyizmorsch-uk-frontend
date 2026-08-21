"use client";

interface LogoItem {
  name: string;
  src: string;
  scale?: number;
}

const logos: LogoItem[] = [
  {
    name: "WTS",
    src: "/images/Logo-slider-imgs/slider-wts.webp",
    scale: 1.0,
  },
  {
    name: "Aloe",
    src: "/images/Logo-slider-imgs/slider-aloe.webp",
    scale: 1.05,
  },

  {
    name: "London Street",
    src: "/images/Logo-slider-imgs/slider-londonstreet.webp",
    scale: 1.1,
  },
  {
    name: "Flower",
    src: "/images/Logo-slider-imgs/slider-flower.webp",
    scale: 1.05,
  },
  {
    name: "Comfort",
    src: "/images/Logo-slider-imgs/slider-comfort.webp",
    scale: 1.0,
  },

  {
    name: "Fantas",
    src: "/images/Logo-slider-imgs/Fantas.png",
    scale: 1.35,
  },
  {
    name: "Ironstreets",
    src: "/images/Logo-slider-imgs/Ironstreets.png",
    scale: 1.35,
  },
  {
    name: "Metronomi",
    src: "/images/Logo-slider-imgs/Metronomi.png",
    scale: 1.25,
  },

  {
    name: "Assignment",
    src: "/images/Logo-slider-imgs/assignment_logo.png",
    scale: 1.35,
  },
  {
    name: "Code Spare",
    src: "/images/Logo-slider-imgs/code_spare_logo.jpg",
    scale: 1.3,
  },
  {
    name: "ITMS",
    src: "/images/Logo-slider-imgs/itms-logo.jpg",
    scale: 1.4,
  },

  {
    name: "Nratie",
    src: "/images/Logo-slider-imgs/nratie_logo.jpg",
    scale: 1.45,
  },
  {
    name: "Number Plate",
    src: "/images/Logo-slider-imgs/number_plate.webp",
    scale: 1.35,
  },
  {
    name: "United Tree",
    src: "/images/Logo-slider-imgs/united_tree_logo.webp",
    scale: 1.35,
  },
  {
    name: "Voltverashop",
    src: "/images/Logo-slider-imgs/voltverashop.png",
    scale: 1.25,
  },
  {
    name: "Yellow Sapphire",
    src: "/images/Logo-slider-imgs/yellow_spphire.webp",
    scale: 1.35,
  },
];

function LogoGroup() {
  return (
    <div className="logo-group">
      {logos.map((logo, index) => (
        <div
          key={`${logo.name}-${index}`}
          className="logo-item group"
        >
          <div className="flex h-full w-full items-center justify-center p-1 sm:p-2 lg:p-3">
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              className="
                max-h-9
                sm:max-h-12
                md:max-h-16
                lg:max-h-20
                xl:max-h-22
                max-w-[110px]
                sm:max-w-[135px]
                md:max-w-[165px]
                lg:max-w-[200px]
                xl:max-w-[215px]
                w-auto
                h-auto
                object-contain
                transition-all
                duration-300
                opacity-85
                hover:opacity-100
                group-hover:-translate-y-1
              "
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LogoSlider() {
  return (
    <section className="w-full py-3 sm:py-5 md:py-6 overflow-hidden">
      <div className="w-full">
        <div className="overflow-hidden py-1 sm:py-2">
          <div className="logo-slider">
            <div className="logo-track">
              <LogoGroup />
              <LogoGroup />
              <LogoGroup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}