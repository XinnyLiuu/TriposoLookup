import React from 'react';
import Spinner from "../components/Spinner";

/**
 * Used to show the details relating to a given location
 */

class Details extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ""
        };
    }

    render() {
        // Check that data has been passed into props
        if (this.props.data !== undefined || this.props.data !== null) {
            const details = this.props.data;

            return <p>{details}</p>;
        }

        return <Spinner />;
    }
}

export default Details;