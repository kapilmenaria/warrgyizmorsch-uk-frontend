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
    name: "Virazo",
    src: "/images/Logo-slider-imgs/slider-virazo.webp",
    scale: 1.0,
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
    name: "Bharat",
    src: "/images/Logo-slider-imgs/Bharat.png",
    scale: 1.3,
  },
  {
    name: "Democracy Asia",
    src: "/images/Logo-slider-imgs/Democracy Asia.png",
    scale: 1.2,
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
    name: "Mewar",
    src: "/images/Logo-slider-imgs/Mewar.png",
    scale: 1.25,
  },
  {
    name: "Assignment",
    src: "/images/Logo-slider-imgs/assignment_logo.png",
    scale: 1.35,
  },
  {
    name: "Code Spare",
    src: "/images/Logo-slider-imgs/code_spare_logo.webp",
    scale: 1.3,
  },
  {
    name: "ITMS",
    src: "/images/Logo-slider-imgs/itms-logo.webp",
    scale: 1.4,
  },

  {
    name: "Nratie",
    src: "/images/Logo-slider-imgs/nratie_logo.webp",
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
          className="logo-item group flex items-center justify-center px-5"
        >
          <div className="flex h-16 sm:h-20 w-40 sm:w-44 items-center justify-center">
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              style={{
                transform: `scale(${logo.scale ?? 1})`,
              }}
              className="
                max-h-14
                sm:max-h-16
                max-w-[160px]
                object-contain
                transition-all
                duration-300
                opacity-90
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
    <section className="w-full px-5 py-8 md:py-10 overflow-hidden">
      <div className="w-full">
        <div className="overflow-hidden py-6">
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