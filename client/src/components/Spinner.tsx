import { Box, CircularProgress } from "@mui/material";

export default function Spinner() {
  return (
    <Box
      display="grid"
      justifyContent="center"
      height="90%"
      width="100%"
      alignItems="center"
    >
      <CircularProgress size={80} />
    </Box>
  );
}
