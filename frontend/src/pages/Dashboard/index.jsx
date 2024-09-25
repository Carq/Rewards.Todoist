import { useQuery } from "@tanstack/react-query";
import PersonalOverview from "./personal-overview";
import { Grid } from "@mui/material";
import { config } from "../../config";

export default function Dashboard() {
  const { isPending, error, data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetch(`${config.apiUrl}dashboard`).then((res) => res.json()),
  });

  let dashboardCarq = data?.users.find((x) => x.info.name == "Carq");

  let dashboardMartyna = data?.users.find((x) => x.info.name == "Martyna");

  return (
    <>
      {isPending && <>Ładowanie danych...</>}
      {error && <>Błąd: {error.message}</>}
      {data && (
        <Grid justifyContent="center" container spacing={4}>
          <Grid item sx={{ width: 450 }}>
            <PersonalOverview
              user={"Martyna"}
              stats={dashboardMartyna.stats}
              recentCompletedTasks={dashboardMartyna.recentCompletedTasks}
              recentClaimedRewards={dashboardMartyna.recentClaimedRewards}
              experianceOverview={dashboardMartyna.overview}
            />
          </Grid>
          <Grid item sx={{ width: 450 }}>
            <PersonalOverview
              user={"Carq"}
              stats={dashboardCarq.stats}
              recentCompletedTasks={dashboardCarq.recentCompletedTasks}
              recentClaimedRewards={dashboardCarq.recentClaimedRewards}
              experianceOverview={dashboardCarq.overview}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
