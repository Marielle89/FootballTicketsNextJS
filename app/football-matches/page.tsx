import MatchCard from "../../components/MatchCard";
import { fetchFootballMatches } from "../../utils/requests";


export const metadata = {
    title: 'Football matches2',
    description: 'Football matches',
    keywords: 'Football matches',
};

const FootballMatchesPage = async() => {
    const matches = await fetchFootballMatches();
    matches.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                { matches.length === 0 ? (
                    <p>No properties found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {matches.map((match) => (
                            <MatchCard match={ match } />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default FootballMatchesPage;
