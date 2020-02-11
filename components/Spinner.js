import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Refer to https://material-ui.com/components/backdrop/
 */

const Spinner = () => {
    return (
        <div>
            <CircularProgress color="inherit" />
        </div>
    )
}

export default Spinner;