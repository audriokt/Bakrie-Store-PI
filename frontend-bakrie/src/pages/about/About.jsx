import React from "react"
import InView from "../../core/InView"
import { aboutData } from "./AboutPage"

const About = () => {
  return (
    <div className="min-h-[800px] mt-40 flex flex-col items-center space-y-12">

      <InView>
        <img
          src={aboutData.image}
          alt="about-cafe"
          className="w-[80%] md:w-[60%] rounded-xl shadow-lg"
        />
      </InView>

      <InView>
        <p className="text-center text-lg text-gray-700 max-w-3xl leading-relaxed">
          {aboutData.description}
        </p>
      </InView>

      <InView
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-600 max-w-4xl leading-relaxed">
          {aboutData.details}
        </p>
      </InView>

    </div>
  )
}

export default About
