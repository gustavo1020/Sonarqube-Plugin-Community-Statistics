import { Client } from 'pg';
require('dotenv').config()

async function verificaExistenciaTabla(client: Client, nombreTabla: string): Promise<boolean> {
    try {
      const result = await client.query(
        `SELECT EXISTS (
          SELECT 1
          FROM quality_analysis_for_PR.tables
          WHERE table_schema = 'public'
          AND table_name = $1
        ) as "exists"`,
        [nombreTabla]
      );
      console.log(result.rows[0].exists)
      return result.rows[0].exists;
    }catch{
        client.end();
        return false;
    }
}

async function crearTabla(client: Client, nombreTabla: string) {
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS `+ nombreTabla +` (
          uuid character varying(40) COLLATE pg_catalog."default" NOT NULL,
          uuid_analysis character varying(40) COLLATE pg_catalog."default" NOT NULL,
          uuid_proyect character varying(40) COLLATE pg_catalog."default" NOT NULL,
          "user" character varying(200) COLLATE pg_catalog."default" NOT NULL,
          branch character varying(200) COLLATE pg_catalog."default" NOT NULL,
          pull_request_number int NOT NULL,
          pull_request_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
          commits_amount int NOT NULL,
          quality_avg_number int NOT NULL,
          quality__number int NOT NULL,
          quality_avg character varying(200) COLLATE pg_catalog."default" NOT NULL,
          quality character varying(200) COLLATE pg_catalog."default" NOT NULL,
          team character varying(200) COLLATE pg_catalog."default" NOT NULL,
          issue boolean NOT NULL,
          created_at timestamp without time zone
        );
      `);
      console.log('La tabla ha sido creada correctamente.');
    } finally {
      client.end();
    }
  }


async function main() {
    const client = new Client({
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
    });
    await client.connect();
    const nombreTabla = 'quality_analysis_for_PR';

    try {
        const existe = await verificaExistenciaTabla(client, nombreTabla);
        if (!existe) {
            await crearTabla(client, nombreTabla);
        }
    } catch (error) {
        console.error('Error en la aplicación:', error);
    } finally {
        await client.end();
    }
}
main();