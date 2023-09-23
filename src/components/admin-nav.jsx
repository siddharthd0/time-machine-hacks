import { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useTransform,
  useScroll,
  motion,
} from "framer-motion";
import Image from "next/image";

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
      className="fixed top-0 z-10 flex h-[56px] w-full items-center justify-between bg-black  py-8 px-12 text-white -ml-8"
    >
      <a href="https://techoptimum.org">
        <Image src="/tech-time.png" width={150} height="500" />
      </a>

      <div className="flex gap-2 ">
        <a
          href="#register"
          className="px-3 py-1.5 font-semibold uppercase text-white hover:bg-white/20"
        >
          REGISTER
        </a>
        <a
          href="https://techoptimum.org/discord"
          className="bg-white px-3 py-1.5 font-semibold uppercase text-black"
        >
          DISCORD SERVER
        </a>
      </div>
    </motion.nav>
  );
};
export default Navigation;
