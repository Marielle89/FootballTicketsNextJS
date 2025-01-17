import ArticleCard from "../../components/ArticleCard";
import { fetchFootballMatches } from "../../utils/requests";


export const metadata = {
    title: 'Football matches2',
    description: 'Football matches',
    keywords: 'Football matches',
};

const articles = [
    {
        image: "",
        title: "Де купити квитки на футбол?",
        url: "where-buy-tickets"
    },
    {
        image: "",
        title: "Історія Динамо Київ",
        url: "history-of-dynamo-kyiv"
    },
    {
        image: "",
        title: "Топ 10 українських футболистів",
        url: "top-10-ukrainian-football-players"
    },
    {
        image: "",
        title: "Як стати успішним футболістом?",
        url: "how-to-train-like-a-pro-footballer"
    },
    {
        image: "",
        title: "Найкращі матсі в історії премʼєр іги",
        url: "best-matches-in-champions-league-history"
    },
    {
        image: "",
        title: "Видатні українські футболісти",
        url: "rise-of-young-ukrainian-football-talents"
    },
    {
        image: "",
        title: "Найвідоміши тренери в історії Динамо Київ",
        url: "famous-coaches-in-dynamo-kyiv-history"
    },
    {
        image: "",
        title: "Топ 5 футбольних стадіонів України",
        url: "top-5-ukrainian-football-stadiums"
    },
    {
        image: "",
        title: "Аналіз матчів Динамо Київ - Шахтар Донецьк",
        url: "analysis-dynamo-kyiv-vs-shakhtar"
    },
    {
        image: "",
        title: "Майбутнє українського футболу",
        url: "future-of-ukrainian-football"
    }
];

const FootballArticlesPage = async( params) => {
    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                { articles.length === 0 ? (
                    <p>No article found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <ArticleCard article={ article } />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default FootballArticlesPage;

