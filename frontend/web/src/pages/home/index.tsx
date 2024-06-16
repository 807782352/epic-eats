import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import RipPaper from "../../components/RipPaper";
import { tokens } from "../../utils/theme";
import RipPaperWrapper from "../../components/RipPaperWrapper";

const Section = styled(Box)(({ theme }) => {
  const colors = tokens(theme.palette.mode);
  return {
    minHeight: "80vh",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",

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
    <div>
      <Section>
        <Box>Section 1</Box>
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
    </div>
  );
}

export default Home;
