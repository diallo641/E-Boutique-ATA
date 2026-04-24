import { Link } from "react-router-dom";
import Headers from "../../composants/Headers";
import Footer from "../../composants/Pieds";

function Apropos() {
  return (
    <div>
      <Headers />

      {/* Bannière */}
      <section className="bg-blue-200 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">À propos de notre boutique</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Découvrez notre histoire, nos valeurs et notre engagement pour vous offrir les meilleurs produits et services.
        </p>
      </section>

      {/* Histoire */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Notre histoire</h2>
        <p className="text-gray-700 mb-4">
          Fondée en 2023, notre boutique s’est donnée pour mission de proposer des produits de qualité à des prix abordables.
        </p>
        <p className="text-gray-700">
          Nous croyons en la satisfaction client, la transparence et l’innovation.
        </p>
      </section>

      {/* Valeurs */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos valeurs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Qualité</h3>
            <p className="text-gray-700">Produits sélectionnés avec soin.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Confiance</h3>
            <p className="text-gray-700">Relation client transparente.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-700">Amélioration continue du service.</p>
          </div>
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="py-16 px-6">

        <h2 className="text-3xl font-bold text-center mb-2">
          Notre équipe
        </h2>

        <p className="text-center text-white bg-blue-600 py-3 rounded mb-10 max-w-3xl mx-auto">
          Une équipe africaine engagée pour une expérience client exceptionnelle
        </p>

        {/* Direction */}
        <h3 className="text-xl font-bold mb-6 text-blue-700 text-center">
          Direction
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">

          <div className="bg-white p-6 rounded shadow text-center">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="font-bold">Mamadou Diallo</h3>
            <p>Fondateur & CEO</p>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="font-bold">Aïssata Diarra</h3>
            <p>Directrice Générale</p>
          </div>

        </div>

        {/* Management */}
        <h3 className="text-xl font-bold mb-6 text-blue-700 text-center">
          Management
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {[
            {
              name: "Oumar Ba",
              role: "Responsable Marketing",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Fatou Ndiaye",
              role: "Responsable Technique",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Ibrahim Sow",
              role: "Responsable Logistique",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
          ].map((m, i) => (
            <div key={i} className="bg-white p-6 rounded shadow text-center">
              <img
                src={m.img}
                className="w-28 h-28 rounded-full mx-auto mb-3 object-cover"
              />
              <h3 className="font-bold">{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}

        </div>

        {/* Opérationnel */}
        <h3 className="text-xl font-bold mb-6 text-blue-700 text-center">
          Équipe opérationnelle
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {[
            { name: "Khadija Ba", role: "Service client", gender: "women", id: 12 },
            { name: "Ousmane Sy", role: "Vente", gender: "men", id: 33 },
            { name: "Mariama Sow", role: "Comptabilité", gender: "women", id: 55 },
            { name: "Cheikh Diop", role: "Support technique", gender: "men", id: 22 },
            { name: "Awa Camara", role: "Communication", gender: "women", id: 66 },
            { name: "Boubacar Keita", role: "RH", gender: "men", id: 18 },
            { name: "Ndeye Fall", role: "Gestion commandes", gender: "women", id: 41 },
            { name: "Alioune Sow", role: "Maintenance site", gender: "men", id: 50 },
          ].map((m, i) => (
            <div key={i} className="bg-white p-4 rounded shadow text-center">
              <img
                src={`https://randomuser.me/api/portraits/${m.gender}/${m.id}.jpg`}
                className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
              />
              <h4 className="font-semibold">{m.name}</h4>
              <p className="text-sm text-gray-600">{m.role}</p>
            </div>
          ))}

        </div>

      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-blue-200 text-center">
        <h2 className="text-3xl font-bold mb-4">Besoin d’aide ?</h2>
        <p className="mb-6">
          Contactez notre équipe pour toute question.
        </p>

        <Link
          to="/Contact"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Contacter le support
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default Apropos;