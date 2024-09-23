import { useQuery } from "@tanstack/react-query";
import PersonalOverview from "./personal-overview";
import { Grid } from "@mui/material";

export default function Dashboard() {
  const { isPending, error, data } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: () =>
      fetch("https://localhost:7021/dashboard").then((res) => res.json()),
  });

  let dashboardCarq = data?.users.find((x) => x.info.name == "Carq");

  let dashboardMartyna = data?.users.find((x) => x.info.name == "Martyna");

  return (
    <>
      {isPending && <>Ładowanie danych...</>}
      {error && <>Błąd: {error.message}</>}
      {data && (
        <Grid justifyContent="center" container spacing={4} sx={{ p: 2 }}>
          <Grid item sx={{ width: 450 }}>
            <PersonalOverview
              user={"Martyna"}
              stats={dashboardMartyna.stats}
              activities={dashboardMartyna.activities}
              experianceOverview={dashboardMartyna.overview}
            />
          </Grid>
          <Grid item sx={{ width: 450 }}>
            <PersonalOverview
              user={"Carq"}
              stats={dashboardCarq.stats}
              activities={dashboardCarq.activities}
              experianceOverview={dashboardCarq.overview}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
