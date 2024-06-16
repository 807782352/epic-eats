import React from "react";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { tokens } from "../../utils/theme";
import RipPaperWrapper from "../../components/RipPaperWrapper";
import {  ParallaxProvider } from "react-scroll-parallax";
import Section1 from "./section1";

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
          <Section1 />

          <RipPaperWrapper fillColor={colors.grey[700]} />
        </Section>

        <Section>
          Section 2
          <RipPaperWrapper fillColor={colors.primary[300]} />
        </Section>
        <Section>
          Section 3
          <RipPaperWrapper fillColor={colors.grey[700]} />
        </Section>
        <Section>
          Section 4
          <RipPaperWrapper fillColor={colors.primary[300]} />
        </Section>
      </ParallaxProvider>
    </Box>
  );
}

export default Home;
