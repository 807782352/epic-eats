import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../utils/theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Typography variant="h2" color={colors.primary[800]}>
        {title}
      </Typography>
      <Typography variant="h4" color={colors.grey[900]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
