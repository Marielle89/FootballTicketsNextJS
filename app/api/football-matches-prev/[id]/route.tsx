import connectDB from "../../../../config/database";
import Property from "../../../../models/Property";

// GET api/football-matches/:id
export const GET = async  (request, { params }) => {
    try {
        await connectDB();

        const property = await Property.findById(params.id);
        if (!property) {
            return new Response(
                'Футбольний матч не знайдено',
                {
                        status: 404
                },
            );
        }

        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong' + error, {
            status: 500
        });
    }
}