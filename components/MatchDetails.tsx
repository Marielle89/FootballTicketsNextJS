import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaTimes,
    FaCheck,
    FaMapMarker
} from 'react-icons/fa';
import Stadium from "./Stadium";

const MatchDetails = ({ match }) => {
    return (
        <main>
            <div
                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
                <div className="text-gray-500 mb-4">Премьєр ліга</div>
                <h1 className="text-3xl font-bold mb-4">{ match.homeTeam } - { match.awayTeam }</h1>
                <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                    <FaMapMarker className="text-lg text-orange-700 mr-2"/>
                    <p className="text-orange-700">
                        Київ, Арена «Дніпро»
                    </p>
                </div>

                {/*<h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">*/}
                {/*    Квитки*/}
                {/*</h3>*/}
                {/*<div className="flex flex-col md:flex-row justify-around">*/}
                {/*    <div*/}
                {/*        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"*/}
                {/*    >*/}
                {/*        <div className="text-gray-500 mr-2 font-bold">Nightly</div>*/}
                {/*        <div className="text-2xl font-bold">*/}
                {/*            <i className="fa fa-xmark text-red-700"></i>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"*/}
                {/*    >*/}
                {/*        <div className="text-gray-500 mr-2 font-bold">Weekly</div>*/}
                {/*        <div className="text-2xl font-bold text-blue-500">$1,100</div>*/}
                {/*    </div>*/}
                {/*    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">*/}
                {/*        <div className="text-gray-500 mr-2 font-bold">Monthly</div>*/}
                {/*        <div className="text-2xl font-bold text-blue-500">$4,200</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="p-6">
                <Stadium match={match}/>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Деталі</h3>
                <p className="text-gray-500 mb-4">

                    Розпочато продаж квитків на майбутній матч. Ціна квитка, залежно від категорії, становитиме 250 та 500 гривень.

                    ПРИДБАТИ КВИТОК

                    З міркувань безпеки кількість квитків у продажу обмежена.

                    Укриття на випадок повітряної тривоги обладнане на території стадіону, під паркінгом. Воно має усе
                    необхідне – питну воду, санвузли тощо.
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div id="map"></div>
            </div>
        </main>
    )
}

export default MatchDetails
