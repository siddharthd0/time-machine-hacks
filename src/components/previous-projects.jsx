import { motion } from "framer-motion";

const ScrollingProjects = () => {
  return (
    <div className="bg-slate-950 py-12">
      <div className="mb-8 px-4">
        <h3 className="text-slate-50 text-4xl font-semibold text-center">
          Projects at Tech Optimums & Other Hackathons
        </h3>
        <p className="text-center text-slate-300 text-sm mt-2 max-w-lg mx-auto">
          Check out some of the innovative projects from past events.
        </p>
      </div>
      <div className="p-4 overflow-x-hidden relative">
        <div className="flex items-center mb-4">
          <ProjectList list={projects.top} duration={125} />
          <ProjectList list={projects.top} duration={125} />
          <ProjectList list={projects.top} duration={125} />
        </div>
      </div>
    </div>
  );
};

const ProjectList = ({ list, reverse = false, duration = 50 }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {list.map((p) => {
        return (
          <div key={p.id} className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative">
            <img src={p.img} className="w-full h-44 object-cover" />
            <div className="bg-slate-900 text-slate-50 p-4">
              <span className="block font-semibold text-lg mb-1">{p.name}</span>
              <span className="block mb-3 text-sm font-medium">{p.techStack}</span>
              <span className="block text-sm text-slate-300">{p.description}</span>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

const projects = {
  top: [
    {
      id: 1,
      img: "https://link-to-image1.com",
      name: "Project One",
      techStack: "React, Node.js",
      description: "An innovative solution for problem X.",
    },
    {
      id: 2,
      img: "https://link-to-image2.com",
      name: "Project Two",
      techStack: "Python, Flask",
      description: "A revolutionary approach to solve Y.",
    },
    // More projects
  ],
  // Optionally add middle and bottom categories
};
