import React from 'react';
import SearchCard from "./SearchCard";
import {
	Alert,
	AlertTitle
} from '@material-ui/lab';
import {
	Button,
	Grid,
	TextField
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
			showSpinner: false,
			noResults: false
		}

		// Bind, "this" for handle methods
		this.handleSearchButtonOnClick = this.handleSearchButtonOnClick.bind(this);
		this.handleTextFieldOnChange = this.handleTextFieldOnChange.bind(this);
		this.handleLocationButtonOnClick = this.handleLocationButtonOnClick.bind(this);
	}

	/**
	 * Calls a GET request to /api/location/match
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

			if (data.length > 0) {
				this.setState({
					searchResults: data,
					showSpinner: false
				})
			}

			this.setState({
				noResults: true,
				showSpinner: false
			})
		} catch (e) {
			// TODO: Error handling
			console.log(e);
		}
	}

	/**
	 * Calls a GET request to /api/location/nearby
	 */
	async fetchNearbyData(coords) {
		try {
			const resp = await fetch("/api/location/nearby", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(coords)
			});

			// Get data
			const data = await resp.json();

			if (data.length > 0) {
				this.setState({
					searchResults: data,
					showSpinner: false
				})
			}

			this.setState({
				noResults: true,
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
		if (this.state.searchValue !== "" || localStorage.getItem("searchValue") !== "") {
			this.setState({
				showSpinner: true, // Show the spinner
				searchResults: "", // Get rid of any prior stored results data
				noResults: false,
			});

			localStorage.setItem("searchValue", this.state.searchValue);

			// Get data
			this.fetchMatchingData(this.state.searchValue)
		}
	}

	/**
	 * Handles the location button on click
	 */
	handleLocationButtonOnClick() {
		if (this.props.location !== undefined || this.props.location !== null) {
			// Get the coordinates of the user
			const location = this.props.location;

			const lat = location.latitude;
			const long = location.longitude;

			const coords = {
				lat: lat,
				long: long
			};

			this.setState({
				showSpinner: true,
				searchValue: ""
			});

			localStorage.setItem("searchValue", "");

			// Get data nearby the specified location
			this.fetchNearbyData(coords);
		}
	}

	/**
	 * Handles the text field on change
	 */
	handleTextFieldOnChange(e) {
		this.setState({
			searchValue: e.target.value,
			searchResults: "",
			noResults: false
		});

		localStorage.setItem("searchValue", e.target.value);
	}

	componentDidMount() {
		// Check if a search value has been queried before
		if (localStorage.getItem("searchValue") !== "") {
			this.setState({
				showSpinner: true,
				searchValue: localStorage.getItem("searchValue")
			}, () => {
				this.fetchMatchingData(this.state.searchValue);
			})
		}
	}

	render() {
		// Build the search form
		const searchForm = (
			<Grid container direction="row" justify="center" alignItems="center">
				<Grid item style={{ width: 300, marginRight: 10 }}>
					<TextField label="Search a String (US Locations)" margin="normal" fullWidth type="search" value={this.state.searchValue} variant="outlined" onChange={this.handleTextFieldOnChange} />
				</Grid>
				<Grid item>
					<Button variant="contained" color="primary" onClick={this.handleSearchButtonOnClick} style={{ marginRight: "5px" }}>
						Search
					</Button>
					<Button variant="outlined" color="primary" onClick={this.handleLocationButtonOnClick}>
						Locate
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
						<Grid container spacing={3} style={{ width: "unset", margin: "unset" }}>
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

		// Check if no results are found
		if (this.state.noResults) {
			return (
				<React.Fragment>
					{searchForm}
					<Alert severity="warning">
						<AlertTitle>No Results!</AlertTitle>
						No locations have been found matching your search.
					</Alert>
				</React.Fragment>
			)
		}

		return searchForm;
	}
}

export default Search;