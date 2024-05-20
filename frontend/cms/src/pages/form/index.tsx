import { Box } from "@mui/material";
import Header from "../../components/Header";
import CreateStaffForm from "../../components/CreateStaffForm";

const Form = () => {
  return (
    <Box m={4}>
      <Header title={"Staff Form"} subtitle={"Add new staff in the team"} />
      <CreateStaffForm />
    </Box>
  );
};

export default Form;
