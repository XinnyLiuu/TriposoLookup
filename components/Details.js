import React from 'react';
import Spinner from "../components/Spinner";
import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	withStyles
} from '@material-ui/core';

const styles = {
	content: {
		marginTop: "25px"
	}
};

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

	componentDidMount() {
		// Check that data has been passed into props
		if (this.props.data !== undefined || this.props.data !== null) {
			this.setState({
				data: this.props.data
			})
		}
	}

	render() {
		// Get the styles from makeStyles hook
		const classes = this.props.classes;

		// Check that data state is ready
		if (this.state.data !== "") {
			const details = JSON.parse(this.state.data);

			return (
				<Grid container direction="row" alignItems="center" justify="center" className={classes.content}>
					<Grid item md={3}>
						<Card>
							{details.image !== undefined ? <CardMedia component="img" height="50%" image={details.image} title={details.name}
							/> : <span></span>}
							<CardContent>
								<Typography gutterBottom variant="h3">
									{details.name}
								</Typography>
								<Typography gutterBottom variant="subtitle1">
									{details.part_of[0]}
								</Typography>
								<Typography gutterBottom variant="body1" color="textSecondary">
									{details.intro}
								</Typography>
								<Typography gutterBottom variant="subtitle2" color="textSecondary">
									Longitude: {details.loc.coordinates[0].toFixed(3)}, Latitude: {details.loc.coordinates[1].toFixed(3)} {
										details.climate !== null ? `,Temperature: ${details.climate.temperature.average_max.months[0]}` : ""
									}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			)
		}

		return <Spinner />;
	}
}

export default withStyles(styles)(Details);