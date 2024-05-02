import { useContext, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import UserContext from "./components/UserContext";
import Start from "./components/Start";
import HandlenotFound from "./components/HandlenotFound";
const rederColor = () => {
  <>
    <p className="bg-newbie text-newbie"></p>
    <p className="bg-pupil text-pupil"></p>
    <p className="bg-specialist text-specialist"></p>
    <p className="bg-expert text-expert"></p>
    <p className="bg-candidate text-candidate"></p>
    <p className="bg-master text-master"></p>
    <p className="bg-grandmaster text-grandmaster"></p>
    <p className=" bg-unrated text-unrated"></p>
  </>;
};
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
  $(document).ready(
      document.getElementById("Input").addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("Button").click();
    }
  }); 
       
);
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
          id="Button"
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
