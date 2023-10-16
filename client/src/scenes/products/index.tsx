import { Box, useMediaQuery } from "@mui/material";

import Header from "@/components/Header";
import Product from "./Product";
import Spinner from "@/components/Spinner";

import { useGetProductsQuery } from "@/state/api";

export default function Products() {
  const { data, isLoading } = useGetProductsQuery();

  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  if (isLoading) return <Spinner />;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Products" subTitle="See your list of products" />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {data?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
