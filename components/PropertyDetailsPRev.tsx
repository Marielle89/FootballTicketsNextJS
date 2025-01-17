import {
    FaBed,
    FaBath,
    FaRulerCombined,
    FaTimes,
    FaCheck,
    FaMapMarker
} from 'react-icons/fa';
import Stadium from "./Stadium";

const PropertyDetails = ({ match }) => {
    const stadiumData = [
        { id: 1, name: "Сектор 1", rows: 5, seatsPerRow: 10 },
        { id: 2, name: "Сектор 2", rows: 6, seatsPerRow: 8 },
        { id: 3, name: "Сектор 3", rows: 4, seatsPerRow: 12 },
        { id: 4, name: "Сектор 4", rows: 7, seatsPerRow: 9 },
        { id: 5, name: "Сектор 5", rows: 5, seatsPerRow: 10 },
        { id: 6, name: "Сектор 6", rows: 6, seatsPerRow: 8 },
    ];

    const handleSeatSelection = (seat) => {
        console.log("Обране місце:", seat);
        // Додаткові дії: наприклад, оновлення стану або запит до API
    };
    return (
        <main>
            <div
                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
                <div className="text-gray-500 mb-4">Премьєр ліга</div>
                <h1 className="text-3xl font-bold mb-4">Динамо - Чорноморець</h1>
                <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                    <FaMapMarker className="text-lg text-orange-700 mr-2"/>
                    <p className="text-orange-700">
                        Київ, стадіон Лобановського
                    </p>
                </div>

                <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                    Квитки
                </h3>
                <div className="flex flex-col md:flex-row justify-around">
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Nightly</div>
                        <div className="text-2xl font-bold">
                            <i className="fa fa-xmark text-red-700"></i>
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                    >
                        <div className="text-gray-500 mr-2 font-bold">Weekly</div>
                        <div className="text-2xl font-bold text-blue-500">$1,100</div>
                    </div>
                    <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">Monthly</div>
                        <div className="text-2xl font-bold text-blue-500">$4,200</div>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <Stadium stadiumData={stadiumData} onSeatSelect={handleSeatSelection}/>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-bold mb-6">Деталі</h3>
                <p className="text-gray-500 mb-4">

                    У суботу, 23 листопада, відбудеться матч 14-го туру VBET Ліги «Динамо» - «Чорноморець», який пройде
                    на домашньому стадіоні киян – «Динамо» ім. В. Лобановського. Початок зустрічі – 15:30.

                    Розпочато продаж квитків на майбутній матч. Ціна квитка, залежно від категорії, становитиме 300, 400
                    та 500 гривень.

                    ПРИДБАТИ КВИТОК

                    З міркувань безпеки кількість квитків у продажу обмежена.

                    Чекаємо вас на стадіоні «Динамо» ім. В. Лобановського!

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

export default PropertyDetails
