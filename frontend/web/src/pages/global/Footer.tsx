import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../utils/theme";

export default function Footer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ backgroundColor: colors.grey[100], py: 4 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" color={colors.grey[900]} gutterBottom>
            Lai Xiang Hui
          </Typography>
          <Typography variant="h5" color={colors.grey[900]} gutterBottom>
            &copy; {new Date().getFullYear()}; Created By Ziyi Xu with ❤️.
          </Typography>
          <Typography variant="h5" mt={1} color={colors.grey[900]} gutterBottom>
            Note: Some images are sourced from the internet. If there is any
            infringement, please let us know!
          </Typography>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            <Grid item>
              <Typography variant="h6" color={colors.grey[900]}>
                📞 +1-647-865-9619
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color={colors.grey[900]}>
                📧 kyrie807782352@gmail.com
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 5 }}>
            <IconButton
              component={Link}
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook sx={{ color: colors.grey[900] }} />
            </IconButton>
            <IconButton
              component={Link}
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter sx={{ color: colors.grey[900] }} />
            </IconButton>
            <IconButton
              component={Link}
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram sx={{ color: colors.grey[900] }} />
            </IconButton>
            <IconButton
              component={Link}
              href="https://www.linkedin.com/in/ziyi-xu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn sx={{ color: colors.grey[900] }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
