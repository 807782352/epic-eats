import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const ImageUpload = ({ onSelectImage }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    onSelectImage(selectedImage);
  };

  return (
    <Box display="flex" gap={2} justifyContent={"center"} alignItems={"center"}>
      <Button
        variant="contained"
        component="label"
        onChange={handleImageChange}
      >
        Upload File  (&lt; 5MB)
        <input type="file" hidden />
      </Button>

      {image && <Typography>{image.name}</Typography>}
    </Box>
  );
};

export default ImageUpload;
