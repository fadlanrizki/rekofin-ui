import { RxHamburgerMenu } from "react-icons/rx";

type HamburgerType = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Hamburger = ({ onClick }: HamburgerType) => {
  return (
    <button className="cursor-pointer" onClick={onClick}>
      <RxHamburgerMenu size={30} />
    </button>
  );
};

export default Hamburger;
