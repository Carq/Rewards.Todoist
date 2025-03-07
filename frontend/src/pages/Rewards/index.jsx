import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { config } from "../../config";
import {
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import confetti from "canvas-confetti";
import BlurredText from "../../componets/BlurredText";
import LabelTag from "../../components/LabelTag";

const Rewards = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["rewards-available"],
    queryFn: () =>
      fetch(`${config.apiUrl}rewards/available`, {
        headers: {
          Authorization: `${localStorage.getItem("AuthToken")}`,
        },
      }).then((res) => res.json()),
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

  useEffect(() => {
    if (claimReward.isSuccess) {
      confetti({
        particleCount: 70,
        scalar: 1.2,
        spread: 360,
        shapes: ["star"],
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 25,
          scalar: 0.75,
          spread: 300,
          shapes: ["star"],
        });
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [claimReward.isSuccess]);

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
            <>
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
                      color="success"
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
                  primary={<BlurredText>{reward.name}</BlurredText>}
                  secondary={
                    <LabelTag
                      label={`Gold${reward.requiredGold}`}
                      color="gold"
                    />
                  }
                />
              </ListItem>
              <Divider component="li" />
            </>
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
