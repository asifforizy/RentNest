import app from "./app";
import config from "./config";
import "dotenv/config";

const PORT = config.port;

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);

    process.exit(1);
  }
}

main();
