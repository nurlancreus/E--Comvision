import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Rating,
  CardActions,
  Button,
  Collapse,
  useTheme,
} from "@mui/material";

import { type ProductType } from "@/state/types";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  const { _id, category, name, price, rating, description, stat, supply } =
    product;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price.toFixed(2))}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? "See Less" : "See More"}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat[0].yearlySalesTotal}
          </Typography>
          <Typography>Yearly Units Sold This Year: {_id}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
