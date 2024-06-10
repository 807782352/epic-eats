import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { tokens } from "../utils/theme";
import { addStaff, getStaffById, updateStaffById } from "../api/staff";
import { toast } from "react-toastify";
import { capitalizeFormater } from "../utils/utils";
import { useEffect, useState } from "react";

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

type Mode = "add" | "update";

interface StaffFormProps {
  mode?: Mode;
  id?: number | null;
  fetchStaffs?: Function | null;
}

const StaffForm: React.FC<StaffFormProps> = ({
  mode = "add",
  id = null,
  fetchStaffs = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [defaultValues, setDefaultValues] = useState({
    firstName: "foo",
    lastName: "bar",
    phone: "1234567890",
    email: "foobar@example.com",
    password: "password",
    roleId: 2,
  });

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        const res = await getStaffById(id);
        const staff = res.data.data;

        setDefaultValues({
          firstName: staff.firstName,
          lastName: staff.lastName,
          phone: staff.phone,
          email: staff.email,
          password: staff.password,
          roleId: staff.roleId.id,
        });
        console.log(staff);
      };
      fetchData();
    }
  }, [mode, id]);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    enableReinitialize: true, // allow form to re-initialize
    onSubmit: async (values) => {
      const res =
        mode === "update"
          ? await updateStaffById(id, values)
          : await addStaff(values);
      console.log(res);

      if (res.code === 1) {
        toast.success(
          `${capitalizeFormater(mode)} ${values.firstName} ${
            values.lastName
          } Successfully!`
        );
        if (fetchStaffs) fetchStaffs();
      } else {
        toast.error(res.errMsg);
      }
    },
  });

  useEffect(() => {
    console.log("Formik Values:", formik.values); // Debug: Check formik values
  }, [formik.values]);

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
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="FirstName"
            value={capitalizeFormater(formik.values.firstName)}
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
            value={capitalizeFormater(formik.values.lastName)}
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
            disabled={mode === "update"}
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
              id="roleId"
              sx={{
                color: colors.grey[800],
              }}
              shrink={true}
            >
              Role Id
            </InputLabel>
            <Select
              labelId="roleId"
              id="roleId"
              value={formik.values.roleId}
              label="Role Id"
              onChange={(event) => {
                formik.setFieldValue("roleId", event.target.value);
              }}
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
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Manager</MenuItem>
              <MenuItem value={3}>Staff</MenuItem>
              <MenuItem value={4}>User</MenuItem>
            </Select>
          </FormControl>
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

export default StaffForm;
