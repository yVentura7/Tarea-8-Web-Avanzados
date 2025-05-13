const { connectDB } = require("./database");

async function insertarClientes(db) {
  const clientes = db.collection("clientes");

  const nuevosClientes = [
    { nombre: "Ana", correo: "ana@mail.com", edad: 25, ciudad: "Lima" },
    { nombre: "Luis", correo: "luis@mail.com", edad: 35, ciudad: "Bogotá" },
    { nombre: "Carlos", correo: "carlos@mail.com", edad: 42, ciudad: "Quito" },
    { nombre: "María", correo: "maria@mail.com", edad: 28, ciudad: "Lima" },
    { nombre: "José", correo: "jose@mail.com", edad: 55, ciudad: "Bogotá" },
  ];

  const resultado = await clientes.insertMany(nuevosClientes);
  console.log(`✅ Clientes insertados: ${resultado.insertedCount}`);
}

async function consultarClientesMayoresDe30(db) {
  const clientes = db.collection("clientes");

  const lista = await clientes
    .find({ edad: { $gt: 30 } }) 
    .project({ nombre: 1, correo: 1, _id: 0 }) 
    .toArray();

  console.log("📋 Clientes mayores de 30 años:");
  console.table(lista); // <- LA MAGIA DE LA TABLA
}

async function actualizarCiudadDeCliente(db) {
  const clientes = db.collection("clientes");

  const resultado = await clientes.updateOne(
    { nombre: "Ana" }, 
    { $set: { ciudad: "Arequipa" } }
  );

  console.log("🛠 Cliente actualizado:", resultado.modifiedCount);
}

async function actualizarClientesBogota(db) {
  const clientes = db.collection("clientes");

  const resultado = await clientes.updateMany(
    { ciudad: "Bogotá" },
    { $set: { ciudad: "Medellín" } }
  );

  console.log("🛠 Clientes de Bogotá actualizados:", resultado.modifiedCount);
}

async function eliminarClientePorNombre(db) {
  const clientes = db.collection("clientes");

  const resultado = await clientes.deleteOne({ nombre: "María" });

  console.log("🗑 Cliente eliminado:", resultado.deletedCount);
}

async function eliminarClientesDeCiudad(db) {
  const clientes = db.collection("clientes");

  const resultado = await clientes.deleteMany({ ciudad: "Quito" });

  console.log("🗑 Clientes de ciudad eliminados:", resultado.deletedCount);
}

async function leerClientes(db) {
  const clientes = db.collection("clientes");

  const lista = await clientes.find().toArray();
  console.log("📦 Lista completa de clientes:");
  console.table(lista);
}

async function main() {
  const db = await connectDB();
  if (!db) {
    console.error("❌ No se pudo conectar a la base de datos.");
    return;
  }

  await insertarClientes(db);
  await leerClientes(db);

  await consultarClientesMayoresDe30(db);

  await actualizarCiudadDeCliente(db);
  await actualizarClientesBogota(db);
  await leerClientes(db);

  await eliminarClientePorNombre(db);
  await eliminarClientesDeCiudad(db);
  await leerClientes(db);
}

main();
