import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import React, { useState } from "react";
import { AiOutlineClockCircle} from "react-icons/ai";

export const TabsFAQ = () => {
  const [selected, setSelected] = useState(TABS[0]);

  return (
    <section className="overflow-hidden bg-slate-900 px-4 py-12 text-slate-50">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </section>
  );
};
export default TabsFAQ;

const Heading = () => {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className="mb-8 bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text font-medium text-transparent">
          Let's answer some questions
        </span>
        <span className="mb-8 text-5xl font-bold">FAQs</span>
      </div>

   
    </>
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-violet-500 text-slate-50"
              : "border-slate-600 bg-transparent text-slate-400"
          }`}
          key={tab}
        >
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

const Questions = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(QUESTIONS).map(([tab, questions]) => {
          return selected === tab ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
              className="space-y-4"
              key={tab}
            >
              {questions.map((q, idx) => (
                <Question key={idx} {...q} />
              ))}
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};

const Question = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-slate-700 px-4 transition-colors ${
        open ? "bg-slate-800" : "bg-slate-900"
      }`}
    >
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex w-full items-center justify-between gap-4 py-4"
      >
        <span
          className={`text-left text-lg font-medium transition-colors ${
            open ? "text-slate-50" : "text-slate-400"
          }`}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}
        >
          <AiOutlineClockCircle
            className={`text-2xl transition-colors ${
              open ? "text-slate-50" : "text-slate-400"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "fit-content" : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-400"
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const TABS = ["About", "Participation", "Prizes", "Sponsorship", "Tech Optimum Info"];

const QUESTIONS = {
  "About": [
    {
      question: "What is the 'Time Machine hacks' hackathon?",
      answer:
        "The 'Time Machine hacks' is a 48-hour online hackathon hosted by the nonprofit organization Tech Optimum. It encourages participants to innovate and develop projects around the theme of 'Time Machine'."
    },
    {
      question: "What's the inspiration behind the theme?",
      answer:
        "The theme 'Time Machine' encourages participants to think about the progression of technology, history, and future innovations. It's a unique opportunity to combine the past, present, and future in tech projects."
    },
    {
      question: "When does the hackathon start?",
      answer:
        "The hackathon will begin on [specific date], and run for a total of 48 hours."
    }
  ],
  "Participation": [
    {
      question: "How can I register for the hackathon?",
      answer:
        "You can participate by registering on the Tech Optimum website. All skill levels are welcome, and there's no fee to join the hackathon."
    },
    {
      question: "What are the requirements for participating?",
      answer:
        "Participants need to have a reliable internet connection to join the online hackathon. While there's no specific tech skill requirement, having a basic understanding of coding will be helpful."
    },
    {
      question: "Can I participate as a team?",
      answer:
        "Yes, participants can join as individuals or as part of a team. Specific details on team size and registration can be found on the Tech Optimum website."
    }
  ],
  "Prizes": [
    {
      question: "What are the prizes for the winners?",
      answer:
        "Prizes for the winners vary, including mentorship opportunities, exclusive courses, tech gadgets, and more. Specific prize details will be announced closer to the event date."
    },
    {
      question: "How will the winners be selected?",
      answer:
        "A panel of expert judges will evaluate projects based on creativity, alignment with the theme, technical complexity, and other criteria. Winners will be announced shortly after the hackathon ends."
    }
  ],
  "Sponsorship": [
    {
      question: "How can I sponsor the hackathon?",
      answer:
        "If you're interested in sponsoring the hackathon, please refer to our sponsorship prospectus available on the Tech Optimum website. Your support will directly benefit the participants and further the mission of providing free coding courses to the community."
    },
    {
      question: "What benefits do sponsors receive?",
      answer:
        "Sponsors can receive a range of benefits, including branding opportunities during the hackathon, mentions in promotional materials, and the chance to support a great cause. The specific benefits vary based on the sponsorship tier."
    }
  ],
  "Tech Optimum Info": [
    {
      question: "What is Tech Optimum?",
      answer:
        "Tech Optimum is a 501c3 nonprofit organization that offers free coding courses to individuals. Their mission is to make tech education accessible to everyone."
    },
    {
      question: "How can I learn more about Tech Optimum?",
      answer:
        "To learn more about Tech Optimum and their initiatives, you can visit their official website at [Tech Optimum](https://techoptimum.org)."
    }
  ]
};


