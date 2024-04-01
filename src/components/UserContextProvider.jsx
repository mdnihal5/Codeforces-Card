import React from "react";
import UserContext from "./UserContext";
const UserContextProvider = ({ children }) => {
  const [Theme, setTheme] = React.useState(1);
  const [user, setUser] = React.useState(null);
  const [Data, setData] = React.useState(null);
  const [color, setColor] = React.useState("black");
  const [handleFound, sethandleFound] = React.useState(0);
  const [inputUser, setInputUser] = React.useState("");
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        Theme,
        setTheme,
        Data,
        setData,
        handleFound,
        sethandleFound,
        color,
        setColor,
        inputUser,
        setInputUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
