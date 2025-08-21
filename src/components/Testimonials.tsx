import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import avatarFatima from "@/assets/avatar-fatima.jpg";
import avatarHassan from "@/assets/avatar-hassan.jpg";
import avatarJorge from "@/assets/avatar-jorge.jpg";
import avatarNicolas from "@/assets/avatar-nicolas.jpg";
import avatarNoel from "@/assets/avatar-noel.jpg";
import avatarAhmad from "@/assets/avatar-ahmad.jpg";

const testimonials = [
  {
    name: "Fatima Khoury",
    handle: "dilatory_curtains_98",
    img: avatarFatima,
  },
  {
    name: "Hassan Ali",
    handle: "turbulent_unicorn_29",
    img: avatarHassan,
  },
  {
    name: "Jorge Martínez",
    handle: "nefarious_jellybeans_91",
    img: avatarJorge,
  },
  {
    name: "Nicolás Sánchez",
    handle: "pervasive_inker_83",
    img: avatarNicolas,
  },
  {
    name: "Noel Jensen",
    handle: "nefarious_shop_47",
    img: avatarNoel,
  },
  {
    name: "Ahmad Khan",
    handle: "antic_circus_76",
    img: avatarAhmad,
  },
];

interface TestimonialCardProps {
  name: string;
  handle: string;
  img: string;
  idx: number;
}

const TestimonialCard = ({ name, handle, img, idx }: TestimonialCardProps) => {
  // Animation keyframes for up and down movement
  const animationVariants: Record<string, any> = {
    left: {
      y: [-20, 30, -20],
      transition: {
        duration: 10,
        ease: [0, 0.71, 0.2, 1.01], // Smooth cubic-bezier easing
        repeat: Infinity,
        repeatType: "loop",
      },
    },
    center: {
      y: [30, -30, 30],
      transition: {
        duration: 10,
        ease: [0, 0.71, 0.2, 1.01], // Smooth cubic-bezier easing
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
    right: {
      y: [-30, 40, -30],
      transition: {
        duration: 10,
        ease: [0, 0.71, 0.2, 1.01], // Smooth cubic-bezier easing
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  // Determine which variant to apply based on the index
  const positionVariant =
    idx % 3 === 0 ? "left" : idx % 3 === 1 ? "center" : "right";

  return (
    <motion.div
      className="transition-discrete duration-500"
      animate={animationVariants[positionVariant]}
      initial={{ y: 0 }} // Start position
    >
      <Card className="h-full bg-card text-card-foreground border border-border">
        <CardContent className="flex flex-col justify-between h-full p-6">
          <div className="text-muted-foreground text-base">
            <span className="text-3xl leading-none">
              <FaQuoteLeft className="text-primary" />
            </span>
            <p className="mt-2">
              The progress tracker is fantastic. It's motivating to see how much
              I've improved over time. The app has a great mix of common and
              <span className="text-primary font-semibold">
                {" "}
                challenging{" "}
              </span>
              words.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <Avatar className="w-10 h-10">
              <AvatarImage src={img} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm leading-tight text-foreground">{name}</p>
              <p className="text-muted-foreground text-xs">
                {handle}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider border border-primary px-3 py-1 inline-block rounded-md">
          Testimonials
        </p>
        <h2 className="text-4xl font-bold text-foreground mb-12">
          Our trusted <span className="text-primary">clients</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} idx={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;