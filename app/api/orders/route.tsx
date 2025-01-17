import connectDB from "../../../config/database";
import Match from "../../../models/Match";
import Order from "../../../models/Order";

// GET api/football-matches
export const POST = async  (request) => {
    if ('POST' !== request.method) {
        return new Response("Метод не дозволений", {status: 405});
    }

    let {userId, matchId, sectorId, seats, totalPrice} = await request.json();

    if (!userId || !matchId || !sectorId || !seats || seats.length === 0 || !totalPrice) {
        return new Response("Некоректні дані", {status: 400});
    }

    sectorId = Number(sectorId);

    try {
        await connectDB();

        const match = await Match.findById(matchId);
        if (!match) {
            return new Response("Матч не знайдено", {status: 404});
        }

        const sector = match.sectors.find((s) => s.sectorId === sectorId);
        if (!sector) {
            return new Response("Некоректні дані1", {status: 400});
        }
        seats.forEach(({row, seat}) => {
            const rowData = sector.rows.find((r) => r.rowNumber === row);
      if (!rowData) {
        throw new Error(`Ряд ${row} у секторі ${sectorId} не знайдено`);
      }

      const seatData = rowData.seats.find((s) => s.seatNumber === seat);
      if (!seatData) {
        throw new Error(`Місце ${seat} у ряді ${row}, сектор ${sectorId} не знайдено`);
      }

      if (!seatData.available) {
        throw new Error(`Місце ${seat} у ряді ${row}, сектор ${sectorId} вже заброньовано`);
      }

      seatData.available = false; // Робимо місце недоступним
        });

        await match.save();

        const newOrder = new Order({
            userId,
            matchId,
            sectorId,
            seats,
            totalPrice,
        });

        await newOrder.save();

        return new Response(JSON.stringify({message: "Замовлення успішно створено", orderId: newOrder._id}), {
            status: 201,
            headers: {"Content-Type": "application/json"},
        });
    } catch (error) {
        console.error("Помилка обробки замовлення:", error);
        return new Response("Something Went Wrong: " + error.message, {status: 500});
    }
}
