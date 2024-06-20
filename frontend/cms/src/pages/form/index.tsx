import { Box } from "@mui/material";
import Header from "../../components/Header";
import StaffForm from "../../components/SraffForm";

const Form = () => {
  return (
    <Box m={4}>
      <Header title={"Staff Form"} subtitle={"Add new staff in the team"} />
      <StaffForm />
    </Box>
  );
};

export default Form;
