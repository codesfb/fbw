import { e } from '../utils/dom.js';
export const workingPage = () => {
    return e('div', {
        className:'conatiner-working-page', 

        style: { 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '60vh' 
        } 
    }, 
    e('p', {  style: { color: '#666' } }, "Trabalhando por aqui ainda..."),

        e('lottie-player', {
            src: './img/Update cogs, loading.json', 
            background: 'transparent',
            speed: '1',
            style: { width: '200px', height: '200px' },
            loop: true,
            autoplay: true
        })
        
    );
};