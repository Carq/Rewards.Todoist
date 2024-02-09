import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import OverviewLatestCompletedTasks from "./overview-latest-completed-tasks";
import styled from "@emotion/styled";

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  margin: auto;
  justify-content: center;
`;

export default function Dashboard() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["latestCompletedTasks"],
    queryFn: () =>
      fetch("https://localhost:7021/project/activity").then((res) =>
        res.json()
      ),
  });

  return (
    <LayoutContainer>
      <Stack spacing={2} direction="row">
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {!isPending && (
          <>
            <OverviewLatestCompletedTasks events={data.events} />
            <OverviewLatestCompletedTasks events={data.events} />
          </>
        )}
      </Stack>
    </LayoutContainer>
  );
}
