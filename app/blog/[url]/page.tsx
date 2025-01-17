import Image from 'next/image';

async function fetchArticle(url) {
    const articles = {
        'where-buy-tickets' : {
            title: "Де купити квитки на футбол у Києві – найкращі місця та поради",
            url: "where-buy-tickets",
            description: 'Хочете відвідати захопливий футбольний матч у Києві? Ми зібрали для вас список найзручніших способів купівлі квитків: офіційні сайти, каси стадіонів та перевірені онлайн-сервіси. Дізнайтеся, як безпечно купити квиток, щоб не пропустити гру улюбленої команди!',
            keywords: 'Хочете відвідати захопливий футбольний матч у Києві? Ми зібрали для вас список найзручніших способів купівлі квитків: офіційні сайти, каси стадіонів та перевірені онлайн-сервіси. Дізнайтеся, як безпечно купити квиток, щоб не пропустити гру улюбленої команди!',
        },
        'history-of-dynamo-kyiv' : {
            title: "Історія Динамо Київ",
            url: "history-of-dynamo-kyiv",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
        'top-10-ukrainian-football-players' : {
            title: "Топ 10 українських футболистів",
            url: "top-10-ukrainian-football-players",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
        'how-to-train-like-a-pro-footballer' : {
            title: "Як стати успішним футболістом?",
            url: "how-to-train-like-a-pro-footballer",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
        'best-matches-in-champions-league-history' : {
            title: "Найкращі матсі в історії премʼєр іги",
            url: "best-matches-in-champions-league-history",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
        'rise-of-young-ukrainian-football-talents' : {
            title: "Видатні українські футболісти",
            url: "rise-of-young-ukrainian-football-talents",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
        'famous-coaches-in-dynamo-kyiv-history' : {
            title: "Найвідоміши тренери в історії Динамо Київ",
            url: "famous-coaches-in-dynamo-kyiv-history",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
        'top-5-ukrainian-football-stadiums' : {
            title: "Топ 5 футбольних стадіонів України",
            url: "top-5-ukrainian-football-stadiums",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
        'analysis-dynamo-kyiv-vs-shakhtar' : {
            title: "Аналіз матчів Динамо Київ - Шахтар Донецьк",
            url: "analysis-dynamo-kyiv-vs-shakhtar",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
        'future-of-ukrainian-football' : {
            title: "Майбутнє українського футболу",
            url: "future-of-ukrainian-football",
            description: 'Майбутнє українського футболу',
            keywords: 'Майбутнє українського футболу',
        },
    };

    return articles[url] || null;
}

export async function generateMetadata({ params }) {
    const { url } = params;
    const article = await fetchArticle(url);

    if (article) {
        return {
            title: article.title,
            description: article.description,
            keywords: article.keywords,
        };
    }

    return {
        title: 'Dynamo Kyiv',
        description: 'Official website of Dynamo Kyiv football club.',
        keywords: 'dynamo kyiv, football, Ukraine',
    };
}

export default async function FootballMatchPage({params,}: {
    params: Promise<{ url: string }>
}) {
    const url = (await params).url
    if ('where-buy-tickets' !== url) {
        return <div>My Post: {url}</div>
    }

    return (
        <section className="bg-blue-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <article className="bg-white p-8 shadow-md rounded-md border">
                    <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
                        Де купити квитки на футбол?
                    </h1>

                    <p className="text-gray-500 text-sm text-center mb-6">
                        Опубліковано: 12 січня 2025 року
                    </p>

                    <div className="mb-6">
                        <Image
                            src="/images/properties/lab6.jpg"
                            alt="Футбольний матч"
                            width={800}
                            height={400}
                            className="rounded-lg mx-auto"
                        />
                    </div>

                    <div className="text-gray-700 leading-relaxed">
                        <p className="mb-4">
                            Футбол є одним із найпопулярніших видів спорту в Україні.
                            Раніше бажання побачити гру улюбленої команди наживо об’єднувала мільйони фанатів.
                            Але з початком повномасштабного вторгненя та запровадження заходів безпеків,
                            купівля квитків стала складним завданням через обмежену кількість місць.
                            У цій статті ми розглянемо, де сьогодні можна купити квитки на футбольні матчі.
                        </p>
                    </div>
                    <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                        Основні способи купівлі квитків
                    </h2>
                    <div className="text-gray-700 leading-relaxed">
                        <p className="mb-4">
                            Сьогодні існує декілька варіантів придбати квитки на футбол Київ:
                            <ul>
                                <li>Офіційні сайти клубів та стадіонів
                                    Найбільш надійний спосіб – придбати квиток безпосередньо на офіційному сайті
                                    футбольного клубу або стадіону. Зазвичай продаж квитків на гру відкривається за
                                    кілька тижнів до матчу. Щоб встигнути купити квиток, варто слідкувати за анонсами та
                                    зареєструватися на сайті клубу заздалегідь.
                                </li>
                                <li>Авторизовані квиткові сервіси
                                </li>
                                <li>Деякі платформи співпрацюють із клубами та стадіонами, отримуючи ліцензію на продаж
                                    квитків. Серед таких сервісів популярні Ticketmaster, StubHub та інші подібні
                                    ресурси. Вони пропонують квитки як на офіційні місця, так і перепродаж за правилами,
                                    встановленими клубом.
                                    Перепродаж квитків У випадку, коли квитки розпродані, завжди є можливість
                                    скористатися сервісами перепродажу. Однак тут важливо перевірити репутацію
                                    платформи. Популярні сервіси перепродажу зазвичай мають механізми захисту покупців
                                    від підробок
                                </li>
                            </ul>
                        </p>
                    </div>
                    <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                        Поради для безпечної купівлі квитків:
                    </h2>
                    <div className="text-gray-700 leading-relaxed">
                        <p className="mb-4">
                            Якщо ви вирішили купити квитки на футбол Київ, слід пам’ятати кілька важливих правил:
                            <ul>
                                <li>
                                    Перевіряйте офіційність джерела. Купуйте квитки лише на офіційних сайтах або авторизованих платформах.
                                </li>
                                <li>
                                    Уникайте приватних продавців у соціальних мережах. Дуже часто шахраї продають підроблені квитки,
                                    використовуючи фотографії справжніх документів.
                                </li>
                                <li>
                                    Слідкуйте за цінами. Якщо ціна на квиток значно нижча за ринкову – це привід насторожитися.
                                </li>
                                <li>
                                    Користуйтеся тільки захищеними платіжними системами. Ніколи не надсилайте гроші напряму на карту незнайомих осіб.
                                </li>
                            </ul>
                        </p>
                    </div>
                </article>
            </div>
        </section>
    );
}

// 764753735385-en2o7ni65ngtr1bc78n5q6jsgofen4c9.apps.googleusercontent.com
// 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