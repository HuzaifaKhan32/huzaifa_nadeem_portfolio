import React from "react";
import SectionContainer from "../Section/SectionContainer";
import SectionHeader from "../Section/SectionHeader";
import testimonials from "@/app/data/testimonial.json";
import Testimonial from "./Testimonial";

function Testimonials() {
  return (
    <SectionContainer id="Testimonials">
      {/* SectionHeader stays unaffected */}
      <SectionHeader
        plainText="📢 Check out some"
        highlightText="Testimonials"
      />

      {/* Outer wrapper hides overflow */}
      <div className="w-full overflow-x-hidden px-4">
        {/* Inner wrapper scrolls horizontally */}
        <div className="flex gap-5 animate-scroll min-w-[200%]">
          {[...testimonials, ...testimonials].map((testimonial, id) => (
            <Testimonial
              key={id}
              image={testimonial.image}
              name={testimonial.name}
              role={testimonial.role}
              description={testimonial.description}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

export default Testimonials;
