import React from "react";
import ProfileCard from "./ProfileCard";

const App = () => {
  const user = {
    tier: "specialist",
    username: "md_nihal",
    contestRating: 1409,
    friendsOf: 0,
    maxrating: 0,
    rank: 1,
    contribution: 0,
  };

  return (
    <div className="App">
      <ProfileCard user={user} />
    </div>
  );
};

export default App;
