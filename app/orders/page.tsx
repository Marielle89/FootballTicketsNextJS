'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createOrder } from "../../utils/requests";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { redirect } from "next/navigation";

export default function OrderPage() {
    const searchParams = useSearchParams();
    const [seats, setSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [matchId, setMatchId] = useState(0);
    const [matchName, setMatchName] = useState('');
    const [sectorId, setSectorId] = useState(0);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cardHolderName: '',
        cardHolderSurname: '',
        cvv: ''
    });

    const [errors, setErrors] = useState({});
    const { data: session } = useSession();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "cardNumber") {
            let formattedValue = value.replace(/\s+/g, '');
            formattedValue = formattedValue.replace(/\D/g, '').slice(0, 16);
            formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
            setCardDetails({ ...cardDetails, [name]: formattedValue });
        } else {
            setCardDetails({ ...cardDetails, [name]: value });
        }
    };

    const validateFields = () => {
        let errors = {};
        if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardDetails.cardNumber)) {
            errors.cardNumber = "Номер картки має містити 16 цифр у форматі XXXX XXXX XXXX XXXX.";
        }

        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryDateRegex.test(cardDetails.expiryDate)) {
            errors.expiryDate = "Термін дії має бути у форматі MM/YY.";
        } else {
            const [month, year] = cardDetails.expiryDate.split("/").map(Number);
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear() % 100;
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                errors.expiryDate = "Термін дії картки минув.";
            }
        }

        if (!/^[a-zA-ZА-Яа-яЇїІіЄєҐґ]+$/.test(cardDetails.cardHolderName)) {
            errors.cardHolderName = "Ім'я має містити лише літери.";
        }
        if (!/^[a-zA-ZА-Яа-яЇїІіЄєҐґ]+$/.test(cardDetails.cardHolderSurname)) {
            errors.cardHolderSurname = "Прізвище має містити лише літери.";
        }

        if (!/^\d{3}$/.test(cardDetails.cvv)) {
            errors.cvv = "CVV має містити 3 цифри.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const createNewOrder = () => {
        if (!validateFields()) {
            return; // Якщо є помилки, не продовжуємо
        }

        const order = {
            userId: session.user.id,
            matchId: matchId,
            sectorId: sectorId,
            seats: seats,
            totalPrice: totalPrice,
        };
        createOrder(order);
        alert("Оплата успішна!");
        redirect('/profile');
    };

    useEffect(() => {
        const seatsParam = searchParams.get("seats");
        const totalPriceParam = searchParams.get("totalPrice");
        const matchId = searchParams.get("matchId");
        const matchName = searchParams.get("matchName");
        const sectorId = searchParams.get("sectorId");

        if (seatsParam) {
            setSeats(JSON.parse(seatsParam));
        }
        if (totalPriceParam) {
            setTotalPrice(Number(totalPriceParam));
        }
        if (matchId) {
            setMatchId(matchId);
        }
        if (matchName) {
            setMatchName(matchName);
        }
        if (sectorId) {
            setSectorId(sectorId);
        }
    }, [searchParams]);

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Ваше замовлення
                </h1>
                <div><h2 className="text-2xl text-center text-gray-800 mb-6">{matchName}</h2></div>
                <div className="overflow-auto max-h-64 mb-4">
                    <ul className="divide-y divide-gray-200">
                        {seats.map((seat, index) => (
                            <li key={index} className="py-2 flex justify-between items-center">
                                <div className="text-gray-700">
                                    <span className="font-medium">Ряд:</span> {seat.row},{" "}
                                    <span className="font-medium">Місце:</span> {seat.seat}
                                </div>
                                <div className="text-green-600 font-semibold">
                                    ₴{seat.price}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-semibold text-gray-800">
                        Загальна вартість:
                    </span>
                    <span className="text-xl font-bold text-green-600">
                        ₴{totalPrice}
                    </span>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Дані картки</h2>
                    {[
                        { label: "Номер картки", name: "cardNumber", type: "text", placeholder: "1234 5678 9012 3456" },
                        { label: "Ім'я власника", name: "cardHolderName", type: "text", placeholder: "Ім'я" },
                        { label: "Прізвище власника", name: "cardHolderSurname", type: "text", placeholder: "Прізвище" },
                        { label: "Термін дії (MM/YY)", name: "expiryDate", type: "text", placeholder: "MM/YY" },
                        { label: "CVV", name: "cvv", type: "password", placeholder: "123" }
                    ].map((field, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                name={field.name}
                                value={cardDetails[field.name]}
                                onChange={handleInputChange}
                                placeholder={field.placeholder}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                            {errors[field.name] && (
                                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={createNewOrder}
                    className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Оплатити
                </button>
            </div>
        </div>
    );
}
