import { useState } from "react";

export default function OrderModal({ isOpen, onClose, itemName }) {
    const [formData, setFormData] = useState({
        fullName: "",
        quantity: 1,
        address: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/sendOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itemName,
                ...formData,
            }),
        });

        if (response.ok) {
            alert("Votre commande a bien été envoyée !");
            onClose();
        } else {
            alert("Une erreur est survenue.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">
                    Commander : {itemName}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block font-medium mb-1">Nom & Prénom</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-black placeholder-gray-400"
                            placeholder="Nom & Prénom"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-black placeholder-gray-400"
                            placeholder="Adresse email"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Quantité</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            required
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-black placeholder-gray-400"
                            placeholder="Quantité"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Adresse postale</label>
                        <textarea
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 text-black placeholder-gray-400"
                            rows="3"
                            placeholder="Adresse postale"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                    >
                        Valider la commande
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="w-full mt-4 text-gray-600 underline text-sm"
                >
                    Annuler
                </button>
            </div>
        </div>
    );
}