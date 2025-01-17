
    import { useState } from "react";

    const Stadium = () => {
        const [selectedSector, setSelectedSector] = useState(null);
        const [selectedSeats, setSelectedSeats] = useState([]);

        const sectors = [
            { id: 1, name: "Сектор 1", position: { bottom: "27%", left: "4%", width: "15%", height: "20%" } },
            { id: 2, name: "Сектор 2", position: { top: "27%", left: "4%", width: "15%", height: "20%" } },
            { id: 3, name: "Сектор 3", position: { top: "7%", left: "19%", width: "18%", height: "15%" } },
            { id: 4, name: "Сектор 4", position: { top: "7%", left: "40%", width: "18%", height: "15%" } },
            { id: 5, name: "Сектор 5", position: { top: "7%", left: "62%", width: "18%", height: "15%" } },
            { id: 6, name: "Сектор 6", position: { top: "26%", right: "4%", width: "15%", height: "20%" } },
            { id: 7, name: "Сектор 7", position: { bottom: "27%", right: "4%", width: "15%", height: "20%" } },
            { id: 8, name: "Фан-зона 1", position: { bottom: "7%", left: "28%", width: "20%", height: "15%" } },
            { id: 9, name: "Фан-зона 2", position: { bottom: "7%", left: "50%", width: "20%", height: "15%" } },
        ];

        const seats = Array.from({ length: 6 }, (_, rowIndex) =>
            Array.from({ length: 10 }, (_, seatIndex) => ({
                row: rowIndex + 1,
                seat: seatIndex + 1,
            }))
        );

        const handleSectorClick = (sectorId) => {
            setSelectedSector(sectorId);
            setSelectedSeats([]); // Очистити вибір при переході до нового сектору
        };

        const handleSeatClick = (seat) => {
            console.log(seat);
            setSelectedSeats((prev) =>
                prev.some((s) => s.row === seat.row && s.seat === seat.seat)
                    ? prev.filter((s) => !(s.row === seat.row && s.seat === seat.seat))
                    : [...prev, seat]
            );
        };

        const handleBackToStadium = () => {
            setSelectedSector(null);
        };

        return (
            <div className="relative w-full h-[700px] bg-green-300 rounded-lg overflow-hidden">
                {!selectedSector ? (
                    <>
                        {/* Поле */}
                        <div className="absolute w-[60%] h-[50%] bg-green-700 border-4 border-white rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="absolute w-[10%] h-[10%] border-4 border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        {/* Сектори */}
                        {sectors.map((sector) => (
                            <div
                                key={sector.id}
                                className="absolute bg-gray-400 text-white font-bold text-center flex items-center justify-center cursor-pointer hover:bg-gray-500 transition rounded-xl"
                                style={{
                                    ...sector.position,
                                    margin: "5px", // Рівномірні відступи між секторами
                                }}
                                onClick={() => handleSectorClick(sector.id)}
                            >
                                {sector.name}
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="p-4">
                        <button
                            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            onClick={handleBackToStadium}
                        >
                            Назад до стадіону
                        </button>
                        <h2 className="text-lg font-bold mb-4 text-green-800">Сектор {selectedSector}</h2>
                        <div
                            className="grid gap-1"
                            style={{
                                gridTemplateColumns: "repeat(10, minmax(30px, 1fr))", // Фіксована ширина для великих десктопів
                                maxWidth: "600px", // Максимальна ширина сітки
                                margin: "0 auto", // Центрування сітки
                            }}
                        >
                            {seats.flat().map((seat, index) => (
                                <button
                                    key={index}
                                    className={`w-8 h-8 md:w-10 md:h-10 ${
                                        selectedSeats.some((s) => s.row === seat.row && s.seat === seat.seat)
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 hover:bg-blue-400"
                                    } rounded-sm text-xs flex items-center justify-center`}
                                    style={{
                                        fontSize: seat.seat >= 10 ? "0.7rem" : "1rem", // Зменшення шрифту для великих номерів
                                    }}
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    {seat.row}-{seat.seat}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">
                            <h3 className="text-md font-bold">Обрані місця:</h3>
                            <ul>
                                {selectedSeats.map((seat, index) => (
                                    <li key={index}>
                                        Ряд {seat.row}, Місце {seat.seat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    export default Stadium;

