"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface FeatureType {
  id: number;
  Title: string;
  Desc: string;
  image: { url: string };
}

export interface WhyChooseUsProps {
  id: number;
  documentId: string;
  Title: string;
  subTitle: string;
  desc: string;
  Features: FeatureType[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface WhyChooseUsPageProps {
  data: WhyChooseUsProps[] | null;
}

const WhyChooseUsPage = ({ data }: WhyChooseUsPageProps) => {
  console.log('data', data)
  const [activeFeatures, setActiveFeatures] = useState<Record<number, FeatureType>>({});
  
  const baseURl = "https://strapi-next-backend-pw3p.onrender.com";

  useEffect(() => {
    if (data && data.length > 0) {
      const initialActiveFeatures: Record<number, FeatureType> = {};
      
      data.forEach(item => {
        if (item.Features && item.Features.length > 0) {
          const validFeature = item.Features.find(feature => 
            feature.image && feature.image.url
          ) || item.Features[0];
          
          initialActiveFeatures[item.id] = validFeature;
        }
      });
      
      setActiveFeatures(initialActiveFeatures);
    }
  }, [data]);

  const setActiveFeatureForSection = (sectionId: number, feature: FeatureType) => {
    if (feature && feature.image && feature.image.url) {
      setActiveFeatures(prev => ({
        ...prev,
        [sectionId]: feature
      }));
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <h3 className="text-2xl font-medium mb-2">No data found</h3>
      </div>
    );
  }

  return (
    <section className="py-16 px-4">
      {data.map((item) => (
        <div key={item.id} className="mb-32">
          <div className="container mx-auto text-center mb-12">
            <h3 className="text-2xl font-medium mb-2">{item.Title}</h3>
            <h2 className="text-4xl font-bold mb-4">{item.subTitle}</h2>
            <p className="text-lg">{item.desc}</p>
          </div>

          <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-1 flex items-center justify-center relative w-[400px] h-[250px] md:w-[520px] md:h-[280px]">
              {activeFeatures[item.id] && activeFeatures[item.id]?.image?.url && (
                <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg z-10">
                  <Image
                    src={`${baseURl}${activeFeatures[item.id].image.url}`}
                    alt={activeFeatures[item.id].Title || "Feature image"}
                    width={250}
                    height={250}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <div className="absolute left-[30px] w-64 h-64 bg-[#954860] bg-opacity-90 rounded-full shadow-lg flex flex-col justify-center items-center text-center text-white p-6 z-20">
                <h3 className="text-2xl font-bold mb-2">{activeFeatures[item.id]?.Title}</h3>
                <p className="text-base">{activeFeatures[item.id]?.Desc}</p>
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full max-w-md">
              {item.Features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeatureForSection(item.id, feature)}
                  className={`w-full flex justify-between items-center py-3 px-5 rounded-full transition-all ${
                    activeFeatures[item.id]?.id === feature.id
                      ? "bg-[#954860] text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  <span className="text-xl font-semibold">{feature.Title}</span>
                  <span>&lt;</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default WhyChooseUsPage;