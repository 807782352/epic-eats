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
import { addDish, getDishById, updateDishById } from "../api/dishes";
import { getCategories } from "../api/category";
import ImageUpload from "./ImageUpload";
import { uploadIamge } from "../api/upload";

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
  name: yup
    .string()
    .min(2, "Must be 2 characters or More")
    .max(50, "Must be 50 characters or less")
    .required("Category Name is required"),
  categoryId: yup.number().required("Category is required"),
  price: yup.number().min(0, "No less than 0").round(),
  // image: yup.string(),
  // Note: if the validationSchema does not match, it will cause submit button not work without warning info
  description: yup
    .string()
    .min(0, "No less than 0")
    .max(300, "No more than 300 characters"),
  code: yup
    .string()
    .min(0, "No less than 0")
    .max(10, "No more than 10 characters")
    .required("Code is required"),
});

type Mode = "add" | "update";

interface DishFormProps {
  mode?: Mode;
  id?: number | null;
  fetchDishes?: Function | null;
}

const DishForm: React.FC<DishFormProps> = ({
  mode = "add",
  id = null,
  fetchDishes = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [categories, setCategories] = useState([]);

  // store selected image
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // store its url
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const [defaultValues, setDefaultValues] = useState({
    name: "Example",
    categoryId: "1",
    price: 0,
    image: "",
    description: "",
    code: "",
  });

  // handle upload image  -  want to put into the formit onSubmit
  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setImagePreviewUrl(URL.createObjectURL(file)); // Create a local URL for the selected image
    console.log(file);
    console.log(imagePreviewUrl);
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    const fetchDishData = async () => {
      if (mode === "update" && id) {
        try {
          const response = await getDishById(id);
          const dish = response.data;
          setDefaultValues({
            name: dish.name,
            categoryId: dish.categoryId,
            price: dish.price,
            image: dish.image,
            description: dish.description,
            code: dish.code,
          });
          setImagePreviewUrl(dish.image);
        } catch (error) {
          toast.error("Failed to load dish data");
        }
      }
    };

    fetchCategoriesData();
    fetchDishData();
  }, [mode, id]);

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log("Form Values:", values); // Debug: Check form values on submit

      console.log(selectedImage);

      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);

        try {
          const imgUrl = await uploadIamge(formData);
          values.image = imgUrl.data; // Set the image URL in the form values
        } catch (error) {
          toast.error("Failed to upload image.");
          return;
        }
      }
      console.log("Form Values:", values); // Debug: Check form values on submit

      const res =
        mode === "update"
          ? await updateDishById(id, values)
          : await addDish(values);

      if (res.code === 1) {
        toast.success(
          `${capitalizeFormater(mode)} ${values.name} Successfully!`
        );
        if (fetchDishes) fetchDishes();
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
            label="Dish Name"
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
              "& .MuiInputLabel-root ": {
                color: colors.grey[1000],
              },
              "& .Mui-focused .MuiInputLabel-root": {
                color: colors.grey[1000],
              },
            }}
          >
            <InputLabel
              id="categoryId-label"
              sx={{
                color: colors.grey[800],
              }}
              shrink={true}
            >
              Category
            </InputLabel>
            <Select
              labelId="categoryId-label"
              id="categoryId"
              value={formik.values.categoryId}
              label="Category"
              onChange={(event) => {
                formik.setFieldValue("categoryId", event.target.value);
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
              {categories.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            sx={{
              gridColumn: "span 12",
            }}
          />
          <TextField
            fullWidth
            id="code"
            name="code"
            label="Code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            sx={{
              gridColumn: "span 12",
            }}
          />
          {formik.values.image && (
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image Url"
              value={formik.values.image}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              sx={{
                gridColumn: "span 12",
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
          <Typography
            variant="h6"
            sx={{
              color: colors.primary[900],
              marginBottom: -2,
              marginLeft: 1,
            }}
          >
            Description
          </Typography>

          <StyledTextarea
            maxRows={4}
            placeholder="Write a description about the dish ..."
            value={formik.values.description}
            onChange={(event) => {
              formik.setFieldValue("description", event.target.value);
            }}
            sx={{
              gridColumn: "span 12",
            }}
          />

          <Box
            sx={{
              gridColumn: "span 12",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ImageUpload onSelectImage={handleImageSelect} />
            {imagePreviewUrl && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={imagePreviewUrl}
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    maxHeight: "80%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
          </Box>

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

export default DishForm;
