import { createMuiTheme } from '@material-ui/core/styles';

/**
 * Creates the theme for the components inside
 * 
 * https://material-ui.com/customization/theming/#createmuitheme-options-args-theme
 */

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: "#64b5f6"
        }
    }
});

export default Theme;