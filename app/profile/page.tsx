'use client';

import Image from 'next/image';
import connectDB from "../../config/database";
import Property from "../../models/Property";
import { getSessionUser } from '../../utils/getSessionUser';
import profileDefault from '../../public/images/profile.png';
import ProfileProperties from '@/components/ProfileProperties';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { getOrders } from "../../utils/requests";
import { useEffect, useState } from "react";
import { useQRCode } from 'next-qrcode';

const ProfilePage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { Canvas } = useQRCode();
    const { data: session } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders(userId);
                setOrders(data);
            } catch (error) {
                console.error("Помилка при завантаженні замовлень:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    return (
        <section className="bg-blue-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="bg-white px-6 py-8 shadow-md rounded-md border">
                    <h1 className="text-3xl font-bold mb-6 text-center">Ваша сторінка</h1>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Блок профілю */}
                        <div className="lg:w-1/3 flex flex-col items-center lg:items-start">
                            <div className="mb-6">
                                <Image
                                    className="rounded-full"
                                    src={session?.user?.image || profileDefault}
                                    width={150}
                                    height={150}
                                    alt="User"
                                />
                            </div>
                            <h2 className="text-xl font-semibold mb-2">
                                <span className="font-bold block">Ім'я:</span> {session?.user?.name}
                            </h2>
                            <h2 className="text-xl font-semibold">
                                <span className="font-bold block">Email:</span> {session?.user?.email}
                            </h2>
                        </div>

                        {/* Блок замовлень */}
                        <div className="lg:w-2/3">
                            <h1 className="text-2xl font-bold mb-4">Ваші замовлення</h1>
                            {loading && <p>Завантаження...</p>}
                            {!loading && orders && orders.length === 0 && <p>У вас немає замовлень.</p>}
                            {!loading && orders && orders.length > 0 && (
                                <ul>
                                    {orders.map((order) => (
                                        <li
                                            key={order._id}
                                            className="border p-4 rounded mb-4 shadow-lg bg-white"
                                        >
                                            <p>
                                                <strong>Матч:</strong> {order.matchId.homeTeam} vs {order.matchId.awayTeam}
                                            </p>
                                            <p>
                                                <strong>Сектор:</strong> {order.sectorId}
                                            </p>
                                            <p>
                                                <strong>Місця:</strong>{" "}
                                                {order.seats.map((seat) => `Ряд ${seat.row}, Місце ${seat.seat}`).join("; ")}
                                            </p>
                                            <p>
                                                <strong>Загальна вартість:</strong> {order.totalPrice} грн
                                            </p>
                                            <p>
                                                <strong>Статус:</strong> {order.status}
                                            </p>
                                            <div className="mt-4">
                                                <strong>QR-коди:</strong>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                                    {order.seats.map((seat, index) => (
                                                        <div key={index} className="flex flex-col items-center">
                                                            <Canvas
                                                                text={`Квиток на матч: ${order.matchId.homeTeam} vs ${order.matchId.awayTeam}, Сектор: ${order.sectorId}, Ряд: ${seat.row}, Місце: ${seat.seat}`}
                                                                options={{
                                                                    errorCorrectionLevel: 'M',
                                                                    margin: 3,
                                                                    scale: 4,
                                                                    width: 150,
                                                                    color: {
                                                                        dark: '#010599FF',
                                                                        light: '#FFBF60FF',
                                                                    },
                                                                }}
                                                            />
                                                            <p className="text-sm mt-2">Ряд {seat.row}, Місце {seat.seat}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
