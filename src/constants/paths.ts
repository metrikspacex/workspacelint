import { dirname } from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __root = cwd();

export { __dirname, __filename, __root };
