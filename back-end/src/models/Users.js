import database from "../config/database.js";

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

const createTable = async () => {
  await database.db.query(createUsersTable);
  database.db.end();
}

export default createTable();

// export default database.db.query(createUsersTable, (err, results, fields) => {
//   if (err) {
//     console.error('Error creating table:', err.message);
//     return;
//   }
//   console.log('Users table created or already exists.');
//   database.db.end();
// });

