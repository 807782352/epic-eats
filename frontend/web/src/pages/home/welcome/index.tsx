import {
  Box,
  Button,
  colors,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { Parallax } from "react-scroll-parallax";
import noodles from "/images/noodles.png";
import noodlesFg from "/images/noodlesFg.png";
import chopsticks1 from "/images/chopsticks1.png";
import chopsticks2 from "/images/chopsticks2.png";
import { tokens } from "../../../utils/theme";

const Welcome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: {
            xs: "flex",
            md: "grid",
          },
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 2,
          flexDirection: "column",
        }}
      >
        {/* Left Side  */}
        <Box
          gridColumn="2/6"
          sx={{
            width: "100%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Parallax speed={-10}>
            <Box
              component="img"
              src={noodles}
              sx={{
                width: "400px",
                height: "auto",
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translate(-55%, 120%)",
              }}
            />
          </Parallax>
          <Parallax speed={-100}>
            <Box
              component="img"
              src={chopsticks2}
              sx={{
                width: "360px",
                height: "auto",
                position: "absolute",
                top: -280,
                left: "50%",
                transform: "translateX(-10%)",
              }}
            />
          </Parallax>
          <Parallax speed={-100}>
            <Typography
              variant="h1"
              noWrap
              fontWeight={"bold"}
              fontSize={60}
              sx={{
                position: "absolute",
                top: -220,
                left: "50%",
                transform: "translateX(-60%)",
                color: "white",
                transition: "opacity 0.5s",
                padding: 1,
              }}
            >
              Lai Xiang Hui
            </Typography>
          </Parallax>
          <Parallax speed={-100}>
            <Box
              component="img"
              src={chopsticks1}
              sx={{
                width: "360px",
                height: "auto",
                position: "absolute",
                top: -280,
                left: "50%",
                transform: "translateX(-10%)",
              }}
            />
          </Parallax>

          <Parallax speed={-10}>
            <Box
              component="img"
              src={noodlesFg}
              sx={{
                width: "400px",
                height: "auto",
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translate(-55%, 120%)",
              }}
            />
          </Parallax>
        </Box>

        {/* Right Side  */}
        <Box
          gridColumn="8/12"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            gap: 3,
            marginY: {
              xs: 10,
              md: 0,
            },
            paddingX: {
              xs: 10,
              md: 0,
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: "1.5rem", // for small screens
                sm: "2rem", // for medium screens
                md: "2.5rem", // for large screens
                lg: "3rem", // for extra large screens
              },
            }}
          >
            Welcome to Lai Xiang Hui!
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: colors.grey[800],
              fontSize: {
                xs: "1.25rem", // for small screens
                sm: "1.5rem", // for medium screens
                md: "1.75rem", // for large screens
                lg: "2rem", // for extra large screens
              },
            }}
          >
            Discover the rich flavors and vibrant traditions of Chinese Hunan
            cuisine, with a special focus on noodle dishes.
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: colors.grey[800],
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
                md: "1.5rem",
                lg: "1.75rem",
              },
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            Whether you're a lifelong fan or new to Chinese food, our site
            offers a delectable array of recipes, stunning food photography, and
            expert tips to elevate your culinary skills.
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: colors.grey[800],
              display: {
                xs: "none",
                md: "block",
              },
              fontSize: {
                xs: "1rem",
                sm: "1.25rem",
                md: "1.5rem",
                lg: "1.75rem",
              },
            }}
          >
            Join us on this delicious journey, explore authentic tastes, and
            let's make every meal an epic feast!
          </Typography>

          <Box display="flex" gap={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.primary[400],
              }}
            >
              See Our Menu
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.primary[400],
              }}
            >
              Order Online
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Welcome;
