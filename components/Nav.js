import React from 'react';
import Router from "next/router";
import {
	AppBar,
	Toolbar,
	Typography
} from '@material-ui/core';

/**
 * Navbar
 * 
 * Refer to https://material-ui.com/components/app-bar/
 */

const Nav = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" onClick={() => { Router.push("/") }}>
					Triposo Lookup
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Nav;