import { Box, Button, TextField, useTheme } from "@mui/material";
import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { tokens } from "../utils/theme";
import { addStaff } from "../api/staff";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "Must be 2 characters or More")
    .max(50, "Must be 50 characters or less")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(2, "Must be 2 characters or More")
    .max(50, "Must be 50 characters or less")
    .required("Last Name is required"),
  phone: yup
    .string()
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      "Phone number is not valid"
    )
    .required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  roleId: yup
    .number()
    .oneOf([1, 2, 3, 4], "Invalid role")
    .required("Role is required"),
});

const CreateStaffForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formik = useFormik({
    initialValues: {
      firstName: "foo",
      lastName: "bar",
      phone: "1234567890",
      email: "foobar@example.com",
      password: "password",
      roleId: 2,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await addStaff(values);

      console.log(res);

      if (res.code === 1) {
        toast.success(
          `Add ${values.firstName.toUpperCase()} ${values.lastName.toUpperCase()} Successfully!`
        );
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
            color: colors.primary[900], // 输入文本颜色
          },
          "& .MuiFormLabel-root": {
            color: colors.grey[1000], // 标签颜色
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.primary[900], // 默认边框颜色
            },
            "&:hover fieldset": {
              borderColor: colors.primary[600], // 鼠标悬停时边框颜色
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.greenAccent[700], // 聚焦时边框颜色
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
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="FirstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={{
              gridColumn: "span 6",
            }}
          />
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="LastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={{
              gridColumn: "span 6",
            }}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              gridColumn: "span 12",
            }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              gridColumn: "span 12",
            }}
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{
              gridColumn: "span 12",
            }}
          />
          <TextField
            fullWidth
            id="roleId"
            name="roleId"
            label="RoleId"
            value={formik.values.roleId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.roleId && Boolean(formik.errors.roleId)}
            helperText={formik.touched.roleId && formik.errors.roleId}
            sx={{
              gridColumn: "span 12",
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

export default CreateStaffForm;
