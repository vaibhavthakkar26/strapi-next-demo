
import axios from "axios";
import { WhyChooseUsProps } from "../component/WhyChooseUsPage";

const API_URL = "http://192.168.1.8:1337/api";

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
  async (): Promise<WhyChooseUsProps | null> => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:1337/api/why-choose-uses?populate[Features][populate]=*"
      );
      // const response = await axios.get<StrapiResponse<TitleWithFeaturesData>>(
      //   `${API_URL}/why-choose-us`,
      // );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching title with features:", error);
      return null;
    }
  };
