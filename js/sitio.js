const nav = document.querySelector('.menu-navegacion');
const botonMenu = document.querySelector('.btn-menu');
if (botonMenu && nav) {
    botonMenu.addEventListener('click', () => {
        nav.classList.toggle('abierto');
    });
    nav.querySelectorAll('a').forEach((enlace) => {
        enlace.addEventListener('click', () => nav.classList.remove('abierto'));
    });
}

const pestanas = document.querySelectorAll('.pestaña');
pestanas.forEach((boton) => {
    boton.addEventListener('click', () => {
        pestanas.forEach((item) => item.classList.remove('activa'));
        boton.classList.add('activa');
        document.querySelectorAll('.panel-encuentro').forEach((panel) => panel.classList.remove('visible'));
        const panel = document.getElementById(boton.dataset.panel);
        if (panel) panel.classList.add('visible');
    });
});

const media = document.querySelector('.hero-media img');
if (media) {
    window.addEventListener('scroll', () => {
        const desplazamiento = window.scrollY * 0.25;
        media.style.transform = 'translateY(' + desplazamiento + 'px)';
    }, { passive: true });
}

function avisar(formulario, aviso) {
    if (!formulario || !aviso) return;
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        aviso.style.display = 'block';
        formulario.reset();
    });
}

avisar(document.getElementById('form-contacto'), document.getElementById('aviso-envio'));
avisar(document.getElementById('form-donacion'), document.getElementById('aviso-donacion'));
avisar(document.getElementById('form-patrocinio'), document.getElementById('aviso-patrocinio'));
avisar(document.getElementById('form-novedades'), document.getElementById('aviso-novedades'));

const gatillosObra = document.querySelectorAll('[data-obra]');
const obraPrincipal = document.getElementById('obra-principal');
const obraTitulo = document.getElementById('obra-titulo');
if (gatillosObra.length && obraPrincipal) {
    function mostrarObra(src, titulo) {
        gatillosObra.forEach((item) => {
            const activa = item.dataset.obra === src;
            item.classList.toggle('activa', activa);
            if (item.hasAttribute('aria-pressed')) {
                item.setAttribute('aria-pressed', activa ? 'true' : 'false');
            }
        });
        obraPrincipal.classList.remove('visible');
        window.setTimeout(() => {
            obraPrincipal.src = src;
            obraPrincipal.classList.add('visible');
        }, 70);
        if (obraTitulo) obraTitulo.textContent = titulo || '';
    }
    gatillosObra.forEach((boton) => {
        const precarga = new Image();
        precarga.src = boton.dataset.obra;
        boton.addEventListener('click', () => {
            mostrarObra(boton.dataset.obra, boton.dataset.titulo);
            if (!boton.classList.contains('tarjeta-inicio')) {
                const portada = document.getElementById('inicio');
                if (portada) portada.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
} else {
    const obras = document.querySelectorAll('.fondo-obras img');
    if (obras.length > 1) {
        let indice = 0;
        setInterval(() => {
            obras[indice].classList.remove('visible');
            indice = (indice + 1) % obras.length;
            obras[indice].classList.add('visible');
        }, 5200);
    }
}

document.querySelectorAll('[data-abrir-modal]').forEach((gatillo) => {
    gatillo.addEventListener('click', (evento) => {
        const modal = document.getElementById(gatillo.getAttribute('data-abrir-modal'));
        if (!modal || typeof modal.showModal !== 'function') return;
        evento.preventDefault();
        modal.showModal();
    });
});

document.querySelectorAll('dialog.modal-apoyo').forEach((modal) => {
    const cerrar = modal.querySelector('.cerrar-modal');
    if (cerrar) cerrar.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (evento) => {
        const caja = modal.getBoundingClientRect();
        const fuera =
            evento.clientX < caja.left ||
            evento.clientX > caja.right ||
            evento.clientY < caja.top ||
            evento.clientY > caja.bottom;
        if (fuera) modal.close();
    });
});

(function dinamismo() {
    const movimientoFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (movimientoFino && !reducir) {
        const punto = document.createElement('div');
        const anillo = document.createElement('div');
        punto.className = 'cursor-punto';
        anillo.className = 'cursor-anillo';
        document.body.append(punto, anillo);
        document.body.classList.add('con-cursor');

        let x = window.innerWidth * 0.58;
        let y = window.innerHeight * 0.42;
        let ax = x;
        let ay = y;
        window.addEventListener('mousemove', (evento) => {
            x = evento.clientX;
            y = evento.clientY;
        }, { passive: true });
        function seguir() {
            ax += (x - ax) * 0.55;
            ay += (y - ay) * 0.55;
            punto.style.transform = 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%)';
            anillo.style.transform = 'translate(' + ax + 'px,' + ay + 'px) translate(-50%,-50%)';
            requestAnimationFrame(seguir);
        }
        seguir();
        document.querySelectorAll('a, button, .expande, .panel-expand, [data-obra]').forEach((el) => {
            el.addEventListener('mouseenter', () => anillo.classList.add('amplio'));
            el.addEventListener('mouseleave', () => anillo.classList.remove('amplio'));
        });
    }

    const portada = document.querySelector('body.inicio .portada-foto');
    if (portada && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let foco = portada.querySelector('.linterna-foco');
        if (!foco) {
            const luz = document.createElement('div');
            luz.className = 'linterna';
            foco = document.createElement('div');
            foco.className = 'linterna-foco';
            luz.appendChild(foco);
            portada.appendChild(luz);
        }
        function moverLinterna(evento) {
            const r = portada.getBoundingClientRect();
            foco.style.left = (evento.clientX - r.left) + 'px';
            foco.style.top = (evento.clientY - r.top) + 'px';
        }
        portada.addEventListener('mousemove', moverLinterna, { passive: true });
        window.addEventListener('mousemove', moverLinterna, { passive: true });
    }

    if (movimientoFino && !reducir) {
        document.querySelectorAll('.expande, .panel-expand, .ed-pieza, .tarjeta-inicio').forEach((caja) => {
            const img = caja.querySelector('img');
            if (!img) return;
            caja.addEventListener('mousemove', (evento) => {
                const r = caja.getBoundingClientRect();
                const px = (evento.clientX - r.left) / r.width - 0.5;
                const py = (evento.clientY - r.top) / r.height - 0.5;
                img.style.transform = 'scale(1.16) translate(' + (px * -20) + 'px,' + (py * -20) + 'px)';
            });
            caja.addEventListener('mouseleave', () => {
                img.style.transform = '';
            });
        });
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) entrada.target.classList.add('visto');
        });
    }, { threshold: 0.14 });
    document.querySelectorAll('.revelar').forEach((el) => observador.observe(el));
})();
