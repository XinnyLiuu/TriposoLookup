import React from 'react';
import Search from './Search';
import {
	Grid
} from "@material-ui/core";
import { geolocated } from "react-geolocated";
import Spinner from './Spinner';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: ""
		}
	}

	render() {		
		if (this.props.coords !== undefined || this.props.coords !== null) {
			return (
				<Grid container direction="column" alignItems="center" justify="center">
					<Grid item>
						<Search location={this.props.coords} />
					</Grid>
				</Grid>
			);
		}

		return <Spinner />;
	}
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true,
	}
})(Home);