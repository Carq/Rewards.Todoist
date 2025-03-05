import { useQuery } from "@tanstack/react-query";
import PersonalOverview from "./personal-overview";
import ListOfTasks from "./list-of-tasks";
import { Grid } from "@mui/material";
import { config } from "../../config";

export default function Dashboard() {
  const {
    isPending,
    error,
    data,
    refetch: refetchDashboard,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () =>
      fetch(`${config.apiUrl}dashboard`, {
        headers: {
          Authorization: `${localStorage.getItem("AuthToken")}`,
        },
      }).then((res) => res.json()),
  });

  const {
    isPending: isPendingActiveTask,
    isRefetching: isRefetchingActiveTask,
    data: dataActiveTask,
    refetch: refetchActiveTasks,
  } = useQuery({
    queryKey: ["active-tasks"],
    queryFn: () =>
      fetch(`${config.apiUrl}projects/active-tasks`, {
        headers: {
          Authorization: `${localStorage.getItem("AuthToken")}`,
        },
      }).then((res) => res.json()),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnMount: false,
  });

  const refetchAll = () => {
    refetchDashboard();
    refetchActiveTasks();
  };

  let dashboardCarq = data?.users.find((x) => x.info.id == "9238519");
  let dashboardMartyna = data?.users.find((x) => x.info.id == "33983343");

  return (
    <>
      {error && <>Błąd: {error.message}</>}
      {(data || isPending) && (
        <Grid justifyContent="center" container spacing={3}>
          <Grid item sx={{ width: 420 }}>
            <ListOfTasks
              listOfTasks={dataActiveTask?.tasks}
              isLoading={isPendingActiveTask}
              isReloading={isRefetchingActiveTask}
              refetchTasks={refetchAll}
            />
          </Grid>
          <Grid item sx={{ width: 425 }}>
            <PersonalOverview
              user={dashboardMartyna?.info?.name}
              stats={dashboardMartyna?.stats}
              recentCompletedTasks={dashboardMartyna?.recentCompletedTasks}
              recentClaimedRewards={dashboardMartyna?.recentClaimedRewards}
              experianceOverview={dashboardMartyna?.overview}
              isLoading={isPending}
            />
          </Grid>
          <Grid item sx={{ width: 425 }}>
            <PersonalOverview
              user={dashboardCarq?.info?.name}
              stats={dashboardCarq?.stats}
              recentCompletedTasks={dashboardCarq?.recentCompletedTasks}
              recentClaimedRewards={dashboardCarq?.recentClaimedRewards}
              experianceOverview={dashboardCarq?.overview}
              isLoading={isPending}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}
