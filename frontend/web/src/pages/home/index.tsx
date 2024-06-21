import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { tokens } from "../../utils/theme";
import RipPaperWrapper from "../../components/RipPaperWrapper";
import { ParallaxProvider } from "react-scroll-parallax";
import Welcome from "./welcome";
import AboutUs from "./aboutus";
import Category from "./category";
import ContactUs from "./contactus";

const Section = styled(Box)(({ theme }) => {
  const colors = tokens(theme.palette.mode);
  return {
    minHeight: "90vh",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    backgroundColor: theme.palette.background.default,

    "&:nth-of-type(odd)": {
      backgroundColor: colors.primary[300],
    },
    "&:nth-of-type(even)": {
      backgroundColor: colors.grey[700],
      border: "none",
    },
    "& svg": {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "auto",
    },
  };
});

function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mt={10}>
      <ParallaxProvider>
        <Section>
          <Welcome />
          <RipPaperWrapper fillColor={colors.grey[700]} />
        </Section>

        <Section>
          <AboutUs />
          <RipPaperWrapper fillColor={colors.primary[300]} />
        </Section>
        <Section>
          <Category />
          <RipPaperWrapper fillColor={colors.grey[700]} />
        </Section>
        <Section>
          <ContactUs />
          <RipPaperWrapper fillColor={colors.primary[300]} />
        </Section>
      </ParallaxProvider>
    </Box>
  );
}

export default Home;
