import { Schema, model, models } from 'mongoose';

const StadiumSchema = new Schema(
    {
        stadiumId: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        sectors: [
            {
                sectorId: {
                    type: Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                rows: [
                    {
                        rowNumber: {
                            type: Number,
                            required: true
                        },
                        seats: [
                            {
                                seatNumber: {
                                    type: Number,
                                    required: true
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    }
);

const Stadium = models.Stadium || model('Stadium', StadiumSchema);

export default Stadium;
