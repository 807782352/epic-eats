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
import { toast } from "react-toastify";
import { capitalizeFormater } from "../utils/utils";
import { useEffect, useState } from "react";
import {
  addCategory,
  getCategoryById,
  updateCategoryById,
} from "../api/category";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, "Must be 2 characters or More")
    .max(50, "Must be 50 characters or less")
    .required("Category Name is required"),
  typeId: yup
    .number()
    .oneOf([1, 2], "Invalid Type")
    .required("Type is required"),
});

type Mode = "add" | "update";

interface CategoryFormProps {
  mode?: Mode;
  id?: number | null;
  fetchCategories?: Function | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  mode = "add",
  id = null,
  fetchCategories = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [defaultValues, setDefaultValues] = useState({
    name: "foo",
    typeId: 1,
  });

  useEffect(() => {
    if (mode === "update" && id) {
      const fetchData = async () => {
        const res = await getCategoryById(id);
        const category = res.data;
        setDefaultValues({
          name: category.name,
          typeId: category.type,
        });
      };
      fetchData();
    }
  }, [mode, id]);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    enableReinitialize: true, // allow form to re-initialize
    onSubmit: async (values) => {
      const submissionValues = {
        ...values,
        type: values.typeId,
      };

      delete submissionValues.typeId;

      console.log("submissionValues", submissionValues);
      const res =
        mode === "update"
          ? await updateCategoryById(id, submissionValues)
          : await addCategory(submissionValues);

      if (res.code === 1) {
        toast.success(
          `${capitalizeFormater(mode)} ${submissionValues.name} Successfully!`
        );
        if (fetchCategories) fetchCategories();
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
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Category Name"
            value={capitalizeFormater(formik.values.name)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{
              gridColumn: "span 12",
            }}
          />
          <FormControl
            sx={{
              gridColumn: "span 12",
            }}
          >
            <InputLabel
              id="type"
              sx={{
                color: colors.grey[800],
              }}
              shrink={true}
            >
              Type Id
            </InputLabel>
            <Select
              labelId="typeId"
              id="type"
              value={formik.values.typeId}
              label="Type Id"
              onChange={(event) => {
                formik.setFieldValue("typeId", event.target.value);
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
              <MenuItem value={1}>Dish</MenuItem>
              <MenuItem value={2}>Combo</MenuItem>
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

export default CategoryForm;
