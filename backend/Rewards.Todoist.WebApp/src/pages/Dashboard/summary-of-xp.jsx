import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const SummaryOfXP = ({ experianceOverview }) => {
  const DisplayExperiance = (name, xp, count) => {
    return (
      <TableRow>
        <TableCell>
          <Typography variant="subtitle1">{name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1">{xp}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1">{count}</Typography>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Podsumowanie XP
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>XP</TableCell>
              <TableCell>Zadania</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DisplayExperiance(
              "Wszystko:",
              experianceOverview.total.totalExperience,
              experianceOverview.total.totalTasksCompleted
            )}
            {DisplayExperiance(
              "Dzisiaj:",
              experianceOverview.today.totalExperience,
              experianceOverview.today.totalTasksCompleted
            )}
            {DisplayExperiance(
              "Ostatnie 7 dni:",
              experianceOverview.lastWeek.totalExperience,
              experianceOverview.lastWeek.totalTasksCompleted
            )}
            {DisplayExperiance(
              "Obecny miesiąc:",
              experianceOverview.currentMonth.totalExperience,
              experianceOverview.currentMonth.totalTasksCompleted
            )}
            {DisplayExperiance(
              "Poprzedni miesiąc:",
              experianceOverview.lastMonth.totalExperience,
              experianceOverview.lastMonth.totalTasksCompleted
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SummaryOfXP;
