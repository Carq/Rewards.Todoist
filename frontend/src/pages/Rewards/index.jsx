import { useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const Rewards = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["rewards-available"],
    queryFn: () =>
      fetch(`${config.apiUrl}rewards/available`).then((res) => res.json()),
  });

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        width: 400,
      }}
    >
      <Typography variant="h4">Nagrody</Typography>
      {isPending && <>Ładowanie danych...</>}
      {error && <>Błąd: {error.message}</>}
      {data && (
        <List>
          {data.rewards.map((reward) => (
            <ListItem
              key={reward.id}
              secondaryAction={<>{reward.requiredGold} gold</>}
            >
              <ListItemText primary={`${reward.name}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default Rewards;
