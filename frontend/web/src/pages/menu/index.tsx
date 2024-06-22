import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { getCategories } from "../../api/categoryApi";
import { getDishesByCategoryId } from "../../api/dishApi";
import { useEffect, useState } from "react";
import { tokens } from "../../utils/theme";
import { NavLink, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DishCard from "../../components/DishCard";

const MenuCategoryTag = ({ category }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <NavLink
      to={`/menu/categoryId/${category.id}`}
      style={{ textDecoration: "none" }}
    >
      {({ isActive }) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: isActive
              ? colors.primary[500]
              : colors.primary[200],
            "&:hover": {
              backgroundColor: isActive
                ? colors.primary[600]
                : colors.primary[400],
            },
          }}
        >
          <Typography>{category.name}</Typography>
        </Button>
      )}
    </NavLink>
  );
};

const Menu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { categoryId, dishId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);

  // fetch categories data
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await getCategories();
      const sortedCategories = res.data.sort((a, b) => a.id - b.id);
      setCategories(sortedCategories);
      console.log("Fetched Categories:", res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch dishes data by category
  const fetchDishesByCategory = async (categoryId) => {
    setIsLoading(true);
    try {
      const res = await getDishesByCategoryId(categoryId);
      const sortedDishes = res.data.sort((a, b) => a.id - b.id);
      setDishes(sortedDishes);
      console.log("Fetched Dishes:", res.data);
    } catch (err) {
      console.error("Error fetching dishes:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetchDishesByCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <Container maxWidth="xl">
      <Box>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {categories.length > 0 && (
          <Box
            mt={50}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            {categories.map((category) => (
              <MenuCategoryTag category={category} key={category.id} />
            ))}
          </Box>
        )}
        {dishes.length > 0 && (
          <Box
            mt={4}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            {dishes.map((dish) => (
              <DishCard dish={dish} key={dish.id} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Menu;
