import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Nav from './Nav';
import theme from "../utils/theme";

/**
 * Defines the default layout for the site
 */

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Nav />
                {this.props.component}
            </ThemeProvider>
        )
    }
}

export default Layout;