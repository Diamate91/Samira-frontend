// import { useEffect, useRef, memo } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { ImageWithFallback } from "./figma/ImageWithFallback";

// const mysticalImages = [
//   {
//     url: "https://images.unsplash.com/photo-1671013033219-c5f37fc92a71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXJvdCUyMGNhcmRzJTIwbXlzdGljYWx8ZW58MXx8fHwxNzY2ODc5MTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     alt: "Karty Tarot - Mistyczna Mądrość",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1761059724415-8f7b95da2dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwYmFsbCUyMGZvcnR1bmV8ZW58MXx8fHwxNzY2OTI2OTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     alt: "Kryształowa Kula - Wróżby",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1545320222-9b9bbf26430b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb2xvZ3klMjB6b2RpYWMlMjBjb3NtaWN8ZW58MXx8fHwxNjY5MjY5NDd8DA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     alt: "Astrologia - Znaki Zodiaku",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1762554912688-19be84d2ac15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXRjaCUyMGNhbmRsZXMlMjByaXR1YWx8ZW58MXx8fHwxNzY2OTI2OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     alt: "Rytuały - Świece i Magia",
//   },
//   {
//     url: "https://images.unsplash.com/photo-1642714834412-143864f89d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29uJTIwbXlzdGljYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzY2OTI2OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
//     alt: "Księżyc - Mistyczna Duchowość",
//   },
// ];

// export const MysticalSlider = memo(function MysticalSlider() {
//   const sliderRef = useRef<Slider>(null);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     fade: true,
//     cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
//     pauseOnHover: false,
//     arrows: false,
//     dotsClass: "slick-dots mystical-dots",
//     lazyLoad: "progressive" as const,
//   };

//   return (
//     <div className="relative rounded-3xl overflow-hidden border-2 border-violet-400/40 shadow-2xl shadow-violet-500/30">
//       <Slider ref={sliderRef} {...settings}>
//         {mysticalImages.map((image, index) => (
//           <div key={index} className="relative">
//             <ImageWithFallback
//               src={image.url}
//               alt={image.alt}
//               loading="lazy"
//               className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
//             />
//             {/* Gradient overlay for better text contrast */}
//             <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent" />
//           </div>
//         ))}
//       </Slider>

//       {/* Floating glow effect */}
//       <div className="absolute -inset-8 bg-violet-500/30 rounded-[3rem] blur-[60px] -z-10 pointer-events-none" />
//       <div className="absolute -inset-12 bg-purple-600/20 rounded-[4rem] blur-[80px] -z-20 pointer-events-none" />

//       {/* Custom CSS for dots */}
//       <style>{`
//         .mystical-dots {
//           bottom: 20px !important;
//           z-index: 10;
//         }
        
//         .mystical-dots li button:before {
//           font-size: 12px;
//           color: rgba(255, 255, 255, 0.5);
//           opacity: 1;
//         }
        
//         .mystical-dots li.slick-active button:before {
//           color: rgb(167, 139, 250);
//           opacity: 1;
//         }
        
//         .mystical-dots li button:hover:before {
//           color: rgb(196, 181, 253);
//         }
//       `}</style>
//     </div>
//   );
// });