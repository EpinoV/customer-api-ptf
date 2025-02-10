import { readFile } from "fs/promises";
import { join } from "path";
import sequelize from './db.js';

const seedDatabase = async () => {
    try {
        console.log("🌱 Inicializando datos en la base de datos...");

        // Leer el archivo SQL
        const seedPath = join(process.cwd(), "config", "seed.sql");
        const sql = await readFile(seedPath, "utf-8");

        // Ejecutar el SQL con Sequelize
        await sequelize.query(sql);

        console.log("✅ Datos iniciales insertados exitosamente.");
    } catch (error) {
        console.error("❌ Error al inicializar datos:", error);
    }
};

export default seedDatabase;
