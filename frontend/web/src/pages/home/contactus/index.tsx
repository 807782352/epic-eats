import { Box, Container, useTheme } from "@mui/material";
import CustomMap from "../../../components/CustomMap";
import ContactForm from "../../../components/ContactForm";
import { tokens } from "../../../utils/theme";

const ContactUs = () => {
    const position = [28.6933, 115.8479];

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Container maxWidth="xl" sx={{ color: colors.grey[100] }}>
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, 
                width: "100%",
                height: "auto",
                alignItems: {md: "start", xs: "center"},
                justifyContent: "space-between",
                gap: 10, 
                paddingTop: {xs: 5, md: 20},
                paddingBottom: {xs: 5, md: 20}
            }}>
                <Box sx={{ flex: 1, marginTop: {xs: "5%", md: "0%"}, width: "60%"}}>
                    <CustomMap position={position} />
                </Box>
                <Box sx={{ flex: 1,  marginTop: {md: "0%"}, width: "60%"}}>
                    <ContactForm />
                </Box>
            </Box>
        </Container>
    );
}

export default ContactUs;
