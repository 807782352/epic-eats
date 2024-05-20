import { Box, useTheme } from "@mui/material";
import { PacmanLoader } from "react-spinners";
import { tokens } from "../utils/theme";

const Loading = ({sxProps = null}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={sxProps}>
      <PacmanLoader color={colors.primary[700]} />
    </Box>
  );
};

export default Loading;
