import * as htmlToImage from "html-to-image";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "./UserContext";

const ProfileCard = (User) => {
  const user = User.user;
  const cardRef = useRef(null);
  const [imageUrl, setImageUrl] = useState();
  const handleDownloadImage = async () => {
    try {
      const imageDataUrl = await htmlToImage.toPng(cardRef.current, {
        backgroundColor: "white",
      });

      // Trigger download
      const link = document.createElement("a");
      link.href = imageDataUrl;
      link.download = "profile.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const Name = user.username;
  const firstName =
    user.tier == "legendary grandmaster" ? Name.substring(0, 1) : null;
  const lastName =
    user.tier == "legendary grandmaster"
      ? Name.substring(1, Name.length)
      : Name;
  const Color = user.tier.split(" ");
  const color = Color[Color.length - 1];
  console.log(color);
  return (
    <div className="w-100vh flex items-center justify-center h-100vh">
      <div className="w-[455px] h-[500px]" ref={cardRef}>
        <div
          className={`shadow-lg shadow-indigo-500/60 profile-card grid justify-center h-[450px] w-[400px] rounded-2xl violet-200 mx-auto my-8`}
        >
          <div>
            <div
              className={` w-[120px] border-solid m-auto  flex items-center jus my-4`}
            >
              <img
                className="bg-cover rounded-lg"
                src={user.avatar}
                alt="logo"
              />
            </div>
            <div className=" font-bold grid">
              <h3 className={`text-${color}`}>{user.tier}</h3>
              <div className={` w-[300px] flex gap-3`}>
                <label className="mt-1.5">User Name :</label>
                <div className="flex">
                  <p className="text-2xl">{firstName}</p>
                  <p className={`text-${color} text-2xl`}>{lastName}</p>
                </div>
              </div>
              <div className="w-[300px] flex gap-3">
                <label>Contest Rating :</label>
                <div className={`text-${color}`}>{user.contestRating}</div>
              </div>
              <div className={` w-[300px] flex gap-3`}>
                <label>Max Rating :</label>
                <h3 className={`text-${color}`}>{user.maxrating}</h3>
              </div>
              <div className="w-[300px] flex gap-3">
                <label>Contribution :</label>
                <h3>{user.contribution}</h3>
              </div>
              <div className="w-[300px] flex gap-3">
                <label>Friends Of :</label>
                <h3>{user.friendsOf}</h3>
              </div>
            </div>
          </div>
          <button
            className="btn btn-sm btn-primary  mx-6"
            onClick={handleDownloadImage}
          >
            Download
          </button>

          {imageUrl && (
            <button
              className="btn btn-sm btn-primary"
              onClick={handleDownloadImage}
            >
              <a href={imageUrl} download="profile.png">
                Download Image
              </a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
