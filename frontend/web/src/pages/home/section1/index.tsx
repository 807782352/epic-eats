import { Box, Grid, Typography } from "@mui/material";
import { Parallax } from "react-scroll-parallax";
import noodles from "/images/noodles.png";
import noodlesFg from "/images/noodlesFg.png";
import chopsticks1 from "/images/chopsticks1.png";
import chopsticks2 from "/images/chopsticks2.png";

const Section1 = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginTop: 55,
        }}
      >
        <Parallax speed={-10}>
          <Box
            component="img"
            src={noodles}
            sx={{
              width: "450px",
              height: "auto",
              position: "absolute",
            }}
          />
        </Parallax>
        <Parallax speed={-250}>
          <Box
            component="img"
            src={chopsticks2}
            sx={{
              width: "360px",
              height: "auto",
              position: "absolute",

              transform: "translate(60%, -305%)",
            }}
          />
        </Parallax>
        <Parallax speed={-250}>
          <Typography
            variant="h1"
            fontFamily={"Caveat"}
            noWrap
            fontWeight={"bold"}
            fontSize={60}
            sx={{
              position: "absolute",
              transform: "translate(60%, -360%)",
              color: "white",
              transition: "opacity 0.5s",
              padding: 1,
            }}
          >
            Epic Eats
          </Typography>
        </Parallax>
        <Parallax speed={-250}>
          <Box
            component="img"
            src={chopsticks1}
            sx={{
              width: "360px",
              height: "auto",
              position: "absolute",
              transform: "translate(60%, -300%)",
            }}
          />
        </Parallax>

        <Parallax speed={-10}>
          <Box
            component="img"
            src={noodlesFg}
            sx={{
              width: "450px",
              height: "auto",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Parallax>
      </Grid>
    </Grid>
  );
};

export default Section1;
