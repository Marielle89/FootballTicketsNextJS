import properties from '../properties.json';
import MatchCard from './MatchCard';
import Link from 'next/link';
import { fetchFootballMatches } from "../utils/requests";

const HomeMatches = async () => {
    const matches = await fetchFootballMatches();
//matches.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const recentMatches = matches
        .sort(() => Math.random() - Math.random() )
        .slice(0, 3);


    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                        Афіша матчів у Києві
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {0 === recentMatches ? (
                            <p>No Properties Found</p>
                        ) : recentMatches.map((match) => (
                            <MatchCard match={match}/>
                        ))}
                    </div>
                </div>
            </section>
            <section className="m-auto max-w-lg my-10 px-6">
                <Link
                    href="/football-matches"
                    className="block bg-black text-white texr-center py-4 px-6 rounded-xl hover:bg-gray-700"
                >Показати ще</Link>
            </section>
        </>

    )
}

export default HomeMatches
