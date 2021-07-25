import { createTheme } from '@material-ui/core/styles';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: '#ffffff',
    },
    primary: {
      contrastText: '#ffffff',
      main: '#5664d2'
    },
  },
  shadows,
  typography
});

export default theme;
