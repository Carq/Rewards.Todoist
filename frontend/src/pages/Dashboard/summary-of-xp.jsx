import { Card, CardContent, Typography, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import PropTypes from "prop-types";

const SummaryOfXP = ({ experianceOverview }) => {
  const dates = Object.keys(experianceOverview).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const last5Days = dates.slice(-6);

  const xAxis = [
    {
      scaleType: "band",
      data: last5Days,
    },
  ];
  const yAxis = [
    {
      label: "XP",
      data: last5Days.map((date) => experianceOverview[date].totalExperience),
    },
  ];

  const getWeekNumber = (date) => {
    const d = new Date(date);
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const currentWeekNumber = getWeekNumber(new Date());
  const lastWeekNumber = currentWeekNumber - 1;

  const totalExperienceCurrentWeek = dates
    .filter((date) => getWeekNumber(date) === currentWeekNumber)
    .reduce((acc, date) => acc + experianceOverview[date].totalExperience, 0);

  const totalExperienceLastWeek = dates
    .filter((date) => getWeekNumber(date) === lastWeekNumber)
    .reduce((acc, date) => acc + experianceOverview[date].totalExperience, 0);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          XP dla ostatnich 5 dni
        </Typography>
        <BarChart
          height={230}
          xAxis={xAxis}
          yAxis={[
            {
              max: 15,
              min: 0,
            },
          ]}
          series={yAxis}
          margin={{ top: 15, bottom: 20 }}
          slotProps={{ legend: { hidden: true } }}
        />
        <Stack
          mt={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Stack alignItems="center">
            <Typography variant="subtitle2">
              {totalExperienceCurrentWeek} XP
            </Typography>
            <Typography variant="caption">Ten Tydzień</Typography>
          </Stack>

          <Stack alignItems="center">
            <Typography variant="subtitle2">
              {totalExperienceLastWeek} XP
            </Typography>
            <Typography variant="caption">Poprzedni tydzień</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
SummaryOfXP.propTypes = {
  experianceOverview: PropTypes.object.isRequired,
};

export default SummaryOfXP;
