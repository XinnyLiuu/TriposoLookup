import Home from "../components/Home";
import Layout from "../components/Layout";

/**
 * Refer to https://nextjs.org/docs/basic-features/pages
 * 
 * This file is routed to /
 * 
 * Renders the Home view
 */

const Index = () => {
	return (
		<Layout component={<Home />} />
	);
}

export default Index;