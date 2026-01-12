import { e } from '../utils/dom.js';

export const projectGrid = () => {
    const projects = ['Extension App', 'Menu', 'Plugins', 'Extra'];
    return e('main',{ 
        style: {
            padding: '50px',
            textAlign: 'center'
        }
    },
        e('h2', { style: { marginBottom: '30px' } }, 'Conteúdo começando pelo portfólio (projects)'),
        e('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '20px'
            }
        },
        ...projects.map(name => e('div', {
            style: {
                height: '250px',
                border: '2px solid #333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '4px'
            }
        }, name))
        )
    );
};
