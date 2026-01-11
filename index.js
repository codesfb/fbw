function e(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    const { style, events, ...props } = attrs;
    if (props) Object.assign(el, props);
    if (style) Object.assign(el.style, style);
    if (events) {
        for (const [name, handler] of Object.entries(events)) {
            el.addEventListener(name, handler)

        }
    }
    el.append(...children);
    return el;
}


const Header = () => e("header", {
    style: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        backgroundColor: 'white',
        //boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
},

    // Lado Esquerdo:
    e('div', {className:'profile', style: { display: 'flex', alignItems: 'center', gap: '15px' } },
        e('img', { border: "2px solid #000000", src: "img/fabio.jpg", style: { width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ddd',objectFit:'cover',objectPosition:'center' } }),
        e('div', {},
            e('strong', { style: { display: 'block' } }, 'Fabio Santana'),
            e('span', { style: { fontSize: '0.8em', color: '#666' } }, 'Software Developer')
        )
    ),


    // Centro: Menu
    e('nav', {
        className:"menu",
        style: {
            display: 'flex',
            gap: '20px',
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1",
            padding: '10px 20px',
            borderRadius: '8px',
            height: "50px",
            
            
        }
    },
        e('button', { className: 'menu-btn', innerText: 'Projects' }),
        e('button', { className: 'menu-btn', innerText: 'Contato' }),
        e('button', { className: 'menu-btn', innerText: 'Experiências' }),
        e('button', { className: 'menu-btn', innerText: 'Blog' }),
        e('button', { className: 'menu-btn', innerText: 'Sobre' })
    ),



    // Lado Direito: Login e Config
    e('div', {style: { display: 'flex', alignItems: 'center', gap: '15px' } },
        e('span', { style: { cursor: 'pointer' } }, '🤖 Login'),
        e('span', { style: { fontSize: '20px', cursor: 'pointer' } }, '⚙️')
    )
);




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
    //ProjectGrid(),
    Footer(),


);



document.body.append(app);