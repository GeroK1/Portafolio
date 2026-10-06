/* -------------------------------------------------
   main.js – Lógica de generación de contenido
   Lee el objeto global DATOS (cargado desde datos.js)
   y dibuja cada sección en los contenedores existentes.
   ------------------------------------------------- */

// ---------- UTILIDADES ----------
/**
 * Crea un elemento HTML con clases opcionales y texto.
 * @param {string} tag - Nombre de la etiqueta.
 * @param {string[]} [clases] - Array de clases CSS.
 * @param {string} [texto] - Texto del nodo.
 * @returns {HTMLElement}
 */
function crearElemento(tag, clases = [], texto = '') {
  const el = document.createElement(tag);
  if (clases.length) el.classList.add(...clases);
  if (texto) el.textContent = texto;
  return el;
}

/**
 * Añade atributos a un elemento.
 * @param {HTMLElement} el
 * @param {Object} attrs - pares clave‑valor.
 */
function setAtributos(el, attrs) {
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v);
  }
}

/**
 * Inserta un enlace externo con target y rel seguros.
 * @param {string} href
 * @param {string} texto
 * @returns {HTMLAnchorElement}
 */
function crearEnlaceExterno(href, texto) {
  const a = crearElemento('a', [], texto);
  setAtributos(a, {
    href,
    target: '_blank',
    rel: 'noopener noreferrer'
  });
  return a;
}

// ---------- SECCIONES ----------
function dibujarEducacion() {
  const cont = document.getElementById('lista-educacion');
  if (!cont || !Array.isArray(DATOS.educacion)) return;

  DATOS.educacion.forEach(item => {
    const tarjeta = crearElemento('article', ['tarjeta', 'tarjeta-educacion']);

    const titulo = crearElemento('h4', [], item.titulo);
    tarjeta.appendChild(titulo);

    const institucion = crearElemento('p', [], item.institucion);
    tarjeta.appendChild(institucion);

    const periodo = crearElemento('p', [], item.periodo);
    tarjeta.appendChild(periodo);

    const descripcion = crearElemento('p', [], item.descripcion);
    tarjeta.appendChild(descripcion);

    if (item.imagen) {
      const img = crearElemento('img', ['tarjeta-imagen']);
      setAtributos(img, {
        src: item.imagen,
        alt: `${item.titulo} - ${item.institucion}`,
        loading: 'lazy'
      });
      tarjeta.appendChild(img);
    }

    cont.appendChild(tarjeta);
  });
}

function dibujarIdiomas() {
  const cont = document.getElementById('lista-idiomas');
  if (!cont || !Array.isArray(DATOS.idiomas)) return;

  const ul = crearElemento('ul');
  DATOS.idiomas.forEach(lang => {
    const li = crearElemento('li', ['idioma']);
    li.textContent = `${lang.idioma} – ${lang.nivel}`;
    ul.appendChild(li);
  });
  cont.appendChild(ul);
}

function dibujarExperiencia() {
  const cont = document.getElementById('lista-experiencia');
  if (!cont || !Array.isArray(DATOS.experiencia)) return;

  DATOS.experiencia.forEach(exp => {
    const tarjeta = crearElemento('article', ['tarjeta', 'tarjeta-experiencia']);

    const cargo = crearElemento('h4', [], exp.cargo);
    tarjeta.appendChild(cargo);

    const org = crearElemento('p', [], exp.organizacion);
    tarjeta.appendChild(org);

    const periodo = crearElemento('p', [], exp.periodo);
    tarjeta.appendChild(periodo);

    const descripcion = crearElemento('p', [], exp.descripcion);
    tarjeta.appendChild(descripcion);

    // Logros
    if (Array.isArray(exp.logros) && exp.logros.length) {
      const ulLogros = crearElemento('ul', ['logros']);
      exp.logros.forEach(l => {
        const li = crearElemento('li', [], l);
        ulLogros.appendChild(li);
      });
      tarjeta.appendChild(ulLogros);
    }

    // Galería de imágenes
    if (Array.isArray(exp.imagenes) && exp.imagenes.some(src => src)) {
      const galeria = crearElemento('div', ['tarjeta-galeria']);
      exp.imagenes.forEach(src => {
        if (!src) return;
        const img = crearElemento('img');
        setAtributos(img, {
          src,
          alt: `${exp.cargo} - ${exp.organizacion}`,
          loading: 'lazy'
        });
        galeria.appendChild(img);
      });
      tarjeta.appendChild(galeria);
    }

    cont.appendChild(tarjeta);
  });
}

