import * as htmlToImage from "html-to-image";
import { useRef, useState } from "react";
const ProfileCard = (User) => {
  const user = User.user;
  const [bgColor, setbgColor] = useState("violet-200");
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
  return (
    <div className="w-[100vw] h-[100vh]" ref={cardRef}>
      <div
        className={`shadow-lg shadow-indigo-500/60 profile-card grid justify-center h-[450px] w-[400px] rounded-2xl mx-auto my-8  bg-${bgColor}`}
      >
        <div>
          <div className="w-[120px] border-solid m-auto  flex items-center jus my-4">
            <img className="bg-cover rounded-lg" src={user.avatar} alt="logo" />
          </div>
          <div className=" font-bold grid">
            <h3 className=" text-cyan-500">{user.tier}</h3>
            <div className="w-[300px] flex gap-3">
              <label className="mt-1.5">User Name :</label>
              <h1 className=" text-cyan-500 text-2xl">{user.username}</h1>
            </div>
            <div className="w-[300px] flex gap-3">
              <label>Contest Rating :</label>
              <h3 className=" text-cyan-500">{user.contestRating}</h3>
            </div>
            <div className="w-[300px] flex gap-3">
              <label>Max Rating :</label>
              <h3 className=" text-cyan-500">{user.maxrating}</h3>
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
  );
};

export default ProfileCard;
