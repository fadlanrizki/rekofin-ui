import { useState, useCallback } from "react";

export const useTogglePassword = () => {
  const [visible, setVisible] = useState(false);
  const toggle = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const inputType = visible ? "text" : "password";
  return { visible, toggle, inputType };
};
