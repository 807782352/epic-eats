import { Box, Container, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../utils/theme";
import Restaurant from "/images/restaurant.jpg";
import RippedPaper from "/images/ripped-paper.png";

const AboutUs = () => {
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
          flexDirection: {
            xs: "column",
            md: "none",
          },
          gap: 2,
          width: "100%",
          height: {
            xs: "90vh",
            md: "auto"
          },
        }}
      >
        {/* Left side  */}
        <Box
          sx={{
            display: "flex",
            gridColumn: {
              md: "2/6",
            },
            marginTop: 10,
            flexDirection: "column",
            gap: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: colors.grey[100],
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: colors.grey[300],
              fontSize: {
                md: "1.25rem",
                lg: "1.5rem",
                xl: "1.6rem",
              },
            }}
          >
            Lai Xiang Hui is a proud purveyor of authentic Hunan cuisine, rooted
            in tradition and enriched by over a decade of culinary excellence.
            Our story began more than ten years ago as a small Hunan beef noodle
            restaurant, dedicated to bringing the genuine flavors of Hunan to
            our community.
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: colors.grey[300],
              fontSize: {
                md: "1.25rem",
                lg: "1.5rem",
                xl: "1.6rem",
              },
            }}
          >
            From our humble beginnings, we have grown and evolved, constantly
            innovating to expand our menu. Today, we offer an extensive array of
            stir-fried dishes and other Hunan specialties, each crafted with the
            same commitment to quality and authenticity that defined our early
            days.
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: colors.grey[300],
              fontSize: {
                md: "1.25rem",
                lg: "1.5rem",
                xl: "1.6rem",
              },
            }}
          >
            Our restaurant is a place where tradition meets innovation, where
            classic recipes are honored and new culinary creations are embraced.
            We are passionate about delivering a dining experience that captures
            the essence of Hunan's bold and vibrant flavors.
          </Typography>
        </Box>

        {/* right side */}
        <Box
          sx={{
            gridColumn: {
              md: "7/12",
            },
            marginTop: { xs: 0, md: 10 },
            gap: 3,
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: { xs: "60%", md: "110%", lg: "110%", xl: "110%" },
              height: { xs: "65%", md: "55%", lg: "60%", xl: "70%" },
              backgroundImage: `url(${Restaurant})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.85)",
              transform: "translate(-50%, -60%)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: { xs: "70%", md: "111%", lg: "120%", xl: "130%" },
              height: { xs: "80%", md: "60%", lg: "70%", xl: "90%" },
              backgroundImage: `url(${RippedPaper})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: colors.grey[700],
              mixBlendMode: "lighten",
              transform: "translate(-50%, -60%)",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
