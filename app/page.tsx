import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InfoBoxes from '../components/InfoBoxes';
import HomeMatches from '../components/HomeMatches';
import connectDB from "../config/database";

export const metadata = {
    title: 'Home page',
    description: 'Home page',
    keywords: 'Home page',
};

const HomePage = async () => {
    await connectDB();
    return (
      <>
        <Hero />
        <InfoBoxes />
        <HomeMatches />
      </>
    );
}
export default HomePage;
// export default function Page() {
//     return (
//         <div>
//             <h1>Football Matches</h1>
//             <Link href="/football-matches">Show football matches</Link>
//         </div>
//     );
// }