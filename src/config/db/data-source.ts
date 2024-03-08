import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'RahulP@12345',
  database: 'check-migration',
  entities: ['dist/**/*.entity.js'],
  // migrations: ['dist/db/migrations/*.js'],
  synchronize: true,

};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
