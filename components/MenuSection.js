// components/MenuSection.js

export default function MenuSection({ items = [] }) {

    const fallbackMenu = [
        { id: 1, title: "Cocktail Exotique", price: "6€", desc: "Rhum, ananas, sirop maison" },
        { id: 2, title: "Virgin Paradise", price: "5€", desc: "Mocktail fruits tropicaux" },
        { id: 3, title: "Poke Bowl BDE", price: "8€", desc: "Base riz, mangue, saumon ou végé" },
        { id: 4, title: "Wrap Poulet Crunch", price: "6€", desc: "Wrap croustillant sauce maison" },
        { id: 5, title: "Assiette Apéro", price: "7€", desc: "Nachos, guacamole & tapas" },
        { id: 6, title: "Smoothie Energy", price: "4€", desc: "Banane, fraise, lait d’amande" }
    ];

    const menu = items.length > 0 ? items : fallbackMenu;

    return (
        <section id="menu" className="py-24 px-6 bg-gradient-to-b from-pink-700/20 to-orange-500/20">

            <h2 className="text-5xl font-extrabold text-center mb-12">Menu</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">

                {menu.map(item => (
                    <div
                        key={item.id}
                        className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl
                                   hover:scale-[1.03] transition-all text-white"
                    >

                        {/* Espace image */}
                        <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/30 transition">
                            <span className="text-3xl text-white/50">+</span>
                        </div>

                        {/* Infos du plat */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-semibold">{item.title}</h3>
                            <span className="text-lg font-bold bg-white/20 px-3 py-1 rounded-xl">
                                {item.price}
                            </span>
                        </div>

                        <p className="mt-4 text-white/80 text-sm">{item.desc}</p>
                    </div>
                ))}

            </div>
        </section>
    );
}