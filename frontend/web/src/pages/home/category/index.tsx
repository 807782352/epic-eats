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
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // 两列布局
          gridTemplateRows: { xs: "repeat(6, 1fr)" }, // 6行
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          paddingX: { xs: "5%", md: "10%" },
          height: "auto",
          paddingBottom: 10,
        }}
      >
        {[
          NoodleImg,
          PorkImg,
          BeefImg,
          ChickenDuckImg,
          SeafoodImg,
          VegetableImg,
        ].map((img, index) => (
          <Box
            key={img}
            component={Link}
            to="/dish"
            sx={{
              backgroundImage: `url(${img})`,
              backgroundSize: "101%",
              backgroundPosition: "center",
              width: { xs: "55%", md: "80%" }, // 缩小宽度至原来的80%
              height: { xs: "110px", md: "150px", lg: "220px" },
              gridColumn: { md: (index % 2) + 1 }, // 交替放置在第1列和第2列
              gridRow: { md: index + 1 }, // 根据索引计算行
              transform: {
                xs: index % 2 === 0 ? "translateX(-10%)" : "translateX(10%)",
                md: index % 2 === 0 ? "translateX(30%)" : "translateX(-30%)", // 偶数左移10%，奇数右移10%
              },
              transition: "transform 0.3s", // 添加平滑过渡效果
              padding: 10,
              margin: "auto", // 添加自动外边距以保持居中
            }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Category;
