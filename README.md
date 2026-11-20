# Flota de vehículos de transporte de carga con MongoDB

Tarea 4 – Almacenamiento y Consultas de Datos en Big Data · Curso Big Data (202016911) 
Autor: Diego Armando Pérez Avellaneda

## Caso de uso

Base de datos documental para controlar los viajes de una flota de transporte de carga: vehículos, conductores y viajes. Cada viaje guarda una lista variable de novedades (demoras, lluvia, pinchazos) dentro del mismo documento.

## Base de datos `flota_vehiculos`

| Colección | Documentos | Campos |
|---|---|---|
| vehiculos | 21 | placa, marca, modelo, tipo, capacidad_ton, estado, combustible |
| conductores | 15 | cedula, nombre, licencia, anios_experiencia, telefono |
| viajes | 121 | placa, conductor_id, fecha, origen, destino, km, toneladas, consumo_galones, costo_peaje, novedades |

Los datos son simulados con fines académicos.

## Archivos

| Archivo | Contenido |
|---|---|
| `cargar_datos.js` | Crea la base de datos e inserta 20 vehículos, 15 conductores y 120 viajes |
| `consultas.js` | Inserción, selección, actualización, eliminación, filtros, `$lookup` y agregaciones |

## Ejecución

Requiere MongoDB 8.0 y mongosh (probado en Ubuntu 22.04).

```
mongosh cargar_datos.js
mongosh consultas.js
```

También se pueden ejecutar las consultas una por una dentro de `mongosh` después de `use flota_vehiculos`.

## Nota

El código se desarrolló con apoyo de una herramienta de inteligencia artificial (Claude) y fue ejecutado, probado y analizado por el autor.
