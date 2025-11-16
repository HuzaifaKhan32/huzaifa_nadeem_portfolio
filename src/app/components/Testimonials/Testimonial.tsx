import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  role: string;
  name: string;
  description: string;
};

function Testimonial({ image, role, name, description }: Props) {
  return (
    <div className="card flex flex-col gap-[33px] w-[270px] sm:min-w-[436px] px-[33px] py-[27px]">
      <div className="flex gap-2 items-center">
        <Image
          src={image}
          alt={`${name} profile picture`}
          width={38}
          height={28}
          className="rounded-full"
        />
      </div>
      <div>
        <p className="text-sm">{name}</p>
        <p className="text-sm text-[#777]">{role}</p>
      </div>
        <p className="text-xs sm:text-sm">{description}</p>
    </div>
  );
}

export default Testimonial;
