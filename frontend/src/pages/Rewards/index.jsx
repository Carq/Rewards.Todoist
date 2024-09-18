const rewards = [
  { id: 1, name: "Reward 1", description: "Description for Reward 1" },
  { id: 2, name: "Reward 2", description: "Description for Reward 2" },
  { id: 3, name: "Reward 3", description: "Description for Reward 3" },
];

const Rewards = () => {
  return (
    <div>
      <h1>Rewards</h1>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>
            <h2>{reward.name}</h2>
            <p>{reward.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rewards;
