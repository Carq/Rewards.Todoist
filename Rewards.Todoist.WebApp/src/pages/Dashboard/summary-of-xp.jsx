import { Card, CardContent, Typography } from "@mui/material";

const SummaryOfXP = ({ tasks }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          XP za 7 ostatnie dni
        </Typography>
        <Typography variant="subtitle1">{tasks.length}</Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryOfXP;
