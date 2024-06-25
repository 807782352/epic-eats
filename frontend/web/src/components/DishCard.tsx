import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import { tokens } from "../utils/theme";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function DishCard({ dish }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          title={dish.name}
          sx={{
            padding: 1,
            maxWidth: "70%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: "1.25rem",
          }}
        >
          {dish.name}
        </Typography>
        <Avatar
          sx={{ bgcolor: colors.primary[500], color: colors.grey[900] }}
          aria-label="price"
        >
          ${dish.price}
        </Avatar>
      </Box>
      <Box
        sx={{
          width: "400px",
          height: "250px",
          backgroundImage: `url(${dish.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {dish.brief}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <AddShoppingCartIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="h3"
            sx={{
              p: 1,
              color: colors.grey[900],
            }}
          >
            Description:
          </Typography>
          <Typography
            variant="h4"
            sx={{
              p: 1,
              color: colors.grey[700],
            }}
          >
            {dish.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
