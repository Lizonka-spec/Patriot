import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', 
        menu: 'main-menu.html',
        game: 'game.html',
      },
    },
  },
});
