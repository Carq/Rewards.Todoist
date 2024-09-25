import { Card, CardContent, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const SummaryOfXP = ({ experianceOverview }) => {
  const xAxis = [
    {
      scaleType: "band",
      data: Object.keys(experianceOverview),
      max: 20,
      min: 0,
    },
  ];
  const yAxis = [
    {
      label: "XP",
      data: Object.values(experianceOverview).map((x) => x.totalExperience),
    },
  ];

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          XP dla ostatnich 5 dni
        </Typography>
        <BarChart
          height={230}
          xAxis={xAxis}
          series={yAxis}
          slotProps={{ legend: { hidden: true } }}
        />
      </CardContent>
    </Card>
  );
};

export default SummaryOfXP;
