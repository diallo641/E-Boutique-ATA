import Headers from "../../composants/Headers";
import Footer from "../../composants/Pieds";

function Contact() {
  return (
    <div>
      <Headers />

      {/* Bannière */}
      <section className="bg-blue-200 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Vous avez une question ou besoin d’assistance ? 
          Envoyez-nous un message et notre équipe vous répondra rapidement.
        </p>
      </section>

      {/* Formulaire de contact */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Envoyez-nous un message</h2>
        <form className="bg-white p-8 rounded shadow-md space-y-6">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              placeholder="Votre nom"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Votre message"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
          >
            Envoyer
          </button>
        </form>
      </section>

      {/* Informations de contact */}
      <section className="py-16 px-6 bg-gray-100 max-w-4xl mx-auto rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Nos coordonnées</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-bold mb-2">Adresse</h3>
            <p className="text-gray-700">123 Rue Exemple, Dakar, Sénégal</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Téléphone</h3>
            <p className="text-gray-700">+221 77 123 45 67</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-gray-700">contact@boutique.com</p>
          </div>
        </div>
      </section>

      {/* Carte Google Map */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Notre localisation</h2>
        <div className="w-full h-96 rounded overflow-hidden shadow">
          <iframe
            title="Localisation"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.263064569492!2d-17.44595228533364!3d14.699596889748215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173fcb6891d3d%3A0x9f6c3f2e4f9b8f3f!2sDakar%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2sus!4v1670000000000!5m2!1sfr!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;