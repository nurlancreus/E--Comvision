import { Box } from "@mui/material";

import Header from "@/components/Header";
import BreakdownChart from "@/components/BreakdownChart";

export default function Breakdow() {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Breakdown" subTitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
}
