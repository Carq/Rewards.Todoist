import { useQuery } from "@tanstack/react-query";
import PersonalOverview from "./personal-overview";
import { Grid, Box } from "@mui/material";

export default function Dashboard() {
  const { isPending, error, data } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: () =>
      fetch("https://localhost:7021/dashboard").then((res) => res.json()),
  });

  let dashboardCarq = data?.usersDashboardData.find(
    (x) => x.userName == "Carq"
  );

  let dashboardMartyna = data?.usersDashboardData.find(
    (x) => x.userName == "Martyna"
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        m: "auto",
      }}
    >
      {isPending && <>Ładowanie danych...</>}
      {error && <>Błąd: {error.message}</>}
      {data && (
        <Grid justifyContent="center" container spacing={4} sx={{ p: 2 }}>
          <Grid item sx={{ width: 420 }}>
            <PersonalOverview
              user={"Martyna"}
              stats={dashboardMartyna.userStats}
              completedTasks={dashboardMartyna.completedTasks}
              experianceOverview={dashboardMartyna.experianceOverview}
            />
          </Grid>
          <Grid item sx={{ width: 420 }}>
            <PersonalOverview
              user={"Carq"}
              stats={dashboardCarq.userStats}
              completedTasks={dashboardCarq.completedTasks}
              experianceOverview={dashboardCarq.experianceOverview}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
