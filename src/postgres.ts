import { Client } from 'pg';
require('dotenv').config()


async function crearTabla(client: Client, nombreTabla1: string, nombreTabla2: string) {
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS `+ nombreTabla1 +` (
          uuid character varying(40) COLLATE pg_catalog."default" PRIMARY KEY,
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

      await client.query(`
        CREATE TABLE IF NOT EXISTS `+ nombreTabla2 +` (
          uuid character varying(40) COLLATE pg_catalog."default" PRIMARY KEY,
          uuid_`+ nombreTabla2 +` character varying(40) COLLATE pg_catalog."default" NOT NULL,
          bug int NOT NULL,
          vulnerabilities int NOT NULL,
          security_hotspots int NOT NULL,
          reviewed int NOT NULL,
          added_debt int NOT NULL,
          code_smells int NOT NULL,
          duplications_lines int NOT NULL,
          duplicated_blocks int NOT NULL,
          new_lines int NOT NULL,
          created_at timestamp without time zone,
          FOREIGN KEY (uuid) REFERENCES nombreTabla1(uuid)
        );
      `);
      console.log('La tabla ha sido creada correctamente.');
    } finally {
      client.end();
    }
  }


export async function main() {
    const client = new Client({
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
    });
    await client.connect();
    const nombreTabla1 = 'quality_analysis_by_PR';
    const nombreTabla2 = 'statistics_by_PR';
    try {
          await crearTabla(client, nombreTabla1, nombreTabla2);
        }catch (error) {
        console.error('Error en la aplicación:', error);
    } finally {
        await client.end();
    }
}

