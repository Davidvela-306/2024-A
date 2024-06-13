//importar app
import app from "./server.js";
import connection from './database.js';

connection()

// Utilizar el método listen
app.listen(app.get("port"), () => {
  console.log(`Server ok on http://localhost:${app.get("port")}`);
});
