import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/animation/loading.json";
const Loading = ({ size }: { size?: string }) => {
  const getSize = () => {
    if (!size) {
      return {
        width: "fit-content",
        heigth: "fit-content",
      };
    }

    switch (size) {
      case "sm":
        return {
          height: "50px",
        };
      case "md":
        return {
          heigth: "100px",
        };
      case "lg":
        return {
          heigth: "150px",
        };
    }
  };

  return (
    <div>
      <Lottie style={getSize()} animationData={loadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
