import { Neo4jConfig } from './neo4j-config.interface';
import neo4j, { Driver } from 'neo4j-driver';

// Creating driver configuration using Neo4jConfig
// Url string + authConfig (username, password)
export const createDriver = async (config: Neo4jConfig) => {
  const driver: Driver = neo4j.driver(
    `${config.scheme}://${config.host}:${config.port}`,
    neo4j.auth.basic(config.username, config.password),
  );

  // Verify the connection details or throw an Error
  await driver.getServerInfo();
  // If everything is OK, return the driver
  return driver;
};
