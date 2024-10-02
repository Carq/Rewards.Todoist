import { useMutation, useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import {
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

const Rewards = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["rewards-available"],
    queryFn: () =>
      fetch(`${config.apiUrl}rewards/available`).then((res) => res.json()),
  });

  const claimReward = useMutation({
    mutationFn: (claimRewardDto) => {
      return axios.post(`${config.apiUrl}rewards/claim`, claimRewardDto, {
        headers: {
          Authorization: `${localStorage.getItem("AuthToken")}`,
        },
      });
    },
  });

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        width: 450,
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
              secondaryAction={
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<ShoppingCartIcon />}
                    disabled={claimReward.isPending || claimReward.isError}
                    onClick={() =>
                      claimReward.mutate({
                        rewardId: reward.id,
                        userId: 9238519,
                        claimedOn: new Date().toISOString().split("T")[0],
                      })
                    }
                  >
                    Carq
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<ShoppingCartIcon />}
                    disabled={claimReward.isPending || claimReward.isError}
                    onClick={() =>
                      claimReward.mutate({
                        rewardId: reward.id,
                        userId: 33983343,
                        claimedOn: new Date().toISOString().split("T")[0],
                      })
                    }
                  >
                    Martyna
                  </Button>
                </Stack>
              }
            >
              <ListItemText
                primary={reward.name}
                secondary={
                  <Chip
                    label={`Gold${reward.requiredGold}`}
                    color="gold"
                    size="small"
                  />
                }
              />
            </ListItem>
          ))}
        </List>
      )}
      {claimReward.isPending && <LinearProgress />}
      {claimReward.isError && "Błąd podczas kupowania nagrody. Pogadaj z Carq."}
      {claimReward.isSuccess && "Udało się kupić nagrodę"}
    </Paper>
  );
};

export default Rewards;
