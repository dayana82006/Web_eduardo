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

const secciones = document.querySelectorAll('section[id], .portada[id]');
const enlacesPagina = document.querySelectorAll('.menu-navegacion a[href^="#"]');
if (secciones.length && enlacesPagina.length && 'IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            const destino = '#' + entrada.target.id;
            enlacesPagina.forEach((enlace) => {
                enlace.classList.toggle('activa', enlace.getAttribute('href') === destino);
            });
        });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    secciones.forEach((seccion) => observador.observe(seccion));
}

const fotoTerritorio = document.querySelector('.foto-territorio img');
if (fotoTerritorio) {
    window.addEventListener('scroll', () => {
        const caja = fotoTerritorio.getBoundingClientRect();
        if (caja.bottom < 0 || caja.top > window.innerHeight) return;
        fotoTerritorio.style.transform = 'scale(1.06) translateY(' + (caja.top * -0.06) + 'px)';
    }, { passive: true });
}
