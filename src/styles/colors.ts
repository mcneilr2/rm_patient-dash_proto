import { yellow } from "@mui/material/colors";

export const colors = {
  background: {
    default: '#fefbf5',
    header: '#f4eae0',       
    paper: '#ffffff',           // table row white
    rowAlternate: '#f8f8f8',    // striped row color
    tableHeader: '#f1f1ef',
    input: '#f4f4f4'
  },
  white: '#ffffff',
  primary: '#f57c00',           // deep orange
  secondary: '#f5c242',         // soft yellow
  text: {
    primary: '#2d2d2d',
    secondary: '#5f5f5f',
    light: '#fffdfa',
  },
    shadow: {
    light: '0 1px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 3px 6px rgba(0, 0, 0, 0.15)',
  },
  border: {
    light: '#ddd',
    beige: '#e0d7c3',
  },
  grey: {
    100: '#faf8f4',
    200: '#f1f1ef',
    400: '#bdbdbd',
    700: '#5a5a5a',
    800: '#3a3a3a',
    select: '#e3f2fd'
  },
  gradient: {
    navbar: 'linear-gradient(90deg, #f57c00 0%, #f5c242 100%)',
  },

  badges: {
  yellow: yellow[500],          // MUI yellow
  orange: '#f57c00',            // deep orange
  green: '#4caf50',             // MUI green 
  red: '#f44336',               // MUI red
  blue: '#2196f3',              // MUI blue
  purple: '#9c27b0',            // MUI purple
  pink: '#e91e63',              // MUI pink
  cyan: '#00bcd4',              // MUI cyan
  teal: '#009688',              // MUI teal
  brown: '#795548',
  default: '#f1f1ef'}            // MUI brown
};
