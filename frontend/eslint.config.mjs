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
      "@typescript-eslint/no-explicit-any": "off", // Disable rule for any type
      "@typescript-eslint/no-unused-vars": "off", // Disable unused vars rule
      "@next/next/no-img-element": "off", // Disable Next.js Image component requirement
      "jsx-a11y/alt-text": "off", // Disable alt-text rule for <img> elements
      "react/no-unescaped-entities": "off", // Disable unescaped entities warning
      "react-hooks/exhaustive-deps": "off", // Disable exhaustive deps rule for useEffect
    },
  },
];

export default eslintConfig;
