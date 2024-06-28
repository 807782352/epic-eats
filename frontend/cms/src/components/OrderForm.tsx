import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { tokens } from "../utils/theme";
import { toast } from "react-toastify";
import { capitalizeFormater } from "../utils/utils";
import { useEffect, useState } from "react";
import { getStaffs } from "../api/staff";
import {
    addOrder,
  getOrderById,
  getOrderItemsById,
  updateOrderStatusById,
} from "../api/order";

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => {
  const colors = tokens(theme.palette.mode);
  return {
    boxSizing: "border-box",
    width: "inherit",
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    padding: "8px 12px",
    borderRadius: "8px",
    color: colors.primary[1000],
    background: colors.primary[300],
    border: `1px solid ${colors.primary[300]}`,
    boxShadow: `0px 2px 2px ${colors.primary[300]}`,
    "&:hover": {
      borderColor: colors.primary[300],
    },
    "&:focus": {
      borderColor: colors.primary[300],
      boxShadow: `0 0 0 3px ${colors.primary[300]}`,
    },
    "&:focus-visible": {
      outline: 0,
    },
    "&::placeholder": {
      color: colors.primary[1000],
    },
  };
});

const validationSchema = yup.object({
  userId: yup.number().required("User is required"),
  orderItems: yup
    .array()
    .min(1, "At least one order item is required")
    .required("Order items are required"),
  status: yup.string().required("Status is required"),
  totalPrice: yup
    .number()
    .min(0, "Total price cannot be less than 0")
    .required("Total price is required"),
  orderDate: yup.date().required("Order date is required"),
});

type Mode = "add" | "update";

interface OrderFormProps {
  mode?: Mode;
  id?: number | null;
  fetchOrders?: Function | null;
}

const OrderForm: React.FC<OrderFormProps> = ({
  mode = "add",
  id = null,
  fetchOrders = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const [defaultValues, setDefaultValues] = useState({
    userId: "",
    userName: "",
    email: "",
    phone: "",
    orderItems: [],
    status: "",
    totalPrice: 0,
    orderDate: "",
  });

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await getStaffs();
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };

    const fetchOrderItemsData = async () => {
      try {
        const response = await getOrderItemsById(id);
        setOrderItems(response.data);
      } catch (error) {
        toast.error("Failed to load order items");
      }
    };

    const fetchOrderData = async () => {
      if (mode === "update" && id) {
        try {
          const response = await getOrderById(id);
          const order = response.data;
          setDefaultValues({
            userId: order.userId,
            userName: order.userName,
            email: order.email,
            phone: order.phone,
            orderItems: order.orderItems,
            status: order.status,
            totalPrice: order.totalPrice,
            orderDate: order.orderDate,
          });
        } catch (error) {
          toast.error("Failed to load order data");
        }
      }
    };

    fetchUsersData();
    fetchOrderItemsData();
    fetchOrderData();
  }, [mode, id]);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log("Form Values:", values); // Debug: Check form values on submit

      const res =
        mode === "update"
          ? await updateOrderStatusById(id)
          : await addOrder(values);

      if (res.code === 1) {
        toast.success(
          `${capitalizeFormater(mode)} Order ${values.orderId} Successfully!`
        );
        if (fetchOrders) fetchOrders();
      } else {
        toast.error(res.errMsg);
      }
    },
  });

  return (
    <Box
      my={4}
      sx={{
        "& .MuiTextField-root": {
          "& .MuiInputBase-root": {
            color: colors.primary[900],
          },
          "& .MuiFormLabel-root": {
            color: colors.grey[1000],
          },

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.primary[900],
            },
            "&:hover fieldset": {
              borderColor: colors.primary[600],
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.greenAccent[700],
            },
          },
          "& .MuiFormHelperText-root": {
            color: colors.redAccent[800],
            fontWeight: "bold",
            fontSize: 12,
          },
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <FormControl
            sx={{
              gridColumn: "span 12",
              "& .MuiInputLabel-root ": {
                color: colors.grey[1000],
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: colors.grey[1000],
              },
            }}
          >
            <InputLabel
              id="userId-label"
              sx={{
                color: colors.grey[800],
              }}
              shrink={true}
            >
              User
            </InputLabel>
            <Select
              labelId="userId-label"
              id="userId"
              value={formik.values.userId}
              label="User"
              onChange={(event) => {
                formik.setFieldValue("userId", event.target.value);
              }}
              // onBlur={formik.handleBlur}
              sx={{
                color: colors.primary[900],
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary[900], // Default border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary[600], // Hover border color
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.greenAccent[700], // Focused border color
                },
              }}
            >
              {users.map((user) => (
                <MenuItem value={user.id} key={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              gridColumn: "span 12",
              "& .MuiInputLabel-root ": {
                color: colors.grey[1000],
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: colors.grey[1000],
              },
            }}
          >
            <InputLabel
              id="orderItems-label"
              sx={{
                color: colors.grey[800],
              }}
              shrink={true}
            >
              Order Items
            </InputLabel>
            <Select
              labelId="orderItems-label"
              id="orderItems"
              multiple
              value={formik.values.orderItems}
              label="Order Items"
              onChange={(event) => {
                formik.setFieldValue("orderItems", event.target.value);
              }}
              // onBlur={formik.handleBlur}
              sx={{
                color: colors.primary[900],
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary[900], // Default border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primary[600], // Hover border color
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.greenAccent[700], // Focused border color
                },
              }}
            >
              {orderItems.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="status"
            name="status"
            label="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
            sx={{
              gridColumn: "span 12",
            }}
          />
          <TextField
            fullWidth
            id="totalPrice"
            name="totalPrice"
            label="Total Price"
            value={formik.values.totalPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.totalPrice && Boolean(formik.errors.totalPrice)
            }
            helperText={formik.touched.totalPrice && formik.errors.totalPrice}
            sx={{
              gridColumn: "span 12",
            }}
          />
          <TextField
            fullWidth
            id="orderDate"
            name="orderDate"
            label="Order Date"
            type="datetime-local"
            value={formik.values.orderDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.orderDate && Boolean(formik.errors.orderDate)}
            helperText={formik.touched.orderDate && formik.errors.orderDate}
            sx={{
              gridColumn: "span 12",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              gridColumn: "span 12",
              color: colors.primary[1000],
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OrderForm;
