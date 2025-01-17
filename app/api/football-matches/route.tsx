import connectDB from "../../../config/database";
import Match from "../../../models/Match";

// GET api/football-matches
export const GET = async  (request) => {
    try {
        await connectDB();

        const matches = await Match.find({});

        return new Response(JSON.stringify(matches), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong' + error, {
            status: 500
        });
    }
}