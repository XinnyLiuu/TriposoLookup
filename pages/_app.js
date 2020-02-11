/**
 * Refer to https://nextjs.org/docs/basic-features/built-in-css-support
 * 
 * Global CSS are to be imported here
 */
import "../public/styles.css";
import "../public/roboto.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />
  }