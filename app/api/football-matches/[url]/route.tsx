import connectDB from "../../../../config/database";
import Match from "../../../../models/Match";

// GET api/football-matches/:url
export const GET = async  (request, { params }) => {
    if (request.method !== "GET") {

        return new Response('Метод не дозволено', {
            status: 405
        });
    }

    try {
        await connectDB();

        const match = await Match.findOne({url: params.url});

        if (!match) {
            return new Response(
                'Футбольний матч не знайдено',
                {
                        status: 404
                },
            );
        }

        return new Response(JSON.stringify(match), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong' + error, {
            status: 500
        });
    }
}
