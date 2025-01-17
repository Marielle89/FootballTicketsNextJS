'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const Stadium = ({match}) => {


    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();
    const [isRouterReady, setIsRouterReady] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
        }
    }, [router.isReady]);

    const handleSectorClick = (sectorId) => {
        setSelectedSector(match.sectors.find((sector) => sector.sectorId === sectorId));
        setSelectedSeats([]);
        setTotalPrice(0);
    };

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.row === seat.row && s.seat === seat.seat);
      const newSeats = isSelected
        ? prev.filter((s) => !(s.row === seat.row && s.seat === seat.seat)) // Видаляємо, якщо вибрано
        : [...prev, seat]; // Додаємо, якщо ще не вибрано

      // Перерахунок загальної вартості
      const newTotalPrice = isSelected
        ? totalPrice - seat.price
        : totalPrice + seat.price;

      setTotalPrice(newTotalPrice);

      return newSeats;
    });
  };

    const handleBackToStadium = () => {
        setSelectedSector(null);
        setSelectedSeats([]);
        setTotalPrice(0);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`/api/matches/${match.matchId}/sectors/${selectedSector.sectorId}/seats`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    seats: selectedSeats.map((seat) => ({
                        rowNumber: seat.row,
                        seatNumber: seat.seat,
                        available: false,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error("Помилка оновлення місць");
            }

            const data = await response.json();
            handleBackToStadium();
        } catch (error) {
            console.error("Помилка збереження змін:", error);
        }
    };

    // const handleOrderSubmit = () => {
    //     if (selectedSeats.length > 0) {
    //        console.log(selectedSeats);
    //         router.push({
    //             pathname: "/orders",
    //             query: {
    //                 seats: JSON.stringify(selectedSeats),
    //                 totalPrice: totalPrice.toString(),
    //             },
    //         });
    //     }
    // };

    const handleOrderSubmit = () => {
        let matchName =  match.homeTeam + " - " + match.awayTeam;
        const queryString = `/orders?seats=${encodeURIComponent(
            JSON.stringify(selectedSeats)
        )}&totalPrice=${totalPrice}&matchId=${match._id}&matchName=${matchName}&sectorId=${selectedSector.sectorId}`;

        router.push(queryString);
    };

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

    function findPositionBySectorId(id) {
        return sectors.find((item) => item.id === id).position;
    }

    function findNameBySectorId(id) {
        return sectors.find((item) => item.id === id).name;
    }

    // if (!isRouterReady) {
    //     return <div>Завантаження...</div>; // Покажіть спіннер або інший індикатор
    // }

    return (
        <div className="relative w-full h-[700px] bg-green-300 rounded-lg overflow-hidden">
            {!selectedSector ? (
                <>
                    <div className="absolute w-[60%] h-[50%] bg-green-700 border-4 border-white rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute w-[10%] h-[10%] border-4 border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>

                    {match.sectors.map((sector) => (
                        <div
                            key={sector.sectorId}
                            className="absolute bg-gray-400 text-white font-bold text-center flex items-center justify-center cursor-pointer hover:bg-gray-500 transition rounded-xl"
                            style={{
                                ...findPositionBySectorId(sector.sectorId),
                                margin: "5px", // Рівномірні відступи між секторами
                            }}
                            onClick={() => handleSectorClick(sector.sectorId)}
                        >
                            {findNameBySectorId(sector.sectorId)}
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
                    <h2 className="text-lg font-bold mb-4 text-green-800">Сектор {selectedSector.name}</h2>
                    <div
                        className="grid gap-1"
                        style={{
                            gridTemplateColumns: `repeat(${selectedSector.rows[0].seats.length}, minmax(30px, 1fr))`,
                            maxWidth: "600px",
                            margin: "0 auto",
                        }}
                    >
                        {selectedSector.rows.flatMap((row) =>
                            row.seats.map((seat) => (
                                <button
                                    key={`${row.rowNumber}-${seat.seatNumber}`}
                                    className={`w-8 h-8 md:w-10 md:h-10 ${
                                        selectedSeats.some((s) => s.row === row.rowNumber && s.seat === seat.seatNumber)
                                            ? "bg-blue-500 text-white"
                                            : seat.available
                                                ? "bg-gray-200 hover:bg-blue-400"
                                                : "bg-red-400 cursor-not-allowed"
                                    } rounded-sm text-xs flex flex-col items-center justify-center`}
                                    onClick={() => seat.available && handleSeatClick({
                                        row: row.rowNumber,
                                        seat: seat.seatNumber,
                                        price: seat.price
                                    })}
                                    disabled={!seat.available}
                                >
                                      <p className="block text-sm font-bold">
                                        {row.rowNumber}-{seat.seatNumber}
                                      </p>
                                      {seat.available && (
                                          <p className="block text-xs font-medium text-blue-500">
                                              ₴{seat.price}
                                          </p>
                                      )}
                                </button>
                            ))
                        )}
                    </div>
                    <div className="mt-4">
                        <h3 className="text-md font-bold">Обрані місця:</h3>
                        <ul>
                            {selectedSeats.map((seat, index) => (
                                <li key={index}>
                                    Ряд {seat.row}, Місце {seat.seat} — ₴{seat.price}
                                </li>
                            ))}
                        </ul>
                        <h4 className="mt-2 text-lg font-bold">Загальна вартість: ₴{totalPrice}</h4>
                    </div>
                    {selectedSeats.length > 0 && (
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            onClick={handleOrderSubmit}
                        >
                            Оформити замовлення
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Stadium;
