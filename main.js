import { e } from './src/utils/dom.js';
import { projectGrid } from './src/components/projectGrid.js';
import { workingPage } from './src/components/waitingPage.js';




function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.classList.add(savedTheme);
}

const Header = () => e("header", {
    style: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        // backgroundColor: 'white',

    }
},

    // Lado Esquerdo:
    e('div', { className: 'profile', style: { display: 'flex', alignItems: 'center', gap: '15px' } },
        e('img', { border: "2px solid #000000", src: "img/fabio.jpg", style: { width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ddd', objectFit: 'cover', objectPosition: 'center' } }),
        e('div', {},
            e('strong', { style: { display: 'block' } }, 'Fabio Santana'),
            e('span', { style: { fontSize: '0.8em', color: '#666' } }, 'Software Developer')
        )
    ),


    // Centro: Menu
    e('nav', {
        className: "menu",
        style: {
            display: 'flex',
            gap: '20px',
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1",
            padding: '10px 20px',
            borderRadius: '8px',
            height: "45px",


        }
    },
        e('button', {
            className: 'menu-btn', innerText: 'Projetos',
            onclick: () => {
                console.log('Clicou em Projetos!')
                builtContainer(projectGrid())
            }
        },),
        e('button', {
            className: 'menu-btn', innerText: 'Contato', onclick: () => {
                builtContainer(workingPage());
            }
        }),
        e('button', {
            className: 'menu-btn', innerText: 'Experiências', onclick: () => {
                builtContainer(workingPage());
            }
        }),
        e('button', {
            className: 'menu-btn', innerText: 'Blog', onclick: () => {
                builtContainer(workingPage());
            }
        }),
        e('button', {
            className: 'menu-btn', innerText: 'Sobre', onclick: () => {
                builtContainer(workingPage());
            }
        })
    ),



    // Lado Direito: Login e Config
    e('div', { id: 'settings-options', style: { display: 'flex', alignItems: 'center', gap: '15px' } },



        e('button', {
            className: 'btn-login', style: {
                border: 'none', height: '40px', cursor: 'pointer', borderRadius: '10px', width: '100px', 
            }, onclick: () => {
                    console.log('Clicou em Projetos!')
                    builtContainer(workingPage());
                }
        }, 'Login'),
        e('img', { id: 'gear-icon', src: 'img/gear.svg', style: { fontSize: '20px', cursor: 'pointer', width: '20px', height: '20px' } }),
        e("div", { id: "config-buttons", style: { display: 'none', flexDirection: 'column', gap: '5px' } },
            e("button", {
                id: "btn-dark",
                onclick: (ev) => {
                    ev.stopPropagation();
                    document.body.classList.remove('light-mode');
                    document.body.classList.add('dark-mode')
                    localStorage.setItem('theme', 'dark-mode');
                }
            }, "Dark"),
            e("button", {
                id: "btn-light",
                onclick: (ev) => {
                    ev.stopPropagation();
                    document.body.classList.remove('dark-mode');
                    document.body.classList.add('light-mode');
                    localStorage.setItem('theme', 'light-mode');
                }
            }, "Light")
        )
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
    e('div', { style: { display: 'flex', justifyContent: 'right', gap: '20px', fontSize: '0.9em' } },
        e('a', { href: '#', innerText: 'LinkedIn', style: { color: '#666', textDecoration: 'none' } }),
        e('a', { href: '#', innerText: 'Instagram', style: { color: '#666', textDecoration: 'none' } }),
        e('a', { href: '#', innerText: 'YouTube', style: { color: '#666', textDecoration: 'none' } }),
        e('a', { href: '#', innerText: 'GitHub', style: { color: '#666', textDecoration: 'none' } })
    )
);

const mainContent = e('main', { className: 'container', style: { padding: '50px' } });

function builtContainer(thing) {
    const container = document.querySelector(".container");
    container.innerHTML = '';
    container.append(thing)
}


function menuOptions() {
    const gearIcon = document.getElementById('gear-icon');
    const configButtons = document.getElementById('config-buttons');

    gearIcon.addEventListener('click', () => {
        configButtons.style.display = configButtons.style.display === 'none' ? 'flex' : 'none';
    });
}

// --- MONTAGEM DA PÁGINA ---

const app = e('div', { id: 'app' },
    Header(),
    mainContent,
    Footer(),


);

initTheme();
mainContent.append(projectGrid())
document.body.append(app);
menuOptions();  
