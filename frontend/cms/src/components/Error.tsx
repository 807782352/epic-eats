import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../utils/theme";

const Error = ({ errorMsg, sxProps = null }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={sxProps}>
      <Typography
        variant="h2"
        color={colors.redAccent[400]}
        fontWeight={"bold"}
      >
        Error: {errorMsg}
      </Typography>
    </Box>
  );
};

export default Error;
