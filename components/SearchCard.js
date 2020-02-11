import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/**
 * Refer to https://material-ui.com/components/cards/
 */

class SearchCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<Card style={{ minWidth: 275 }}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{this.props.name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{this.props.intro}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" color="primary">Select</Button>
				</CardActions>
			</Card>
		)
	}
}

export default SearchCard;