import { useEffect, useRef, useState } from "react";

const useHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);
  return [ref, isHovering];
};

export default useHover;
