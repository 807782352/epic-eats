import { Box, Container, Typography, useTheme } from "@mui/material";
import NoodleImg from "/images/noodles-title.png";
import PorkImg from "/images/pork-title.png";
import SeafoodImg from "/images/seafood-title.png";
import VegetableImg from "/images/vegetable-title.png";
import BeefImg from "/images/beef-title.png";
import ChickenDuckImg from "/images/chicken-duck-title.png";
import { tokens } from "../../../utils/theme";
import { Link } from "react-router-dom";

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const categories = [
    [NoodleImg, 1],
    [PorkImg, 2],
    [BeefImg, 3],
    [ChickenDuckImg, 4],
    [SeafoodImg, 5],
    [VegetableImg, 7],
  ]

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h2"
        mt={10}
        sx={{
          fontSize: "3rem",
        }}
      >
        Menu
      </Typography>
      <Typography
        variant="h3"
        mt={3}
        sx={{
          color: colors.grey[800],
          marginBottom: { xs: 3, md: 10 },
        }}
      >
        Discover the taste of tradition and the flavor of innovation in our
        dishes.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, 
          gridTemplateRows: { xs: "repeat(6, 1fr)" }, 
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          paddingX: { xs: "5%", md: "10%" },
          height: "auto",
          paddingBottom: 10,
        }}
      >
        {categories.map(([categoryImg, categoryId], index) => (
          <Box
            key={categoryId}
            component={Link}
            to={`/menu/categoryId/${categoryId}`}
            sx={{
              backgroundImage: `url(${categoryImg})`,
              backgroundSize: "101%",
              backgroundPosition: "center",
              width: { xs: "55%", md: "80%" }, 
              height: { xs: "110px", md: "150px", lg: "220px" },
              gridColumn: { md: (index % 2) + 1 }, 
              gridRow: { md: index + 1 }, 
              transform: {
                xs: index % 2 === 0 ? "translateX(-10%)" : "translateX(10%)",
                md: index % 2 === 0 ? "translateX(30%)" : "translateX(-30%)", 
              },
              transition: "transform 0.3s",
              padding: 10,
              margin: "auto", 
            }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Category;
