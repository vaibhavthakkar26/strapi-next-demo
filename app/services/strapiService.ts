
import axios from "axios";
import { WhyChooseUsProps } from "../component/WhyChooseUsPage";


interface FeatureData {
  id: number;
  attributes: {
    title: string;
  };
}

export interface TitleWithFeaturesData {
  id: number;
  attributes: {
    title: string;
    subTitle: string;
    features: {
      data: FeatureData[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}


export const getTitleWithFeatures =
  async (): Promise<WhyChooseUsProps[] | null> => {
    try {
      const response = await axios.get(
        "https://strapi-next-backend-pw3p.onrender.com/api/why-choose-uses?populate[Features][populate]=*"
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching title with features:", error);
      return null;
    }
  };
