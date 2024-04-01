import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { set } from "react-hook-form";

const getUser = async (user, setData) => {
  console.log(user);
  const queryUrl = `https://codeforces.com/api/user.info?handles=${user};Fefer_Ivan&checkHistoricHandles=false`;

  const res = await fetch(queryUrl);
  const data = await res.json();
  if (data.status === "OK") {
    console.log("success full");
    setData(data.result[0]);
  }
};
const App = () => {
  const [User, setUser] = useState("");
  const [Data, setData] = useState(null);
  const [user, setuser] = useState({
    tier: "loading",
    username: "loading",
    avatar: <div className="w-[120px] skeleton"></div>,
    contestRating: "loading",
    friendsOf: "loading",
    maxrating: "laoding",
    contribution: "laoding",
  });
  useEffect(() => {
    if (Data)
      setuser({
        tier: Data.rank,
        avatar: Data.avatar,
        username: Data.handle,
        contestRating: Data.rating,
        friendsOf: Data.friendOfCount,
        maxrating: Data.maxRating,
        contribution: Data.contribution,
      });
  }, [Data]);
  return (
    <div className="App">
      <input
        onChange={(e) => setUser(e.target.value)}
        type="text"
        className="w-32 h=5 bg-gray-300 m-5"
      />
      <button
        onClick={() => {
          getUser(User, setData);
        }}
      >
        submit
      </button>
      {Data ? (
        <>
          <ProfileCard user={user} />
          <button className="btn btn-primary" onClick={() => console.log(user)}>
            Show
          </button>
        </>
      ) : (
        <div className=" skeleton mx-auto my-8  w-[400px] h-[450px] "></div>
      )}
    </div>
  );
};

export default App;