function dibujarHabilidadesTecnicas() {
  const cont = document.getElementById('lista-habilidades-tecnicas');
  if (!cont || !Array.isArray(DATOS.habilidadesTecnicas)) return;

  DATOS.habilidadesTecnicas.forEach(h => {
    const div = crearElemento('div', ['habilidad', 'habilidad-tecnica']);

    // Icono
    const i = crearElemento('i', [h.icono]);
    div.appendChild(i);

    // Nombre
    const nombre = crearElemento('span', [], h.nombre);
    div.appendChild(nombre);

    // Estado
    const estado = crearElemento('span', [h.estado], h.estado);
    div.appendChild(estado);

    cont.appendChild(div);
  });
}

function dibujarHabilidadesBlandas() {
  const cont = document.getElementById('lista-habilidades-blandas');
  if (!cont || !Array.isArray(DATOS.habilidadesBlandas)) return;

  DATOS.habilidadesBlandas.forEach(h => {
    const span = crearElemento('span', ['habilidad', 'habilidad-blanda'], h.nombre);
    cont.appendChild(span);
  });
}

function dibujarProyectos() {
  const cont = document.getElementById('lista-proyectos');
  if (!cont || !Array.isArray(DATOS.proyectos)) return;

  DATOS.proyectos.forEach(p => {
    const tarjeta = crearElemento('article', ['tarjeta', 'tarjeta-proyecto']);

    const nombre = crearElemento('h4', [], p.nombre);
    tarjeta.appendChild(nombre);

    const descripcion = crearElemento('p', [], p.descripcion);
    tarjeta.appendChild(descripcion);

    // Tecnologías
    if (Array.isArray(p.tecnologias) && p.tecnologias.length) {
      const techWrapper = crearElemento('div', ['tecnologias']);
      p.tecnologias.forEach(t => {
        const etiqueta = crearElemento('span', ['etiqueta'], t);
        techWrapper.appendChild(etiqueta);
      });
      tarjeta.appendChild(techWrapper);
    }

    // Enlaces
    if (p.github) {
      const linkGit = crearEnlaceExterno(p.github, 'Ver en GitHub');
      tarjeta.appendChild(linkGit);
    }
    if (p.demo) {
      const linkDemo = crearEnlaceExterno(p.demo, 'Ver demo');
      tarjeta.appendChild(linkDemo);
    }

    // Imagen (opcional)
    if (p.imagen) {
      const img = crearElemento('img');
      setAtributos(img, {
        src: p.imagen,
        alt: `${p.nombre} - captura`,
        loading: 'lazy'
      });
      tarjeta.appendChild(img);
    }

    cont.appendChild(tarjeta);
  });
}

function dibujarCertificaciones() {
  const cont = document.getElementById('lista-certificaciones');
  if (!cont || !Array.isArray(DATOS.certificaciones)) return;

  DATOS.certificaciones.forEach(c => {
    const tarjeta = crearElemento('article', ['tarjeta', 'tarjeta-certificacion']);

    const nombre = crearElemento('h4', [], c.nombre);
    tarjeta.appendChild(nombre);

    const entidad = crearElemento('p', [], c.entidad);
    tarjeta.appendChild(entidad);

    const fecha = crearElemento('p', [], c.fecha);
    tarjeta.appendChild(fecha);

    // Enlace a credencial (opcional)
    if (c.enlace) {
      const link = crearEnlaceExterno(c.enlace, 'Ver credencial');
      tarjeta.appendChild(link);
    }

    // Imagen (opcional)
    if (c.imagen) {
      const img = crearElemento('img');
      setAtributos(img, {
        src: c.imagen,
        alt: `${c.nombre} - certificación`,
        loading: 'lazy'
      });
      tarjeta.appendChild(img);
    }

    cont.appendChild(tarjeta);
  });
}

// ---------- AÑO ACTUAL ----------
function actualizarAnio() {
  const span = document.getElementById('anio');
  if (span) {
    const anio = new Date().getFullYear();
    span.textContent = anio;
  }
}

// ---------- INICIALIZACIÓN ----------
document.addEventListener('DOMContentLoaded', () => {
  dibujarEducacion();
  dibujarIdiomas();
  dibujarExperiencia();
  dibujarHabilidadesTecnicas();
  dibujarHabilidadesBlandas();
  dibujarProyectos();
  dibujarCertificaciones();
  actualizarAnio();
});