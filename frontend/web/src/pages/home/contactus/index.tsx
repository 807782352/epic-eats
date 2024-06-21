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
                flexDirection: { xs: "column", md: "row" }, // 在小屏幕上垂直排列，大屏幕上水平排列
                width: "100%",
                height: "auto",
                alignItems: "center",
                justifyContent: "space-between", // 在两端对齐内容
                gap: 2, // 设置子元素之间的间距
            }}>
                <Box sx={{ flex: 1, marginTop: {xs: "5%", md: "2%"}, width: "60%"}}>
                    <CustomMap position={position} />
                </Box>
                <Box sx={{ flex: 1,  marginTop: {md: "2%"}, width: "60%"}}>
                    <ContactForm />
                </Box>
            </Box>
        </Container>
    );
}

export default ContactUs;
