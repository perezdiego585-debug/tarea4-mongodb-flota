// Tarea 4 - Big Data UNAD - Diego Perez
// Carga de datos de prueba: base de datos flota_vehiculos
db = db.getSiblingDB("flota_vehiculos");
db.vehiculos.drop();
db.conductores.drop();
db.viajes.drop();

// 1. Coleccion vehiculos (20 documentos)
const marcas = ["Kenworth", "International", "Chevrolet", "Hino", "Freightliner"];
const tipos = ["volqueta", "tractomula", "camioneta"];
const capacidad = { volqueta: 17, tractomula: 34, camioneta: 1.5 };
const vehiculos = [];
for (let i = 1; i <= 20; i++) {
  const tipo = tipos[i % 3];
  vehiculos.push({
    placa: "TSK-" + (100 + i),
    marca: marcas[i % 5],
    modelo: 2015 + (i % 10),
    tipo: tipo,
    capacidad_ton: capacidad[tipo],
    estado: i % 7 === 0 ? "en taller" : "activo",
    combustible: tipo === "camioneta" ? "gasolina" : "diesel"
  });
}
db.vehiculos.insertMany(vehiculos);

// 2. Coleccion conductores (15 documentos)
const nombres = ["Carlos Ruiz", "Andres Gomez", "Luis Perez", "Jorge Diaz", "Mario Lopez",
  "Pedro Castro", "Julian Mora", "Oscar Rios", "Hernan Vega", "Fabio Salas",
  "Camilo Rojas", "Edwin Pardo", "Wilson Cano", "Rafael Ortiz", "Alberto Nunez"];
const conductores = [];
for (let i = 0; i < 15; i++) {
  conductores.push({
    cedula: String(1067100000 + i * 37),
    nombre: nombres[i],
    licencia: i % 3 === 0 ? "C2" : "C3",
    anios_experiencia: 2 + (i * 3) % 20,
    telefono: "31" + (20000000 + i * 1234567)
  });
}
db.conductores.insertMany(conductores);

// 3. Coleccion viajes (120 documentos)
const rutas = [
  { origen: "Puerto Libertador", destino: "Monteria", km: 128, peaje: 18500 },
  { origen: "Puerto Libertador", destino: "Planeta Rica", km: 75, peaje: 9200 },
  { origen: "Puerto Libertador", destino: "Sincelejo", km: 210, peaje: 27700 },
  { origen: "Montelibano", destino: "Cartagena", km: 360, peaje: 52300 },
  { origen: "Montelibano", destino: "Caucasia", km: 160, peaje: 12400 }
];
const posiblesNovedades = ["demora en bascula", "lluvia en via", "pinchazo",
  "via en mantenimiento", "reten policial", "espera en cargue"];
const viajes = [];
for (let i = 0; i < 120; i++) {
  const v = vehiculos[Math.floor(Math.random() * vehiculos.length)];
  const c = conductores[Math.floor(Math.random() * conductores.length)];
  const r = rutas[Math.floor(Math.random() * rutas.length)];
  const toneladas = Math.round(v.capacidad_ton * (0.8 + Math.random() * 0.2) * 100) / 100;
  const galonesPorKm = v.tipo === "tractomula" ? 0.12 : (v.tipo === "volqueta" ? 0.1 : 0.05);
  const novedades = posiblesNovedades.filter(() => Math.random() < 0.15);
  viajes.push({
    placa: v.placa,
    conductor_id: c.cedula,
    fecha: new Date(2026, 9, 1 + Math.floor(Math.random() * 50)),
    origen: r.origen,
    destino: r.destino,
    km: r.km,
    toneladas: toneladas,
    consumo_galones: Math.round(r.km * galonesPorKm * (0.9 + Math.random() * 0.2) * 10) / 10,
    costo_peaje: r.peaje,
    novedades: novedades
  });
}
db.viajes.insertMany(viajes);

print("Vehiculos cargados:   " + db.vehiculos.countDocuments());
print("Conductores cargados: " + db.conductores.countDocuments());
print("Viajes cargados:      " + db.viajes.countDocuments());
