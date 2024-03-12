import { useEffect } from "react";

const useScrollStyle = (ref) => {
  useEffect(() => {
    const handleScroll = () => {
      //   const scrollPosition = ref.current.scrollTop + window.innerHeight / 2;
      const scrollPosition = ref.current.scrollTop;
      const items = ref.current.querySelectorAll(".list");

      let nearestItemIndex = 0;
      let nearestDistance = Infinity;

      items.forEach((item, index) => {
        const content = item?.querySelector(".content");

        if (content) {
          const itemTop = item.offsetTop + item.offsetHeight;
          const distance = Math.abs(itemTop - scrollPosition);

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestItemIndex = index;
          }
        }
      });

      // 가장 가까운 아이템과 그 아래에 있는 아이템들에 대해 스타일을 적용합니다.
      for (let i = nearestItemIndex; i < items.length; i++) {
        const item = items[i];
        const content = item.querySelector(".content");

        // 스크롤 위치가 100px 미만일 때 적용할 스타일
        if (content) {
          if (nearestDistance <= 1000) {
            // if (i === nearestItemIndex) {
            //   // 가장 가까운 아이템에 적용할 스타일
            //   content.style.maxWidth = "50px";
            //   content.style.padding = "8px 18px";
            //   content.style.color = "rgba(0, 0, 0, 0.4)";
            //   content.style.boxShadow =
            //     "1px 3px 7px 0.1px rgb(0, 0, 0, 0.6) inset";
            //   item.style.marginTop = "5px";
            // } else if (i === nearestItemIndex + 1) {
            //   // 가장 가까운 아이템의 다음 아이템에 적용할 스타일
            //   content.style.maxWidth = "25px";
            //   content.style.padding = "4px 12px";
            //   content.style.color = "rgba(0, 0, 0, 0.1)";
            //   content.style.boxShadow =
            //     "1px 3px 7px 0.1px rgb(0, 0, 0, 0.6) inset";
            //   item.style.marginTop = "3px";
            // } else {
            //   // 그 외의 아이템에 적용할 스타일
            //   content.style.maxWidth = "20px";
            //   content.style.padding = "0px 0px";
            //   content.style.color = "rgba(0, 0, 0, 0)";
            //   content.style.boxShadow =
            //     "1px 3px 7px 0.1px rgb(0, 0, 0, 0.6) inset";
            //   item.style.marginTop = "0px";
            // }
          }
          // 스크롤 위치가 100px 이상일 때 적용할 스타일
          else {
            content.style.color = "rgb(0, 0, 0)";
            content.style.maxWidth = "none";
          }
        }
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, [ref.current]);
};

export default useScrollStyle;
