import encode from "encoding-down";
import levelup from "levelup";
import leveldown from "leveldown";
import { createViewerServer } from "@pcan/leveldb-viewer";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(`Use ${process.argv[0]} ${process.argv[1]} /path/to/db`);
  process.exit(1);
}
const dbPath = args[0];
const port = parseInt(process.env.NODE_PORT) || 3000;

const db = levelup(
  encode(leveldown(dbPath), { keyEncoding: "buffer", valueEncoding: "json" }),
);

const server = createViewerServer(db);
console.info(`HTTP server listening at port ${port}`);
server.listen(port);

const signals = ["SIGINT", "SIGTERM", "SIGHUP"];
function signalHandler(signal) {
  console.info(`${signal} received, closing...`);
  server.close((err) => {
    if (err) {
      console.error("Error found while closing the server:", err);
      process.exit(10);
    }
    process.exit(0);
  });

  function forceHandler() {
    console.error("Exit signal recieved again, forcing exit...");
    process.exit(9);
  }
  signals.forEach((s) => process.on(s, forceHandler));
}
signals.forEach((s) => process.on(s, signalHandler));
