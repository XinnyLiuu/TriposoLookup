import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Grid
} from "@material-ui/core";

/**
 * Refer to https://material-ui.com/components/backdrop/
 */

const Spinner = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid>
                <CircularProgress size={80} color="inherit" />
            </Grid>
        </Grid>
    )
}

export default Spinner;