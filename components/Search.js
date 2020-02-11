import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

/**
 * Refer to https://material-ui.com/components/autocomplete/
 */

class Search extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ width: 300 }}>
				<Autocomplete
					disableClearable
					options={this.props.data.map(d => d.name)}
					renderInput={params => (
						<TextField
							{...params}
							label="Search a String"
							margin="normal"
							variant="outlined"
							fullWidth
							InputProps={{ ...params.InputProps, type: 'search' }}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Search;