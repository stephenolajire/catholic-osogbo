import DiscoverSection from "../components/home/DiscoverSection"
import DailyReading from "../components/home/DailyReading"
import DonateDiocese from "../components/home/DonateDiocese"
import Greeting from "../components/home/Greeting"
import HeroSection from "../components/home/Hero"
import RecentNews from "../components/home/RecentNews"
import RecentSermon from "../components/home/RecentSermon"
import UpcomingEvent from "../components/home/UpcomingEvent"


const Home = () => {
  return (
    <main>
      <section>
        <HeroSection/>
        <Greeting/>
        <DiscoverSection/>
        <RecentNews/>
        <UpcomingEvent/>
        <DailyReading/>
        <RecentSermon/>
        <DonateDiocese/>
      </section>
    </main>
  )
}

export default Home
