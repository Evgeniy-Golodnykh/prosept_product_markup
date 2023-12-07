import { useEffect } from "react";

function useOutsideClick(elementRef, handler, attached = true) {
  useEffect(() => {
    if(!attached) return;

    const handleClick = (e) => {
      if (!elementRef.current) return;
      if (!elementRef.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [elementRef, handler, attached]);
}

export default useOutsideClick;
