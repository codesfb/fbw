// A função mestre que explicamos anteriormente
function e(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    const { style, events, ...props } = attrs;
    if (props) Object.assign(el, props);
    if (style) Object.assign(el.style, style);
    if (events) {
        for (const [name, handler] of Object.entries(events)) {
            el.addEventListener(name, handler);
        }
    }
    el.append(...children);
    return el;
}

// Estilos globais rápidos
Object.assign(document.body.style, {
    margin: '0',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f5f5f5',
    color: '#333'
});

// --- COMPONENTES ---

// 1. Header (Perfil + Menu + Login)
const Header = () => e('header', {
    style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        backgroundColor: 'white',
        //boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
},
    // Lado Esquerdo: Perfil
    e('div', { style: { display: 'flex', alignItems: 'center', gap: '15px' } },
        e('div', { style: { width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ddd' } }), // Placeholder avatar
        e('div', {}, 
            e('strong', { style: { display: 'block' } }, 'Meu Nome'),
            e('span', { style: { fontSize: '0.8em', color: '#666' } }, 'Software Developer')
        )
    ),
    // Centro: Menu
    e('nav', { style: { display: 'flex', gap: '20px', border: '1px solid #ccc', padding: '10px 20px', borderRadius: '8px' } },
        e('button', { className: 'menu-btn', innerText: 'Projects' }),
        e('button', { className: 'menu-btn', innerText: 'Contato' }),
        e('button', { className: 'menu-btn', innerText: 'Experiências' }),
        e('button', { className: 'menu-btn', innerText: 'Blog' }),
        e('button', { className: 'menu-btn', innerText: 'Sobre' })
    ),
    // Lado Direito: Login e Config
    e('div', { style: { display: 'flex', alignItems: 'center', gap: '15px' } },
        e('span', { style: { cursor: 'pointer' } }, '🤖 Login'),
        e('span', { style: { fontSize: '20px', cursor: 'pointer' } }, '⚙️')
    )
);

// 2. Grid de Projetos (Conteúdo Principal)
const ProjectGrid = () => {
    const projects = ['Extension App', 'Menu', 'Plugins', 'Extra'];
    return e('main', {
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

// 3. Footer (Redes Sociais Discretas)
const Footer = () => e('footer', {
    style: {
        padding: '30px',
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        marginTop: '50px'
    }
},
    e('div', { style: { display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.9em' } },
        e('a', { href: '#', innerText: 'LinkedIn', style: { color: '#666', textDecoration: 'none' } }),
        e('a', { href: '#', innerText: 'Instagram', style: { color: '#666', textDecoration: 'none' } }),
        e('a', { href: '#', innerText: 'YouTube', style: { color: '#666', textDecoration: 'none' } }),
        e('a', { href: '#', innerText: 'GitHub', style: { color: '#666', textDecoration: 'none' } })
    )
);

// --- MONTAGEM DA PÁGINA ---

const app = e('div', { id: 'app' },
    Header(),
    ProjectGrid(),
    Footer(),
    // Botão de Notificações flutuante como no seu desenho
    e('div', {
        innerText: 'Notificações',
        style: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            border: '2px solid black',
            padding: '10px 20px',
            backgroundColor: 'white'
        }
    })
);

document.body.append(app);