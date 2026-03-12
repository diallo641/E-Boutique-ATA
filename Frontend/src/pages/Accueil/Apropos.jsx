import { Link } from "react-router-dom";
import Headers from "../../composants/Headers";
import Footer from "../../composants/Pieds";
function Apropos() {
  return (
    <div>
      <Headers />
       {/* Bannière / titre */}
      <section className="bg-blue-200 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">À propos de notre boutique</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Découvrez notre histoire, nos valeurs et notre engagement pour vous offrir les meilleurs produits et services.
        </p>
      </section>
      {/* Notre histoire */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Notre histoire</h2>
        <p className="text-gray-700 mb-4">
          Fondée en 2023, notre boutique s’est donnée pour mission de proposer des produits de qualité à des prix abordables. 
          Notre équipe travaille chaque jour pour sélectionner les meilleurs articles et vous offrir une expérience d’achat agréable.
        </p>
        <p className="text-gray-700">
          Nous croyons en la satisfaction client, en la transparence et en l’innovation. Grâce à nos partenaires fiables, nous garantissons une livraison rapide et un service client réactif.
        </p>
      </section>
      {/* Nos valeurs */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Qualité</h3>
            <p className="text-gray-700">Nous sélectionnons les meilleurs produits pour vous garantir satisfaction et durabilité.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Confiance</h3>
            <p className="text-gray-700">Nous privilégions la transparence et un service client à l’écoute de vos besoins.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-700">Nous cherchons constamment à améliorer votre expérience d’achat et à proposer de nouvelles solutions.</p>
          </div>
        </div>
      </section>
      {/* Section contact rapide */}
      <section className="py-16 px-6 bg-blue-200 text-center">
        <h2 className="text-3xl font-bold mb-4">Besoin d’aide ?</h2>
        <p className="text-gray-700 mb-6">Contactez notre équipe pour toute question sur nos produits ou services.</p>
        <Link
          to="/Contact"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 inline-block"
        >
          Contacter le support
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Apropos;
