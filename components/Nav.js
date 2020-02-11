import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton
} from '@material-ui/core';
import {
	ThemeProvider
} from '@material-ui/core/styles';
import Theme from "./Theme";

/**
 * Navbar
 * 
 * Refer to https://material-ui.com/components/app-bar/
 */

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	}
}));

const Nav = () => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={Theme}>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Triposo Lookup
					</Typography>
					</Toolbar>
				</AppBar>
			</div>
		</ThemeProvider>
	);
}

export default Nav;