import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useTransform,
  useScroll,
  motion,
} from "framer-motion";
import Image from "next/image"
const TrippyHero = () => {
  return (
    <section className="bg-white">
      <Navigation />
      <Hero />
    
    </section>
  );
};

const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.65, 0.8, 1],
    [1, 1, 0.9, 1.25]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    ["0deg", "0deg", "60deg"]
  );
  const top = useTransform(scrollYProgress, [0, 0.25], ["80%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.125], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 1]);

  return (
    <div ref={targetRef} className="relative z-0 h-[800vh] bg-neutral-200">
      <div className="sticky top-0 h-screen bg-white">
        <Copy opacity={opacity} />
        <Trippy rotate={rotate} top={top} scale={scale} />
        <OverlayLogo scale={logoScale} />
      </div>
    </div>
  );
};

const NUM_SECTIONS = 25;
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

const generateSections = (count, color, scale, rotate) => {
  if (count === NUM_SECTIONS) {
    return <></>;
  }

  const nextColor = color === "black" ? "white" : "black";

  return (
    <Section rotate={rotate} scale={scale} background={color}>
      {generateSections(count + 1, nextColor, scale, rotate)}
    </Section>
  );
};

const Trippy = ({ rotate, scale, top }) => {
  return (
    <motion.div
      style={{ top }}
      className="absolute bottom-0 left-0 right-0 overflow-hidden bg-black"
    >
      {generateSections(0, "black", scale, rotate)}
    </motion.div>
  );
};

const Section = ({ background, scale, children, rotate }) => {
  return (
    <motion.div
      className="relative h-full w-full origin-center"
      style={{
        background,
        scale,
        rotate,
        padding: PADDING,
      }}
    >
      {children}
    </motion.div>
  );
};

const Copy = ({ opacity }) => {
  return (
    <motion.div
      style={{ opacity }}
      // Padding top + 56px to accommodate for navbar height
      className="relative flex h-4/5 flex-col items-center justify-center gap-4 overflow-hidden bg-white p-4 pt-[calc(56px_+_16px)] text-black"
    >
      <h1 className="text-center text-5xl font-black md:text-7xl">
        Time Machine Hacks
      </h1>
      <p className="text-center text-base md:text-lg">
       A 48-hour hackathon for you to build your forgotten ideas and bring them back to life.
      </p>
      <a href="#register" className="bg-black px-3 py-1.5 text-base font-semibold uppercase text-white md:text-lg">
        Register Now
      </a>
      <div className="absolute -left-28 -top-28 h-56 w-56 rotate-45 bg-black" />
      <div className="absolute -bottom-24 -right-24 h-48 w-48 rotate-45 bg-black" />
    </motion.div>
  );
};

const Navigation = () => {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-10 flex h-[56px] w-full items-center justify-between bg-black px-2 text-white"
    >
      <Image src="/tech-time.png" width={150} height="500"/>
       


      <div className="flex gap-2">
        <a href="#register" className="px-3 py-1.5 font-semibold uppercase text-white hover:bg-white/20">
          REGISTER
        </a>
        <a  href="https://techoptimum.org/discord" className="bg-white px-3 py-1.5 font-semibold uppercase text-black">
          DISCORD SERVER
        </a>
      </div>
    </motion.nav>
  );
};

const OverlayLogo = ({ scale }) => {
  return (
    <motion.div
      style={{ scale }}
      className="pointer-events-none absolute inset-0 z-[5] grid place-content-center"
    >
      <Image width={350} height={350} src="/tech-optimum-whiteish.png" />
      <h1 className="text-3xl font-light text-white text-center">presents...</h1>

    </motion.div>
  );
};

export default TrippyHero;