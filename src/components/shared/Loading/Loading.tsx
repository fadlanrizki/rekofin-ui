import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/animation/loading.json";
const Loading = ({ size }: { size?: "sm" | "md" | "lg" }) => {
  const getSize = () => {
    if (!size) {
      return {
        width: "fit-content",
        heigth: "fit-content",
      };
    }

    let height = "0px";

    if (size === "sm") {
      height = "50px";
    } else if (size === "md") {
      height = "100px";
    } else if (size === "lg") {
      height = "150px";
    }
    return { height };
  };

  return (
    <div>
      <Lottie style={getSize()} animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
