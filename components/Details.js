import React from 'react';
import Spinner from "../components/Spinner";
import {
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	withStyles,
	Paper,
	TextField,
	Button
} from '@material-ui/core';
import CustomAlert from './CustomAlert';

const styles = {
	location: {
		marginBottom: "20px"
	},
	content: {
		marginTop: "20px",
		flexGrow: 1,
		width: "100%"
	},
	paper: {
		textAlign: "center",
		padding: "10px",
		marginBottom: "20px"
	},
	filler: {
		textAlign: "center",
		padding: "150px",
		marginBottom: "20px"
	},
	comment: {
		padding: "10px",
		marginBottom: "15px"
	}
};

/**
 * Used to show the details relating to a given location
 */

class Details extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: "",
			comment: "",
			commentAdded: false,
			showSpinner: true,
			commentLengthError: false,
			error: false
		};

		this.handleTextFieldOnChange = this.handleTextFieldOnChange.bind(this);
		this.handlePostButtonOnClick = this.handlePostButtonOnClick.bind(this);
	}

	/**
	 * Sends a GET request to /api/location/:id
	 */
	async fetchLocationDetails() {
		try {
			const resp = await fetch(`/api/location/${this.props.id}`);

			// Check resp status
			if (resp.status === 200) {
				const data = await resp.json();

				// Get the average min and max temperature based on the current month
				if ("climate" in data && data.climate !== null) {

					// Get the current month 
					const month = new Date().getMonth();
					const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

					data.temp = {
						month: names[month],
						average_max: data.climate.temperature.average_max.months[month],
						average_min: data.climate.temperature.average_min.months[month]
					}

					// Convert C to F
					data.temp.average_max = data.temp.average_max * 9 / 5 + 32;
					data.temp.average_min = data.temp.average_min * 9 / 5 + 32;
				}

				this.setState({
					showSpinner: false,
					data: data
				});
			}

			if (resp.status === 500) throw new Error();
		} catch (e) {
			this.setState({
				error: true
			});
		}
	}

	/**
	 * Sends a POST request to /api/location/comment
	 */
	async addCommentForLocation() {
		try {
			// Prepare the data
			const data = {
				id: this.state.data._id,
				comment: this.state.comment
			}

			const resp = await fetch("/api/location/comment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			// Check the status of the response 
			if (resp.status === 200) {
				const modified = await resp.json();

				if (modified === 1) {
					this.setState({
						showSpinner: true,
						commentAdded: true,
						comment: ""
					});

					this.fetchLocationDetails();
				}
			}

			if (resp.status === 500) throw new Error();
		} catch (e) {
			this.setState({
				error: true
			});
		}
	}

	/**
	 * Handles the text field on change
	 * 
	 * @param {*} e 
	 */
	handleTextFieldOnChange(e) {
		this.setState({
			comment: e.target.value,
			commentAdded: false,
			commentLengthError: false
		});
	}

	/**
	 * Handles the post button on click
	 */
	handlePostButtonOnClick() {
		if (this.state.comment.length >= 50) {
			this.addCommentForLocation();
		}
		else {
			this.setState({
				commentLengthError: true
			});
		}
	}

	componentDidMount() {
		this.fetchLocationDetails();
	}

	render() {
		// Get the styles from makeStyles hook	
		const classes = this.props.classes;

		// Check if the spinner is to be shown
		if (this.state.showSpinner) return <Spinner />;

		// Check if an error is thrown
		if (this.state.error) return <CustomAlert severity="error" title="An error has occurred!" message="There was an error processing your request. Please try again later." />;

		// Check that data state is ready or if a comment has been added
		if (this.state.data !== "" || this.state.commentAdded || this.state.commentLengthError) {
			const details = this.state.data;

			// Comments layout
			let comments = (
				<Paper className={classes.filler}>
					<Typography variant="body1" color="textSecondary">
						No comments
					</Typography>
				</Paper>
			);

			// Show the comments for this location if any is apparent
			if (details.comments.length > 0) {
				comments = [];

				// Create a card for each of the comments
				for (const c of details.comments) {
					comments.push(
						<Paper className={classes.comment}>
							<Typography variant="caption" color="textSecondary">
								{c}
							</Typography>
						</Paper>
					)
				}
			}

			return (
				<Grid container direction="row" alignItems="center" justify="center" className={classes.content}>
					<Grid item lg={5}>
						<Card className={classes.location}>
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
								<Typography gutterBottom variant="caption" color="textSecondary">
									Longitude: {details.loc.coordinates[0].toFixed(3)} | Latitude: {details.loc.coordinates[1].toFixed(3)}
								</Typography>
								<br />
								<Typography gutterBottom variant="caption" color="textSecondary">
									{details.climate !== null ? `Temp for ${details.temp.month} - Avg Max: ${details.temp.average_max.toFixed(2)} \u2109, Avg Min: ${details.temp.average_min.toFixed(2)} \u2109` : ""}
								</Typography>

							</CardContent>
						</Card>
						{this.state.commentLengthError ? <CustomAlert severity="warning" title="Comment length" message="Please input a comment that is more than 50 characters!" /> : <span></span>}
						<Paper className={classes.paper}>
							<TextField label="Been here? Leave a Comment" margin="dense" fullWidth onChange={this.handleTextFieldOnChange} value={this.state.comment} />
							<Button variant="contained" color="primary" variant="outlined" onClick={this.handlePostButtonOnClick}>
								Post
								</Button>
						</Paper>
						{comments}
					</Grid>
				</Grid>
			);
		}
	}
}

export default withStyles(styles)(Details);