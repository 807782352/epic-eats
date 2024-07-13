import React from "react";
import { useCart } from "../../context/CartContext";
import { addOrder } from "../../api/order";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from "@mui/material";
import { tokens } from "../../utils/theme";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderResponse<T> {
  code: number;
  errMsg: string;
  data: T;
}

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  console.log("state", state);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleRemoveItem = (item: { id: number }) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const handleConfirmOrder = async () => {
    try {
      const response: OrderResponse<any> = await addOrder({
        items: state.items || [],
      });
      console.log(response);
      if (response.code === 1) {
        dispatch({ type: "CLEAR_CART" });
        alert("Order confirmed successfully!");
      } else {
        alert(`Order confirmation failed: ${response.errMsg}`);
      }
    } catch (error) {
      console.error("Order confirmation failed", error);
      alert("Order confirmation failed, please try again.");
    }
  };

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id: item.id } });
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id: item.id } });
  };

  const items = state.items || [];

  return (
    <Box
      sx={{
        mt: 10,
        minHeight: "65vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Center content vertically
      }}
    >
      <Typography variant="h2" gutterBottom>
        Cart
      </Typography>
      {items.length === 0 ? (
        <Typography variant="h3">Your cart is empty!</Typography>
      ) : (
        <>
          <List sx={{ width: "100%", maxWidth: 800 }}>
            {items.map((item) => (
              <Card
                key={item.id}
                sx={{ mb: 2, backgroundColor: colors.primary[200] }}
              >
                <CardContent>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h4">{item.name}</Typography>
                      }
                      secondary={
                        <Typography variant="h6">${item.price}</Typography>
                      }
                    />
                    <CardActions sx={{ display: "flex", alignItems: "center" }}>
                      <Button
                        variant="contained"
                        onClick={() => handleDecreaseQuantity(item)}
                        sx={{
                          minWidth: "40px",
                          width: "40px",
                          height: "40px",
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
                        variant="body1"
                        sx={{
                          margin: "0 8px",
                          color: "primary.main",
                          fontWeight: "bold",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            color: colors.primary[700],
                          }}
                        >
                          {item.quantity}
                        </Typography>
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => handleIncreaseQuantity(item)}
                        sx={{
                          minWidth: "40px",
                          width: "40px",
                          height: "40px",
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
                      <Button
                        variant="contained"
                        onClick={() => handleRemoveItem(item)}
                        sx={{
                          ml: 2,
                          minWidth: "40px",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          padding: 0,
                          backgroundColor: colors.redAccent[500],
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.primary[900],
                          }}
                        >
                          x
                        </Typography>
                      </Button>
                    </CardActions>
                  </ListItem>
                </CardContent>
              </Card>
            ))}
          </List>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleClearCart}
              sx={{ mr: 2, backgroundColor: colors.primary[400] }}
            >
              Clear Cart
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmOrder}
              sx={{ backgroundColor: colors.primary[400] }}
            >
              Confirm Order
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
