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
    const queryUrl = `https://codeforces.com/api/user.info?handles=${user};`;

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
      <div className="m-auto flex item-center justify-center">
        <input
          onChange={(e) => setInputUser(e.target.value)}
          type="text"
          placeholder="enter your codeforces handle"
          className="sm:w-[300px] lg:w-[300px] h=5  my-3 input  bg-gray-300 text-center rounded-md"
        />
        <button
          className="btn btn-sm  ml-8 mt-3  btn-primary"
          onClick={() => {
            getUser(inputUser);
          }}
        >
          submit
        </button>
      </div>
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
