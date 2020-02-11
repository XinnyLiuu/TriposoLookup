import Nav from "../components/Nav";
import Home from "../components/Home";

/**
 * Refer to https://nextjs.org/docs/basic-features/pages
 * 
 * This file is routed to /
 * 
 * Renders the Home view
 */

const Index = () => {
	return (
		<React.Fragment>
			<Nav />
			<Home />
		</React.Fragment>
	);
}

export default Index;