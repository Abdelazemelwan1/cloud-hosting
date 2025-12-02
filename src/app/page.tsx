import Hero from "./_componant/Home/Hero";
import WebHostingPlan from "./_componant/Home/WebHostingPlan";

export default function HomePage() {
  
  return (<>

    <section>
      <Hero />
      <h2 className="text-center mt-10 text-3xl font-bold">Choos Your Web Hosting Plan</h2>
      <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  </>)
}
