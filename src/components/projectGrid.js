import { e } from '../utils/dom.js';

export const projectGrid = () => {
    const projects = ['Extension App'];
    return e('main',{ 
        style: {
            padding: '50px',
            textAlign: 'left'
        }
    },
        e('h2', { style: { marginBottom: '30px' } }, 'Meus Projetos'),
        e('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px'
            }
        },
        ...projects.map(name => e('div', {
            className : 'project-card',
            style: {
                height: '250px',
                width:'180px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '8px'
            }
        }, name))
        )
    );
};
