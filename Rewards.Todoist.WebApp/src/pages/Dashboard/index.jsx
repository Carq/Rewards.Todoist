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
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["completedTasks"],
    queryFn: () =>
      fetch("https://localhost:7021/project/completed-tasks").then((res) =>
        res.json()
      ),
  });

  let completedTaskByL = data?.userCompletedTasks.find(
    (x) => x.userName == "Carq"
  ).completedTasks;

  let completedTaskByM = data?.userCompletedTasks.find(
    (x) => x.userName == "Martyna"
  ).completedTasks;

  console.log(completedTaskByL);

  return (
    <LayoutContainer>
      {isPending && <>Ładowanie danych...</>}
      {error && <>Błąd: {error.message}</>}
      {data && (
        <Stack spacing={2} direction="row">
          <PersonalOverview user={"Carq"} completedTasks={completedTaskByL} />
          <PersonalOverview
            user={"Martyna"}
            completedTasks={completedTaskByM}
          />
        </Stack>
      )}
    </LayoutContainer>
  );
}
