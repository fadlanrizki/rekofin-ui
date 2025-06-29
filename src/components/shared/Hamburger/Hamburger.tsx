"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

type PropsType = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
};

const Hamburger = (props: PropsType) => {
  const { isOpen } = props;
  return (
    <button className="cursor-pointer" onClick={props.onClick}>
      {isOpen ? <RxCross1 size={30} /> : <RxHamburgerMenu size={30} />}
    </button>
  );
};

export default Hamburger;
