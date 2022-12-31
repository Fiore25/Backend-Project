import app from "./api.js";
import { createAdminUser } from "./libs/createUser.js";
import './db/database.js'

async function main() {
  await createAdminUser();
  app.listen(app.get("port"));

  console.log("Server on port", app.get("port"));
}

main();