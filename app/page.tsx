"use client";
import { useEffect, useState } from "react";
import WhyChooseUsPage, { WhyChooseUsProps } from "./component/WhyChooseUsPage";
import { getTitleWithFeatures } from "./services/strapiService";

export default function Home() {
  const [fetchData, setFetchData] = useState<WhyChooseUsProps[]>([]);

  // const data = await getTitleWithFeatures();

  useEffect(() => {
    getDataHandler();
  }, []);

  const getDataHandler = async () => {
    try {
      const data = await getTitleWithFeatures();
      if(data){
        setFetchData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="min-h-screen">
      <WhyChooseUsPage data={fetchData ? fetchData : []} />
    </main>
  );
}
