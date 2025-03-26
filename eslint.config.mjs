import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
      rules: {
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-explicit-any": "off", 
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/rules-of-hooks": "off", // For checking rules of hooks
      "react-hooks/exhaustive-deps": "off", // For checking hook dependencies 
      "prefer-const": "off", 
      "no-var": "off",
      "@typescript-eslint/no-unsafe-function-type" : "off",
    },
  }
];

export default eslintConfig;
