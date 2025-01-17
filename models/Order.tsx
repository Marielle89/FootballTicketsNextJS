import { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        matchId: {
            type: Schema.Types.ObjectId,
            ref: "Match",
            required: true
        },
        sectorId: {
            type: Number,
            required: true
        },
        seats: [
            {
                row: {
                    type: Number,
                    required: true
                },
                seat: {
                    type: Number,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "paid", "cancelled"],
            default: "pending"
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
);

const Order = models.Order || model('Order', OrderSchema);

export default Order;
