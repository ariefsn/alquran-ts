import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  dts: true, // Generate file (.d.ts)
  splitting: false,
  sourcemap: false,
  clean: true,
});