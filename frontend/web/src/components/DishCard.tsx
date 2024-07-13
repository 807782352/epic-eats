import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { tokens } from "../utils/theme";
import { useCart } from "../context/CartContext";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DishCard({ dish }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [expanded, setExpanded] = React.useState(false);
  const { state, dispatch } = useCart(); 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const items = state.items || [];
  const isInCart = items.some((item) => item.id === dish.id);
  const cartItem = items.find((item) => item.id === dish.id);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id: dish.id, name: dish.name, price: dish.price },
    });
  };

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_ITEM", payload: { id: dish.id } });
  };

  const handleIncreaseQuantity = () => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id: dish.id } });
  };

  const handleDecreaseQuantity = () => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id: dish.id } });
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          title={dish.name}
          sx={{
            padding: 1,
            maxWidth: "70%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: "1.25rem",
          }}
        >
          {dish.name}
        </Typography>
        <Avatar
          sx={{ bgcolor: colors.primary[500], color: colors.grey[900] }}
          aria-label="price"
        >
          ${dish.price}
        </Avatar>
      </Box>
      <Box
        sx={{
          width: "400px",
          height: "250px",
          backgroundImage: `url(${dish.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {dish.brief}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {isInCart ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={handleDecreaseQuantity}
              sx={{
                minWidth: "30px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                padding: 0,
                mr: 1,
                backgroundColor: colors.greenAccent[500],
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: colors.primary[100],
                }}
              >
                -
              </Typography>
            </Button>
            <Typography
              variant="h4"
              sx={{
                margin: "0 8px",
                color: colors.primary[500],
                fontWeight: "bold",
              }}
            >
              {cartItem.quantity}
            </Typography>
            <Button
              variant="contained"
              onClick={handleIncreaseQuantity}
              sx={{
                minWidth: "30px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                padding: 0,
                ml: 1,
                backgroundColor: colors.primary[400],
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: colors.primary[900],
                }}
              >
                +
              </Typography>
            </Button>
          </Box>
        ) : (
          <IconButton aria-label="add to cart" onClick={handleAddToCart}>
            <AddShoppingCartIcon />
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="h3"
            sx={{
              p: 1,
              color: colors.grey[900],
            }}
          >
            Description:
          </Typography>
          <Typography
            variant="h4"
            sx={{
              p: 1,
              color: colors.grey[700],
            }}
          >
            {dish.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
