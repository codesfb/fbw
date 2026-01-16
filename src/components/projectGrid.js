import { e } from '../utils/dom.js';

export const projectGrid = () => {
    // Dados dos projetos
    const projects = [
        {
            id: 1,
            name: 'Extension App',
            info: 'Uma extensão para produtividade no Chrome.',
            techs: ['JS', 'CSS', 'HTML'],
            img: 'img/AppMenuForBrowsers.png',
            links: { github: '#', demo: '#' }
        }
    ];

    return e('div', {
        className: 'container-project-card',
        style: { padding: '50px', textAlign: 'left' }
    },
        e('h2', { style: { marginBottom: '30px', color: 'var(--text)' } }, 'Meus Projetos'),
        e('div', {
            style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', // Responsivo
                gap: '25px'
            }
        },
        ...projects.map(proj => e('div', {
            className: 'project-card',
            style: {
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow)',
                transition: 'transform 0.3s ease'
            }
        },
            // Imagem do Projeto
            e('div', { style: { height: '140px', backgroundColor: '#333' } },
                e('img', { src: proj.img, style: { width: '100%', height: '100%', objectFit: 'cover' } })
            ),
            
            // Conteúdo do Card
            e('div', { style: { padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px' } },
                e('strong', { style: { color: 'var(--text)' } }, proj.name),
                e('p', { style: { fontSize: '0.8em', color: 'var(--sub-text)', margin: '0' } }, proj.info),
                
                // Tags de Tech
                e('div', { style: { display: 'flex', gap: '5px' } },
                    ...proj.techs.map(t => e('span', { 
                        style: { fontSize: '0.65em', background: 'var(--accent)', color: 'white', padding: '2px 6px', borderRadius: '4px' } 
                    }, t))
                ),

                // Botão Ver Mais
                e('button', {
                    className: 'menu-btn',
                    style: { marginTop: '10px', padding: '8px', fontSize: '0.8em' },
                    onclick: () => abrirModal(proj) // Função que vamos criar
                }, 'Ver mais')
            )
        ))
        )
    );
};



function abrirModal(projeto) {
    const modalOverlay = e('div', {
        style: {
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            backdropFilter: 'blur(5px)'
        },
        onclick: (ev) => { if(ev.target === modalOverlay) modalOverlay.remove(); }
    },
        e('div', {
            style: {
                backgroundColor: 'var(--bg)', padding: '30px', borderRadius: '15px',
                width: '90%', maxWidth: '500px', color: 'var(--text)', position: 'relative'
            }
        },
            e('h2', {}, projeto.name),
            e('p', {}, 'Informações detalhadas sobre o projeto...'),
            e('div', { style: { display: 'flex', gap: '20px', marginTop: '20px' } },
                e('a', { href: projeto.links.github, target: '_blank', className: 'menu-btn' }, 'GitHub'),
                e('a', { href: projeto.links.demo, target: '_blank', className: 'menu-btn' }, 'Acessar App')
            ),
            e('button', { 
                style: { position: 'absolute', top: '10px', right: '15px', border: 'none', background: 'none', color: 'var(--text)', cursor: 'pointer' },
                onclick: () => modalOverlay.remove()
            }, 'X')
        )
    );

    document.body.append(modalOverlay);
}