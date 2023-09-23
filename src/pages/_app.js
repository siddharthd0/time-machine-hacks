import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer className="bg-white dark:bg-gray-900 mx-auto text-center pt-16">
        <div>
          <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Questions? Email us at
          </span>
          <a
            href="mailto:team@techoptimum.org"
            className="block text-2xl font-medium text-gray-900 hover:opacity-75 dark:text-white sm:text-3xl smooth transition duration-200"
          >
           team@techoptimum.org
          </a>
          <ul className="mt-8 space-y-1 text-sm text-gray-700 dark:text-gray-200">
            <li>Time Machine Hacks is hosted by the Tech Optimum organizing team.</li>
            <li>Fiscally Sponsored by <span href="https://techoptimum.org" className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text font-medium text-transparent">Tech Optimum</span>.</li>
          </ul>
          <ul className="mt-8 flex gap-6 justify-center">
         
            <li>
              <a
                href="https://www.facebook.com/yourhackathonpage"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
              >
   
              </a>
            </li>
           
          </ul>
        </div>
      </footer>
    </>
  );
}
