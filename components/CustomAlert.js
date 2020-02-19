import React from 'react';
import {
	Alert,
	AlertTitle
} from "@material-ui/lab";

/**
 * Custom wrapper for https://material-ui.com/components/alert/
 */

class CustomAlert extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Alert severity={this.props.severity}>
				<AlertTitle>{this.props.title}</AlertTitle>
				{this.props.message}
			</Alert>
		)
	}
}

export default CustomAlert;