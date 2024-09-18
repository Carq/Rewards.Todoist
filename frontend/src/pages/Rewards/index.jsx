import { useQuery } from "@tanstack/react-query";

const Rewards = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["rewards-available"],
    queryFn: () =>
      fetch("https://localhost:7021/rewards/available").then((res) =>
        res.json()
      ),
  });

  console.log(data);

  return (
    <>
      {isPending && <>Ładowanie danych...</>}
      {error && <>Błąd: {error.message}</>}
      {data && (
        <ul>
          {data.rewards.map((reward) => (
            <li key={reward.id}>
              {reward.name} - {reward.requiredGold} gold
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Rewards;
