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
    queryKey: ["completedTasks"],
    queryFn: () =>
      fetch("https://localhost:7021/project/completed-tasks").then((res) =>
        res.json()
      ),
  });

  let completedTaskByL = data?.data.filter(
    (task) => task.whoCompleted == "Łukasz"
  );
  let completedTaskByM = data?.data.filter(
    (task) => task.whoCompleted == "Martyna"
  );

  return (
    <LayoutContainer>
      <Stack spacing={2} direction="row">
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {!isPending && (
          <>
            <OverviewLatestCompletedTasks
              title={"Łukasz ukończył " + completedTaskByL.length + " zadań"}
              completedTasks={completedTaskByL}
            />
            <OverviewLatestCompletedTasks
              title={"Martyna ukończyła" + completedTaskByM.length + " zadań"}
              completedTasks={completedTaskByM}
            />
          </>
        )}
      </Stack>
    </LayoutContainer>
  );
}
