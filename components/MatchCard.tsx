import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaMapMarker } from 'react-icons/fa';

const MatchCard = ({ match }) => {
    const OrderItem = ({ date }) => {
        return (
            <span>
                Дата матчу:{" "}
                {new Intl.DateTimeFormat("uk-UA", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                }).format(new Date(date))}
            </span>
        );
    };


    return (
        <div className="rounded-xl shadow-md relative">
            <div
                className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
            >
                від 250 грн
            </div>

            <Image
                src={`/images/properties/${ match.image }`}
                alt=""
                sizes='100vw'
                width={0}
                height={0}
                className="w-full h-auto rounded-t-xl"
            />

            <div className="p-4">
                <div className="text-left md:text-center lg:text-left mb-6">
                    {/*<div className="text-gray-600">{ property.type }</div>*/}
                    <h3 className="text-xl font-bold">{ match.homeTeam } - { match.awayTeam }</h3>
                </div>
                <div className="flex gap-4 text-gray-500 mb-4">
                    <p>
                        <FaCalendar className="inline mr-2"></FaCalendar>
                        <OrderItem date={ match.date } />
                    </p>
                </div>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                        <FaMapMarker className='text-orange-700 mt-1' />
                        <span className="text-orange-700"> Київ, Арена «Дніпро» </span>
                    </div>
                    <Link        href={`/football-matches/${match.url}`} //TODO: add cpu for every match
                                 className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Детальніше
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MatchCard;
