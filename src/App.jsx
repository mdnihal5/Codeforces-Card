import { useContext, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import UserContext from "./components/UserContext";
import Start from "./components/Start";
import HandlenotFound from "./components/HandlenotFound";
const App = () => {
  const {
    user,
    setUser,
    Data,
    setData,
    handleFound,
    sethandleFound,
    inputUser,
    setInputUser,
  } = useContext(UserContext);

  const getUser = async (user) => {
    if (user.length === 0) return;
    const queryUrl = `https://codeforces.com/api/user.info?handles=${user};Fefer_Ivan&checkHistoricHandles=false`;

    const res = await fetch(queryUrl);
    const data = await res.json();
    if (data.status === "OK") {
      console.log("success full");
      sethandleFound(1);
      setData(data.result[0]);
    } else {
      sethandleFound(2);
    }
  };
  useEffect(() => {
    if (handleFound === 1 && Data !== null)
      setUser({
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
        onChange={(e) => setInputUser(e.target.value)}
        type="text"
        placeholder="enter your codeforces handle"
        className="w-[400px] h=5 input ml-[25%] bg-gray-300 m-5 text-center rounded-md"
      />
      <button
        className="btn btn-sm  btn-primary"
        onClick={() => {
          getUser(inputUser);
          console.log(handleFound, Data, user);
        }}
      >
        submit
      </button>
      {handleFound === 1 && user ? (
        <ProfileCard user={user} />
      ) : handleFound === 0 ? (
        <Start />
      ) : (
        <HandlenotFound />
      )}
    </div>
  );
};

export default App;
