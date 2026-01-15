import { e } from '../utils/dom.js';
export const workingPage = () => {
    return e('div', { 
        style: { 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '60vh' 
        } 
    }, 
    e('p', {  style: { color: '#666' } }, "Trabalhando por aqui ainda por favor espere um pouco.."),

        e('lottie-player', {
            src: './img/Update cogs, loading.json', 
            background: 'transparent',
            speed: '1',
            style: { width: '300px', height: '300px' },
            loop: true,
            autoplay: true
        })
        
    );
};