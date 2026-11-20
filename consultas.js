// Tarea 4 - Big Data UNAD - Diego Armando Perez Avellaneda
// Consultas sobre la base de datos flota_vehiculos (MongoDB 8.0)
// Ejecutar despues de cargar_datos.js:  mongosh consultas.js
db = db.getSiblingDB("flota_vehiculos");

// 1. INSERCION
printjson(db.vehiculos.insertOne({placa: "TSK-121", marca: "Volvo", modelo: 2024, tipo: "tractomula", capacidad_ton: 34, estado: "activo", combustible: "diesel"}));
printjson(db.viajes.insertMany([
  {placa: "TSK-121", conductor_id: "1067100000", fecha: new Date("2026-11-19"), origen: "Puerto Libertador", destino: "Monteria", km: 128, toneladas: 33.1, consumo_galones: 15.2, costo_peaje: 18500, novedades: ["lluvia en via"]},
  {placa: "TSK-121", conductor_id: "1067100037", fecha: new Date("2026-11-20"), origen: "Montelibano", destino: "Cartagena", km: 360, toneladas: 32.4, consumo_galones: 43.0, costo_peaje: 52300, novedades: []}
]));

// 2. SELECCION
printjson(db.vehiculos.find({tipo: "volqueta"}).toArray());
printjson(db.conductores.find({}, {_id: 0, nombre: 1, licencia: 1, anios_experiencia: 1}).toArray());

// 3. ACTUALIZACION
printjson(db.vehiculos.updateOne({placa: "TSK-121"}, {$set: {estado: "en taller"}}));
printjson(db.vehiculos.find({placa: "TSK-121"}).toArray());
printjson(db.conductores.updateMany({licencia: "C2"}, {$inc: {anios_experiencia: 1}}));

// 4. ELIMINACION
printjson(db.viajes.deleteOne({placa: "TSK-121", destino: "Cartagena"}));
print("Total de viajes: " + db.viajes.countDocuments());

// 5. FILTROS Y OPERADORES
printjson(db.viajes.find({km: {$gt: 100}, toneladas: {$gt: 30}}, {_id: 0, placa: 1, destino: 1, km: 1, toneladas: 1}).toArray());
printjson(db.viajes.find({destino: {$in: ["Cartagena", "Sincelejo"]}}, {_id: 0, placa: 1, destino: 1, fecha: 1}).sort({fecha: -1}).limit(5).toArray());
printjson(db.viajes.find({novedades: "pinchazo"}, {_id: 0, placa: 1, fecha: 1, novedades: 1}).toArray());
printjson(db.vehiculos.find({$or: [{estado: "en taller"}, {modelo: {$lt: 2018}}]}, {_id: 0, placa: 1, estado: 1, modelo: 1}).toArray());

// 6. UNIONES ENTRE COLECCIONES ($lookup)
printjson(db.viajes.aggregate([{$lookup: {from: "vehiculos", localField: "placa", foreignField: "placa", as: "vehiculo"}}, {$unwind: "$vehiculo"}, {$project: {_id: 0, placa: 1, destino: 1, toneladas: 1, marca: "$vehiculo.marca", tipo: "$vehiculo.tipo"}}, {$limit: 5}]).toArray());
printjson(db.viajes.aggregate([{$lookup: {from: "conductores", localField: "conductor_id", foreignField: "cedula", as: "conductor"}}, {$unwind: "$conductor"}, {$project: {_id: 0, placa: 1, destino: 1, conductor: "$conductor.nombre"}}, {$limit: 5}]).toArray());

// 7. AGREGACIONES: contar, sumar y promediar
printjson(db.viajes.aggregate([{$group: {_id: "$destino", total_viajes: {$sum: 1}}}, {$sort: {total_viajes: -1}}]).toArray());
printjson(db.viajes.aggregate([{$group: {_id: "$placa", toneladas_totales: {$sum: "$toneladas"}, km_totales: {$sum: "$km"}}}, {$sort: {toneladas_totales: -1}}, {$limit: 5}]).toArray());
printjson(db.viajes.aggregate([{$lookup: {from: "vehiculos", localField: "placa", foreignField: "placa", as: "v"}}, {$unwind: "$v"}, {$group: {_id: "$v.tipo", consumo_promedio: {$avg: "$consumo_galones"}, toneladas_promedio: {$avg: "$toneladas"}}}, {$project: {consumo_promedio: {$round: ["$consumo_promedio", 1]}, toneladas_promedio: {$round: ["$toneladas_promedio", 1]}}}]).toArray());
