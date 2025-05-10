import { defineConfig } from 'eslint';

export default defineConfig({
  rules: {
    'linebreak-style': ['error', 'unix'],  // ou 'windows' dependendo da sua necessidade
  },
});
