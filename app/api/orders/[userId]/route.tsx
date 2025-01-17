import connectDB from "../../../../config/database";
import Order from "../../../../models/Order";

// GET api/order/:userId
export const GET = async  (request, { params }) => {
    try {
        await connectDB();

        const userId = params.userId;
        if (!userId) {
            return new Response(
                'User ID is required',
                {
                    status: 400,
                }
            );
        }

        const orders = await Order.find({ userId }).populate("matchId").sort({ createdAt: -1 }).lean();

        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong' + error, {
            status: 500
        });
    }
}