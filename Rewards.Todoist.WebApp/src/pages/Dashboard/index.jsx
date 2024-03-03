import { useQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";
import PersonalOverview from "./personal-overview";
import { Stack } from "@mui/material";

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  margin: auto;
  justify-content: center;
`;

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
    <LayoutContainer>
      {isPending && <>Ładowanie danych...</>}
      {error && <>Błąd: {error.message}</>}
      {data && (
        <Stack spacing={2} direction="row">
          <PersonalOverview
            user={"Carq"}
            completedTasks={dashboardCarq.completedTasks}
            experianceOverview={dashboardCarq.experianceOverview}
          />
          <PersonalOverview
            user={"Martyna"}
            completedTasks={dashboardMartyna.completedTasks}
            experianceOverview={dashboardMartyna.experianceOverview}
          />
        </Stack>
      )}
    </LayoutContainer>
  );
}
