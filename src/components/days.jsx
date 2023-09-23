import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiDollarSign, FiEye, FiPlay, FiSearch } from "react-icons/fi";

const Example = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center -mt-[-10vh]">
        <span className="font-semibold text-4xl text-white">How does Time Machine Hacks work?</span>
        <span className="-mt-[-.8rem] bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text font-medium text-transparent">
          A Quick Overview
        
        </span>
        <span className="mt-2 block rounded-full bg-indigo-600 px-4 py-1 text-center font-medium text-white md:hidden">
          Note: This is much cooler on desktop 
        </span>
      </div>
      <div className="-mt-[18vh]">
      <SwapColumnFeatures />
      </div>
   
    </>
  );
};

const SwapColumnFeatures = () => {
  const [featureInView, setFeatureInView] = useState(features[0]);

  return (
    <section className="relative mx-auto max-w-7xl">
      <SlidingFeatureDisplay featureInView={featureInView} />
      <div className="-mt-[60vh] hidden md:block" />

      {features.map((s) => (
        <Content
          key={s.id}
          featureInView={s}
          setFeatureInView={setFeatureInView}
          {...s}
        />
      ))}
    </section>
  );
};

const SlidingFeatureDisplay = ({ featureInView }) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-3/5 rounded-xl p-8"
      >
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

const Content = ({ setFeatureInView, featureInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <span className="rounded-full bg-indigo-600 px-2 py-1.5 text-xs font-medium text-white">
            {featureInView.callout}
          </span>
          <p className="my-3 text-5xl font-bold">{featureInView.title}</p>
          <p className="text-slate-300">{featureInView.description}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <ExampleFeature featureInView={featureInView} />
        </motion.div>
      </div>
    </section>
  );
};

const ExampleFeature = ({ featureInView }) => {
    const commandsMap = {
      'Project Revival': [
        'git clone old_project.git',
        'cd old_project',
        'npm install',
        'git checkout -b revival-branch',
        'echo "reviving this old gem 💎" > REVIVE.md',
        'git add .',
        'git commit -m "Starting the revival"'
      ],
      'Optimization': [
        'npm install --save-dev optimization-lib',
        'echo "Optimizing... Please wait."',
        'npm run optimize-images',
        'npm run optimize-code',
        'git add .',
        'git commit -m "Project optimized 🚀"'
      ],
      'Showcase & Awards': [
        'echo "Preparing for showcase..."',
        'npm run build',
        'npm run deploy',
        'git tag -a v1.0.0 -m "Final version"',
        'git push origin v1.0.0',
        'echo "🌟 You are now live for the showcase! 🌟"'
      ],
    };
  
    const commandsToShow = commandsMap[featureInView.title] || [];
  
    return (
      <div className="relative h-80 w-full rounded-xl bg-slate-800 shadow-xl">
        <div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="p-2 font-mono text-sm text-slate-200">
          {commandsToShow.map((command, index) => (
            <div class="z-100" key={index}>
              <span className="text-green-300">~</span> {command}
            </div>
          ))}
        </div>
        
        <span className="z-10 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl text-slate-700">
          <featureInView.Icon />
        </span>
      </div>
    );
  };
  
  
export default Example;

const features = [
    {
      id: 1,
      callout: "Day 1",
      title: "Project Revival",
      description:
        "Dust off your unfinished projects. Day 1 is all about identifying the potential in old ideas and giving them a new lease on life.",
      contentPosition: "r",
      Icon: FiSearch,
    },
    {
      id: 2,
      callout: "Day 2",
      title: "Optimization",
      description:
        "Take your rebooted project to the next level. Attend workshops and collaborate with mentors to fine-tune your ideas.",
      contentPosition: "l",
      Icon: FiEye,
    },
    {
      id: 3,
      callout: "Day 3",
      title: "Showcase & Awards",
      description:
        "It’s time to present your project to the world. Stand a chance to win amazing prizes, from cash to internships with leading tech firms.",
      contentPosition: "r",
      Icon: FiDollarSign,
    },
  ];
  