import React from 'react';
import SearchCard from "./SearchCard";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
	Button, Grid
} from "@material-ui/core";
import Spinner from './Spinner';

/**
 * Refer to https://material-ui.com/components/autocomplete/
 */

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchValue: "",
			searchResults: "",
			showSpinner: false
		}

		// Bind, "this" for handle methods
		this.handleSearchButtonOnClick = this.handleSearchButtonOnClick.bind(this);
		this.handleTextFieldOnChange = this.handleTextFieldOnChange.bind(this);
	}

	/**
	 * Calls a GET request to /api/match
	 */
	async fetchMatchingData(value) {
		try {
			const resp = await fetch("/api/location/match", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(value)
			});

			// Get data
			const data = await resp.json();

			// Set the state 
			this.setState({
				searchResults: data,
				showSpinner: false
			})
		} catch (e) {
			// TODO: Error handling
			console.log(e);
		}
	}

	/**
	 * Handles the search button on click
	 */
	handleSearchButtonOnClick() {
		// Get the value and query the database for any documents that has it. ie.) “Foo”, should find “Food” or “Work” should find “Working”, but not “rework”
		if (this.state.searchValue !== "") {
			this.setState({
				showSpinner: true, // Show the spinner
				searchResults: "" // Get rid of any prior stored results data
			});

			this.fetchMatchingData(this.state.searchValue)
		}
	}

	/**
	 * Handles the text field on change
	 */
	handleTextFieldOnChange(e) {
		this.setState({
			searchValue: e.target.value,
			searchResults: "" // TODO: Play with this. The react component becomes slower once data in state exceeds a big amounts
		})
	}

	render() {
		// Build the search form
		const searchForm = (
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Grid
					item
					style={{ width: 300, marginRight: 10 }}
				>
					<Autocomplete
						freeSolo
						disableClearable
						options={this.props.data.map(d => d.name)}
						renderInput={params => (
							<TextField
								{...params}
								label="Search a String (US Locations)"
								margin="normal"
								variant="outlined"
								fullWidth
								InputProps={{ ...params.InputProps, type: 'search' }}
								onChange={this.handleTextFieldOnChange}
							/>
						)}
					/>
				</Grid>
				<Grid item>
					<Button variant="outlined" color="primary" onClick={this.handleSearchButtonOnClick}>
						Search
				</Button>
				</Grid>
			</Grid>
		);

		// Check if there are search results 
		if (this.state.searchResults !== "") {
			// Iterate through each search result and build the grid of search cards
			const results = this.state.searchResults;
			results.sort((a, b) => a.name.localeCompare(b.name));
			const cards = [];

			results.forEach(r => {
				cards.push(
					<Grid item xs={4}>
						<SearchCard name={r.name} intro={r.intro} id={r._id} state={r.part_of[0]} />
					</Grid>
				)
			});

			return (
				<React.Fragment>
					{searchForm}
					<div style={{ flexGrow: 1 }}>
						<Grid
							container
							spacing={3}
							style={{
								width: "unset",
								margin: "unset"
							}}
						>
							{cards}
						</Grid>
					</div>
				</React.Fragment>
			)
		}

		// Check if spinner is toggled
		if (this.state.showSpinner) {
			return (
				<React.Fragment>
					{searchForm}
					<Spinner />
				</React.Fragment>
			)
		}

		return searchForm;
	}
}

export default Search;