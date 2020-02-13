import React from 'react';
import Nav from './Nav';

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
            <React.Fragment>
                <Nav />
                {this.props.component}
            </React.Fragment>
        )
    }
}

export default Layout;