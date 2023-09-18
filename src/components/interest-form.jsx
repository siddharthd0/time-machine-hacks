import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { Fragment, useEffect, useRef, useState } from "react";

const TerminalHackathonRegister = () => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  return (
    <section
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1734&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="px-4 py-12 bg-violet-600"
    >
      <div
        ref={containerRef}
        onClick={() => {
          inputRef.current?.focus();
        }}
        className="h-96 bg-slate-950/70 backdrop-blur rounded-lg w-full max-w-3xl mx-auto overflow-y-scroll shadow-xl cursor-text font-mono"
      >
        <TerminalHeader />
        <TerminalBody inputRef={inputRef} containerRef={containerRef} />
      </div>
    </section>
  );
};

const TerminalHeader = () => {
  return (
    <div className="w-full p-3 bg-slate-900 flex items-center gap-1 sticky top-0">
      <div className="w-3 h-3 rounded-full bg-red-500" />
      <div className="w-3 h-3 rounded-full bg-yellow-500" />
      <div className="w-3 h-3 rounded-full bg-green-500" />
      <span className="text-sm text-slate-200 font-semibold absolute left-[50%] -translate-x-[50%]">
        Register Form
      </span>
    </div>
  );
};

const TerminalBody = ({ containerRef, inputRef }) => {
    const [errorMessage, setErrorMessage] = useState(null); 
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");

  const [questions, setQuestions] = useState(QUESTIONS);

  const curQuestion = questions.find((q) => !q.complete);

  const handleSubmitLine = (value) => {
    if (curQuestion) {
      let isValid = true;
      let errorMsg = '';

      if (curQuestion.key === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMsg = 'Invalid email format';
        }
      }

      if (curQuestion.key === 'github_link') {
        const githubUrlRegex = /^(https?:\/\/github\.com\/[a-zA-Z0-9_-]+)$/;
        if (!githubUrlRegex.test(value)) {
          isValid = false;
          errorMsg = 'Invalid GitHub URL';
        }
      }

      if (value.trim() === '') {
        isValid = false;
        errorMsg = 'Field cannot be empty';
      }

      if (isValid) {
        setQuestions((pv) =>
          pv.map((q) => {
            if (q.key === curQuestion.key) {
              return {
                ...q,
                complete: true,
                value,
              };
            }
            return q;
          })
        );
        setErrorMessage(null); ``

      } else {
        setErrorMessage(errorMsg);
      }
    }
  };

  return (
    <div className="p-2 text-slate-100 text-lg">
    <InitialText />
    <PreviousQuestions questions={questions} />
    <CurrentQuestion curQuestion={curQuestion} errorMessage={errorMessage} />
      {curQuestion ? (
        <CurLine
          text={text}
          focused={focused}
          setText={setText}
          setFocused={setFocused}
          inputRef={inputRef}
          command={curQuestion?.key || ""}
          handleSubmitLine={handleSubmitLine}
          containerRef={containerRef}
        />
      ) : (
        <Summary questions={questions} setQuestions={setQuestions} />
      )}
    </div>
  );
};

const InitialText = () => {
  return (
    <>
      <p>Hey there! We're excited to have you registering!</p>
      <p className="whitespace-nowrap overflow-hidden font-light">
        ------------------------------------------------------------------------
      </p>
    </>
  );
};

const PreviousQuestions = ({ questions }) => {
  return (
    <>
      {questions.map((q, i) => {
        if (q.complete) {
          return (
            <Fragment key={i}>
              <p>
                {q.text || ""}
                {q.postfix && (
                  <span className="text-violet-300">{q.postfix}</span>
                )}
              </p>
              <p className="text-emerald-300">
                <FiCheckCircle className="inline-block mr-2" />
                <span>{q.value}</span>
              </p>
            </Fragment>
          );
        }
        return <Fragment key={i}></Fragment>;
      })}
    </>
  );
};

const CurrentQuestion = ({ curQuestion, errorMessage }) => {
    if (!curQuestion) return <></>;
  
    return (
      <div>
        <p>
          {curQuestion.text || ""}
          {curQuestion.postfix && (
            <span className="text-violet-300">{curQuestion.postfix}</span>
          )}
        </p>
        {errorMessage && (
          <p className="text-red-500 text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    );
  };
const Summary = ({ questions, setQuestions }) => {
  const [complete, setComplete] = useState(false);

  const handleReset = () => {
    setQuestions((pv) => pv.map((q) => ({ ...q, value: "", complete: false })));
  };

  const handleSend = () => {
    const formData = questions.reduce((acc, val) => {
      return { ...acc, [val.key]: val.value };
    }, {});
  
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setComplete(true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  

  return (
    <>
      <p>Beautiful! Here's what we've got:</p>
      {questions.map((q) => {
        return (
          <p key={q.key}>
            <span className="text-blue-300">{q.key}:</span> {q.value}
          </p>
        );
      })}
      <p>Look good?</p>
      {complete ? (
        <p className="text-emerald-300">
          <FiCheckCircle className="inline-block mr-2" />
          <span>Sent! We'll get back to you ASAP 😎</span>
        </p>
      ) : (
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleReset}
            className="px-3 py-1 text-base hover:opacity-90 transition-opacity rounded bg-slate-100 text-black"
          >
            Restart
          </button>
          <button
            onClick={handleSend}
            className="px-3 py-1 text-base hover:opacity-90 transition-opacity rounded bg-indigo-500 text-white"
          >
            Send it!
          </button>
        </div>
      )}
    </>
  );
};

const CurLine = ({
  text,
  focused,
  setText,
  setFocused,
  inputRef,
  command,
  handleSubmitLine,
  containerRef,
}) => {
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmitLine(text);
    setText("");
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  };

  const onChange = (e) => {
    setText(e.target.value);
    scrollToBottom();
  };

  useEffect(() => {
    return () => setFocused(false);
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          onChange={onChange}
          value={text}
          type="text"
          className="sr-only"
          autoComplete="off"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </form>
      <p>
        <span className="text-emerald-400">➜</span>{" "}
        <span className="text-cyan-300">~</span>{" "}
        {command && <span className="opacity-50">Enter {command}: </span>}
        {text}
        {focused && (
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
              times: [0, 0.5, 0.5, 1],
            }}
            className="inline-block w-2 h-5 bg-slate-400 translate-y-1 ml-0.5"
          />
        )}
      </p>
    </>
  );
};

export default TerminalHackathonRegister;

const QUESTIONS = [
    {
      key: "email",
      text: "To kick things off, what's ",
      postfix: "your email?",
      complete: false,
      value: "",
    },
    {
      key: "name",
      text: "Great! What's ",
      postfix: "your name?",
      complete: false,
      value: "",
    },
    {
      key: "team_name",
      text: "Do you have a ",
      postfix: "team name?",
      complete: false,
      value: "",
    },
    {
      key: "project_idea",
      text: "Awesome! What's your ",
      postfix: "project idea?",
      complete: false,
      value: "",
    },
    {
      key: "tech_stack",
      text: "What ",
      postfix: "tech stack will you use?",
      complete: false,
      value: "",
    },
    {
      key: "github_link",
      text: "Finally, could you share ",
      postfix: "your GitHub profile link?",
      complete: false,
      value: "",
    },
  ];
  
  