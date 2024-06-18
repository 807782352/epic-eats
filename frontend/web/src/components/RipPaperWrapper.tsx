import React from "react";
import Box from "@mui/material/Box";
import RipPaper from "./RipPaper";

const RipPaperWrapper = ({ fillColor }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "27px",
        overflow: "hidden",
        lineHeight: 0,
        marginBottom: "-1px", // 使用负边距隐藏多余的1px线条
      }}
    >
      <RipPaper fillColor={fillColor} />
    </Box>
  );
};

export default RipPaperWrapper;
