import Image from "next/image";
import React from "react";

function TopBackground() {
  return (
    <>
      <div className="absolute w-full max-w-[360px] md:max-w-screen-lg h-[285px] md:h-[656px] top-[188px] -translate-x-1/2 left-1/2 md:top-11 z-10">
        <div className="w-full h-full relative">
          <div className="circle-icon top-0 left-[177px] md:top-28 md:left-72">
            <Image
              src={"/rocket_icon.svg"}
              alt="Rocket_icon"
              width={23}
              height={23}
            ></Image>
          </div>
          <div className="circle-icon top-[162px] left-5 md:top-64 md:left-0">
            <Image
              src={"/github_icon.svg"}
              alt="github_icon"
              width={23}
              height={23}
            ></Image>
          </div>
          <div className="circle-icon top-50 -left-[149px] md:top-[530px] md:left-44">
            <Image
              src={"/bracket_icon.svg"}
              alt="bracket_icon"
              width={23}
              height={23}
            ></Image>
          </div>
          <div className="hidden md:circle-icon md:top-[520px] md:left-[682px]">
            <Image
              src={"/electricity_icon.svg"}
              alt="electricity_icon"
              width={23}
              height={23}
            ></Image>
          </div>
          <div className="hidden md:circle-icon md:top-[158px] md:left-[606px]">
            <Image
              src={"/merge_icon.svg"}
              alt="merge-icon"
              width={23}
              height={23}
            ></Image>
          </div>
          <div className="hidden md:circle-icon md:top-[368px] md:left-[956px]">
            <Image
              src={"/stack_icon.svg"}
              alt="stack-icon"
              width={23}
              height={23}
            ></Image>
          </div>
        </div>
      </div>
      <Image
        src="/top_highlight.svg"
        alt="Top dark mode highlight"
        width={809}
        height={877}
        className="absolute top-[-515px] left-1/2 -translate-x-1/2 hidden dark:md:block"
      ></Image>

      <Image
        src="/top_highlight_mobile.svg"
        alt="Top dark mode highlight"
        width={429}
        height={465}
        className="absolute top-[-225px] left-1/2 -translate-x-1/2 dark:block dark:md:hidden"
      ></Image>
      <div className='absolute top-0 bg-repeat-x bg-[url("/top_bg_light.svg")] bg-[auto_auto] hidden dark:hidden md:block w-full h-[795px]'></div>
      <div className='absolute top-0 bg-repeat-x bg-[url("/top_bg_mobile_light.svg")] bg-[auto_auto] dark:hidden md:hidden w-full h-[600px]'></div>
      <div className='absolute top-0 bg-repeat-x bg-[url("/top_bg_dark.svg")] bg-[auto_auto] hidden dark:block dark:md:block w-full h-[795px]'></div>
      <div className='absolute top-0 bg-repeat-x bg-[url("/top_bg_mobile_dark.svg")] bg-[auto_auto] hidden dark:block dark:md:hidden w-full h-[600px]'></div>
    </>
  );
}

export default TopBackground;
