import '../styles/base.module.scss';
import '../styles/buttons.module.scss';
// import '../styles/startScreen.module.scss';

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.classList.remove('is-loading');
    }
});

