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

    /**
     * Gets the details for the specified location given the id passed in props
     */
    async fetchDetails() {
        // Check if id is in
        if (this.props.id !== undefined || this.props.id !== null) {
            const id = this.props.id;

            try {
                // Get location data
                const resp = await fetch(`/api/location/${id}`);
                const details = await resp.json();

                this.setState({
                    data: JSON.stringify(details)
                })
            } catch (e) {
                // TODO: Error handling
                console.log(e);
            }
        }
    }

    componentDidMount() {
        this.fetchDetails();
    }

    render() {
        // Chek if data has been loaded into state
        if (this.state.data !== "") {
            const details = this.state.data;

            return <p>{details}</p>;
        }

        return <Spinner />;
    }
}

export default Details;