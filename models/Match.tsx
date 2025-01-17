import { Schema, model, models } from 'mongoose';

const MatchSchema = new Schema(
    {
        matchId: {
            type: Number,
            required: true,
            unique: true
        },
        stadiumId: {
            type: Number,
            required: true
        },
        url: {
            type: String,
            required: true,
            unique: true,
        },
        homeTeam: {
            type: String,
            required: true
        },
        awayTeam: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        sectors: [
            {
                sectorId: {
                    type: Number,
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
                                price: {
                                    type: Number,
                                    required: true
                                },
                                available: {
                                    type: Boolean,
                                    default: true
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    }
);

const Match = models.Match || model('Match', MatchSchema);

export default Match;
