import WhyChooseUsPage from "./component/WhyChooseUsPage";
import { getTitleWithFeatures } from "./services/strapiService";

export default async function Home() {
  const data = await getTitleWithFeatures();
  return (
    <main className="min-h-screen">
  
    <WhyChooseUsPage data={data ? data : []} />
    </main>
  );
}