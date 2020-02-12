import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Router from "next/router";

/**
 * Refer to https://material-ui.com/components/cards/
 */

class SearchCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	/**
	 * Handles and redirects the View button
	 */
	handleViewOnClick(id) {
		// Redirect to location details page
		Router.push(`/location/${id}`);
	}

	render() {
		return (
			<Card style={{ minWidth: 275 }}>
				<CardContent>
					<Typography gutterBottom variant="h5">
						{this.props.name}
					</Typography>
					<Typography gutterBottom variant="subtitle2">
						{this.props.state}
					</Typography>
					<Typography variant="body1" color="textSecondary">
						{this.props.intro}
					</Typography>
				</CardContent>
				<CardActions>
					<Button color="primary" onClick={() => this.handleViewOnClick(this.props.id)}>View</Button>
				</CardActions>
			</Card>
		)
	}
}

export default SearchCard;