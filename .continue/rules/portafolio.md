# Reglas del proyecto: Portafolio web

## Contexto
- Portafolio personal estático de Gerardo Moran para mostrar fotos y proyectos.
- Solo HTML, CSS y JavaScript puros. No usar frameworks, librerías ni CDN externos sin que yo lo pida.
- Idioma de la página y de los comentarios: español.

## Estructura de archivos (no cambiarla sin avisar)
- src/index.html  → página principal
- src/css/styles.css → todos los estilos
- src/js/datos.js → TODO el contenido editable (experiencia, educación, idiomas, habilidades, proyectos, certificaciones, galería) como arreglos de objetos
- src/js/main.js → solo la lógica que lee datos.js y dibuja las secciones
- src/img/ → imágenes (usar nombres en minúscula, sin espacios ni tildes)
- Rutas relativas desde index.html: css/styles.css, js/main.js, img/...

## Diseño y estilos
- Definir colores, fuentes y espacios como variables CSS en :root y reutilizarlas.
- Mobile first y responsive. Usar clases con nombres descriptivos en minúscula con guiones (ej. .tarjeta-proyecto).
- No usar estilos en línea ni IDs para dar estilo.

## Secciones
- Cada sección es un bloque independiente: <section id="nombre"> con su propio título.
- Para añadir una sección nueva: crear el bloque HTML, sus estilos y, si lleva lógica, su función en main.js, y añadirla al menú.
- Los proyectos y las fotos de la galería deben salir de arreglos de datos en datos.js, para poder agregar elementos editando solo ese arreglo.

## Calidad
- HTML semántico y accesible: texto alternativo en toda imagen, un solo <h1>.
- No inventar datos personales, enlaces ni correos. Si falta un dato, dejar el marcador [COMPLETAR].
- Cuando modifiques código, muestra solo las partes que cambian e indica en qué archivo van.
- No elimines código existente que no te pedí cambiar.