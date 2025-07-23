import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/animation/loading.json";
const Loading = () => {
  return (
    <div>
        <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  )
};

export default Loading;
