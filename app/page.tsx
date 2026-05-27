"use client";
import { useState } from "react";



import {
  Car,
  ShieldCheck,
  Clock3,
  MapPin,
  Calendar,
  Users,
  Luggage,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LoadScript,
  Autocomplete,
} from "@react-google-maps/api";


const libraries: ("places")[] = ["places"];
export default function Home()

 {const [nombre, setNombre] = useState("");
const [email, setEmail] = useState("");
const [destino, setDestino] = useState("");
const [pasajeros, setPasajeros] = useState("1");
const [fecha, setFecha] = useState("");
const [equipaje, setEquipaje] = useState("1 maleta");
const [autocomplete, setAutocomplete] = useState<any>(null);
const precios: any = {
  Santiago: 50000,
  "Viña del Mar": 140000,
  Valparaiso: 140000,
  "Valle Nevado": 180000,
};

const [loading, setLoading] = useState(false);
const destinoLower = destino.toLowerCase();

const precioFinal =
  destinoLower.includes("santiago")
    ? 50000
    : destinoLower.includes("viña")
    ? 140000
    : destinoLower.includes("valparaiso")
    ? 140000
    : destinoLower.includes("valle nevado")
    ? 180000
    : 0;


const enviarFormulario = async () => {

  if (!nombre || !email || !destino || !fecha) {
    alert("Completa todos los campos");
    return;
  }

  setLoading(true);

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      email,
      destino,
      fecha,
      pasajeros,
      equipaje,
    }),
  });

  const data = await response.json();

  setLoading(false);

  if (data.success) {

    const mensaje = `Hola, quiero reservar un traslado:

Destino: ${destino}
Fecha: ${fecha}
Pasajeros: ${pasajeros}
Equipaje: ${equipaje}

Mi nombre es ${nombre}`;

    window.open(
      `https://wa.me/56993236009?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );

  } else {
    alert("Error enviando reserva");
  }
};
  return (
    <main className="bg-white text-gray-900">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border border-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-yellow-500 font-bold">P</span>
            </div>

            <h1 className="text-2xl font-bold text-white">
              Pata<span className="text-yellow-500">ra</span>
            </h1>
          </div>

          <nav className="hidden md:flex gap-8 text-white">
            <a href="#">Inicio</a>
            <a href="#">Destinos</a>
            <a href="#">Servicios</a>
            <a href="#">Contacto</a>
          </nav>

          <button
  onClick={enviarFormulario}
  disabled={loading}
  className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-400 text-black font-bold py-5 rounded-xl text-lg transition"
>
  {loading ? "Enviando..." : "Ver precios y continuar"}
</button>
        </div>
      </header>

      {/* HERO */}
      <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
  className="relative min-h-screen overflow-hidden pb-20"
>

        {/* FONDO */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENIDO */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20 grid lg:grid-cols-2 gap-12 items-center">

          {/* TEXTO */}
          <div>
            <h2 className="text-6xl font-bold text-white leading-tight">
              Traslados premium
              <span className="block text-yellow-500">
                en Chile
              </span>
            </h2>

            <p className="text-white/80 text-xl mt-6 max-w-xl">
              Viaja cómodo, seguro y puntual desde el Aeropuerto
              de Santiago hacia cualquier destino del país.
            </p>

            {/* ICONOS */}
            <div className="flex flex-wrap gap-10 mt-12">

              <div className="text-white">
                <Car className="w-10 h-10 text-yellow-500 mb-3" />
                <p className="font-semibold">Camionetas premium</p>
              </div>

              <div className="text-white">
                <Clock3 className="w-10 h-10 text-yellow-500 mb-3" />
                <p className="font-semibold">Puntualidad garantizada</p>
              </div>

              <div className="text-white">
                <ShieldCheck className="w-10 h-10 text-yellow-500 mb-3" />
                <p className="font-semibold">Viajes seguros</p>
              </div>

            </div>
          </div>

          {/* FORMULARIO */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">

            <h3 className="text-3xl font-bold mb-8">
              Reserva tu traslado
            </h3>

            <div className="space-y-5">

    <div>
  <label className="text-sm font-medium">
    Destino
  </label>

  <div className="mt-2 border rounded-xl px-4 py-4 flex items-center gap-3">
    <MapPin className="w-5 h-5 text-gray-400" />

    <LoadScript
  googleMapsApiKey={
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  }
  libraries={libraries}
>
  <Autocomplete
    onLoad={(auto) => setAutocomplete(auto)}
    onPlaceChanged={() => {
      if (autocomplete) {
        const place = autocomplete.getPlace();

        setDestino(
          place.formatted_address || ""
        );
      }
    }}
  >
    <input
      type="text"
      placeholder="Ingresa destino"
      value={destino}
      onChange={(e) => setDestino(e.target.value)}
      className="w-full p-5 rounded-2xl bg-white border border-gray-300 text-black"
    />
  </Autocomplete>
</LoadScript>
  </div>
</div>          

 
  

  

              <div className="grid grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium">
      Fecha
    </label>

    <input
      type="date"
      value={fecha}
      onChange={(e) => setFecha(e.target.value)}
      className="mt-2 w-full border rounded-xl px-4 py-4"
    />
  </div>

  <div>
    <label className="text-sm font-medium">
      Pasajeros
    </label>

    <select
      value={pasajeros}
      onChange={(e) => setPasajeros(e.target.value)}
      className="mt-2 w-full border rounded-xl px-4 py-4"
    >
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
    </select>
  </div>

</div>

<div>
  <label className="text-sm font-medium">
    Equipaje
  </label>

  <select
    value={equipaje}
    onChange={(e) => setEquipaje(e.target.value)}
    className="mt-2 w-full border rounded-xl px-4 py-4"
  >
    <option>1 maleta</option>
    <option>2 maletas</option>
    <option>3 maletas</option>
    <option>Equipaje extra</option>
  </select>
</div>

<div className="bg-white rounded-2xl p-6 border border-gray-300 shadow-lg">
  <p className="text-gray-500">
    Precio estimado
  </p>

  <h4 className="text-4xl font-black text-yellow-400 mt-2">
    {precioFinal > 0
      ? `$${precioFinal.toLocaleString("es-CL")}`
      : "Selecciona un destino"}
  </h4>
</div>

              <button
  onClick={enviarFormulario}
    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-5 rounded-xl text-lg transition"
>
  Ver precios y continuar
</button>


            </div>
          </div>

        </div>
      </motion.section>

      {/* DESTINOS */}
      <section className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold">
              Destinos populares
            </h3>

            <p className="text-gray-500 mt-4 text-lg">
              Desde Santiago a los mejores destinos de Chile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* CARD */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-black/10 hover:scale-105 hover:shadow-2xl transition duration-300 bg-white">

              <img
                src="/images/valle-nevado.jpg"
            
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h4 className="text-2xl font-bold">
                  Valle Nevado
                </h4>

                <p className="text-gray-500 mt-2">
                   $140.000
                </p>
              </div>
            </div>

            {/* CARD */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-black/10 hover:scale-105 hover:shadow-2xl transition duration-300 bg-white">

              <img
                src="/images/vina.jpg"
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h4 className="text-2xl font-bold">
                  Viña del Mar
                </h4>

                <p className="text-gray-500 mt-2">
                   $140.000
                </p>
              </div>
            </div>


            {/* CARD */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-black/10 hover:scale-105 hover:shadow-2xl transition duration-300 bg-white">

              <img
                src="/images/valpo.jpg"
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h4 className="text-2xl font-bold">
                  Valparaiso
                </h4>

                <p className="text-gray-500 mt-2">
                   $140.000
                </p>
              </div>
            </div>

            {/* CARD */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-black/10 hover:scale-105 hover:shadow-2xl transition duration-300 bg-white">

              <img
                src="/images/santiago.jpg"
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h4 className="text-2xl font-bold">
                  Santiago
                </h4>

                <p className="text-gray-500 mt-2">
                  $50.000
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

<section className="py-28 px-8 bg-black text-white">

  <div className="max-w-3xl mx-auto">

    <h3 className="text-5xl font-black text-center mb-14">
      Reserva tu viaje
    </h3>

    <div className="space-y-6">

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700"
      />

      <input
        type="text"
        placeholder="Destino"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700"
      />

      <button
        onClick={enviarFormulario}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-5 rounded-2xl text-xl"
      >
        Reservar ahora
      </button>
      <a
  href="https://wa.me/569932360009"
  target="_blank"
  className="w-full block text-center bg-green-500 hover:bg-green-400 text-white font-bold py-5 rounded-2xl text-xl transition"
>
  WhatsApp
</a>

    </div>
  </div>
</section>
    </main>
  );
}
