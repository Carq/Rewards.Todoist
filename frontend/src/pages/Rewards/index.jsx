import { useQuery } from "@tanstack/react-query";
import { config } from "../../config";

const Rewards = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["rewards-available"],
    queryFn: () =>
      fetch(`${config.apiUrl}rewards/available`).then((res) => res.json()),
  });

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
