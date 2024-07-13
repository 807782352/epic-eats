import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../utils/theme";

export default function Contact() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const EMAIL_TOKEN = "5ecfee2f-cae1-4260-bdbc-07d8e236d56f";

  const sendDataArr = ["Send Message", "Submitting", "Sent", "Error"];

  const initFormDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    access_key: EMAIL_TOKEN,
  };

  const [formDetails, setFormDetails] = useState(initFormDetails);
  const [status, setStatus] = useState({});
  const [sendDataIdx, setSendDataIdx] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendDataIdx(1);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formDetails),
    });

    const result = await response.json();

    if (result.success) {
      setStatus({ success: true, message: "Message Sent Successfully!" });
      setSendDataIdx(2);
    } else {
      setStatus({
        success: false,
        message: "Something went wrong, please try again later!",
      });
      setSendDataIdx(3);
    }

    setFormDetails(initFormDetails);
  };

  const onFormUpdate = (action, payload) => {
    setFormDetails({ ...formDetails, [action]: payload });
  };

  return (
    <Box sx={{ color: colors.grey[100] }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontSize: "2rem",
          fontWeight: 700,
        }}
      >
        Contact Us
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
          p: 3,
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: `${colors.grey[300]} `,
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: `${colors.primary[300]} `,
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: `${colors.primary[100]} `,
            },
        }}
      >
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={formDetails.firstName}
          onChange={(e) => onFormUpdate("firstName", e.target.value)}
          required
          InputProps={{
            style: {
              color: colors.primary[300],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
            },
          }}
          InputLabelProps={{
            style: {
              color: colors.grey[100],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
              paddingRight: 2,

            },
          }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={formDetails.lastName}
          onChange={(e) => onFormUpdate("lastName", e.target.value)}
          required
          InputProps={{
            style: {
              color: colors.primary[300],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
            },
          }}
          InputLabelProps={{
            style: {
              color: colors.grey[100],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
              paddingRight: 2,

            },
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={formDetails.email}
          onChange={(e) => onFormUpdate("email", e.target.value)}
          required
          InputProps={{
            style: {
              color: colors.primary[300],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
            },
          }}
          InputLabelProps={{
            style: {
              color: colors.grey[100],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
              paddingRight: 2,
            },
          }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={formDetails.phone}
          onChange={(e) => onFormUpdate("phone", e.target.value)}
          InputProps={{
            style: {
              color: colors.primary[300],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
            },
          }}
          InputLabelProps={{
            style: {
              color: colors.grey[100],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
              paddingRight: 2,
            },
          }}
        />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={formDetails.message}
          onChange={(e) => onFormUpdate("message", e.target.value)}
          required
          InputProps={{
            style: {
              color: colors.primary[300],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
            },
          }}
          InputLabelProps={{
            style: {
              color: colors.grey[100],
              fontFamily: "Source Sans 3, Arial, sans-serif",
              fontSize: "1.25rem",
              paddingRight: 2,
              
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {sendDataArr[sendDataIdx]}
        </Button>
        {status?.message && (
          <Typography
            color={
              status.success ? colors.greenAccent[300] : colors.primary[300]
            }
            fontSize="1.5rem"
          >
            {status.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
