import Nav from "../components/Nav";
import Home from "../components/Home";
import {
	ThemeProvider
} from '@material-ui/core/styles';
import Theme from "../components/Theme";

/**
 * Refer to https://nextjs.org/docs/basic-features/pages
 * 
 * This file is routed to /
 * 
 * Renders the Home view
 */

const Index = () => {
	return (
		<ThemeProvider theme={Theme}>
			<Nav />
			<Home />
		</ThemeProvider>
	);
}

export default Index;