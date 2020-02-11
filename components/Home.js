import React from 'react';
import Spinner from "./Spinner";
import Search from './Search';
import {
    Grid
} from "@material-ui/core";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: ""
        }
    }

    /**
     * Calls a GET request to /api/locations
     */
    async fetchData() {
        try {
            // Get the data from /api/locations
            const resp = await fetch("/api/locations");
            const json = await resp.json();

            // Set the data to state
            this.setState({
                data: json
            })
        } catch (e) {
            // TODO: Error handling
            alert(e);
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        // Check that the data in state is ready, if so - load the results onto the page
        if (this.state.data !== "") {
            console.log(`Found ${this.state.data.length} records`);

            // Sort the list alphabetically by name
            this.state.data.sort((a, b) => a.name.localeCompare(b.name));

            return (
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item>
                        <Search data={this.state.data} />
                    </Grid>
                </Grid>
            );
        }

        // Otherwise, by default
        return <Spinner />;
    }
}

export default Home;