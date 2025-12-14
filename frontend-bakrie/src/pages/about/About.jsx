import React from "react";
import InView from "../../core/InView";
import { aboutData } from "./AboutPage";

const About = () => {
    return (
        <div className="min-h-[800px] mt-40 flex flex-col items-center space-y-12">
            {aboutData.map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-6">
                    {/* Video */}
                    <InView>
                        <video
                            src={item.video}
                            className="w-[80%] md:w-[60%] rounded-xl shadow-lg"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </InView>

                    {/* Title */}
                    <InView>
                        <p className="text-center text-lg text-gray-700 max-w-3xl leading-relaxed">
                            {item.title}
                        </p>
                    </InView>

                    {/* Description */}
                    <InView
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-center text-gray-600 max-w-4xl leading-relaxed">
                            {item.desc}
                        </p>
                    </InView>
                </div>
            ))}
        </div>
    );
};

export default About;