// Busca en el documento todos los elementos que tengan la clase "nav-link"
// y guarda la lista en la constante "links".
const links = document.querySelectorAll(".nav-link");

// Busca todas los elementos de la página que tengan la clase "seccion"
// y las guarda en la constante "secciones".
const secciones = document.querySelectorAll(".seccion");

// Busca el elemento que tiene el id "menuHamburguesa"
// normalmente será el botón del menú en móvil.
const menuHamburguesa = document.getElementById("menuHamburguesa");

// Busca el elemento con id "nav", que representa el menú de navegación.
const nav = document.getElementById("nav");

// Busca el formulario de contacto por su id "formContacto".
const formContacto = document.getElementById("formContacto");

// Busca el elemento donde se mostrará el mensaje de respuesta del formulario.
const respuestaFormulario = document.getElementById("respuestaFormulario");


/* LINKS DEL MENÚ*/
// Recorre cada link del menú de navegación.
links.forEach((link) => {

    // A cada link le añade un evento de click.
    link.addEventListener("click", (e) => {

        // Evita el comportamiento normal del enlace.
        // Así no recarga la página ni navega automáticamente.
        e.preventDefault();

        // Obtiene el valor del atributo data-seccion del link pulsado.
        // Ejemplo: data-seccion="inicio" => idSeccion = "inicio"
        const idSeccion = link.dataset.seccion;

        // Llama a la función para mostrar la sección correspondiente.
        mostrarSeccion(idSeccion);

        // Si el ancho de la ventana es menor o igual a 768 píxeles
        // significa que probablemente estamos en móvil o tablet.
        if (window.innerWidth <= 768) {

            // Oculta el menú quitando la clase "mostrar".
            nav.classList.remove("mostrar");
        }
    });
});


/* MOSTRAR SECCIÓN */
// Esta función recibe el id de una sección (crida, galeria, crema) y muestra esa sección.
// Además, marca como activo el enlace correspondiente del menú.
function mostrarSeccion(idSeccion) {

    // Recorre todas las secciones de la página.
    secciones.forEach((seccion) => {

        // A cada sección le quita la clase "visible"
        // para ocultarlas todas primero.
        seccion.classList.remove("visible");
    });

    // Recorre todos los links del menú.
    links.forEach((link) => {

        // A cada link le quita la clase "active"
        // para desmarcar el enlace que estuviera activo antes.
        link.classList.remove("active");
    });

    // Busca la sección que tenga como id el valor recibido en "idSeccion".
    // Por ejemplo, si idSeccion = "crida", busca <section id="crida">.
    const seccionSeleccionada = document.getElementById(idSeccion);

    // Busca el link que tenga:
    // - clase "nav-link"
    // - atributo data-seccion igual al id recibido
    // Ejemplo: <a class="nav-link" data-seccion="crida">
    const linkSeleccionado = document.querySelector(`.nav-link[data-seccion="${idSeccion}"]`);

    // Si la sección existe...
    if (seccionSeleccionada) {

        // ...le añade la clase "visible" para mostrarla.
        seccionSeleccionada.classList.add("visible");
    }

    // Si el link correspondiente existe...
    if (linkSeleccionado) {

        // ...le añade la clase "active" para resaltarlo en el menú.
        linkSeleccionado.classList.add("active");
    }
}



/* CARGAR SECCIÓN SEGÚN HASH */
// Comprueba si la URL tiene un hash.
// Ejemplo: index.html#crida
if (window.location.hash) {

    // Toma el hash y elimina el símbolo "#".
    // Ejemplo: "#crida" => "crida"
    const hash = window.location.hash.replace("#", "");

    // Muestra la sección indicada en la URL.
    mostrarSeccion(hash);
}


/* MENÚ HAMBURGUESA */
// Añade un evento click al botón hamburguesa.
menuHamburguesa.addEventListener("click", () => {

    // Alterna la clase "mostrar":
    // - si no la tiene, la añade
    // - si ya la tiene, la quita
    // Esto sirve para abrir y cerrar el menú en móvil.
    nav.classList.toggle("mostrar");
});


/* FORMULARIO DE CONTACTO */
// Comprueba que existen el formulario contacto, en el index no existe solo existe en contacto.html.
if (formContacto) {

    // Añade un evento cuando el formulario se envía.
    formContacto.addEventListener("submit", (e) => {

        // Evita que el envio del formulario recargue toda la página.
        e.preventDefault();

        // Obtiene el valor del campo "nombre",
        // elimina espacios al inicio y al final con trim()
        // y lo guarda en la constante "nombre".
        const nombre = document.getElementById("nombre").value.trim();

        // Obtiene el valor del campo "email"
        // y elimina espacios sobrantes.
        const email = document.getElementById("email").value.trim();

        // Obtiene el valor del campo "mensaje"
        // y elimina espacios sobrantes.
        const mensaje = document.getElementById("mensaje").value.trim();

        // Comprueba si alguno de los campos está vacío.
        if (nombre === "" || email === "" || mensaje === "") {

            // Muestra un mensaje de error al usuario.
            respuestaFormulario.textContent = "Por favor, completá todos los campos.";

            // Cambia el color del mensaje a rojo.
            respuestaFormulario.style.color = "red";

            // Sale de la función para no seguir ejecutando el envío.
            return;
        }

        // Si todos los campos están completos,
        // muestra un mensaje temporal de envío.
        respuestaFormulario.textContent = "Enviando mensaje...";

        // Cambia el color del texto a oscuro.
        respuestaFormulario.style.color = "#111";

        // Simula una espera de 1 segundo antes de confirmar el envío.
        setTimeout(() => {

            // Muestra mensaje de éxito.
            respuestaFormulario.textContent = "Mensaje enviado correctamente. Gracias por contactarnos.";

            // Cambia el color del mensaje a verde.
            respuestaFormulario.style.color = "#0b5d1e";

            // Limpia todos los campos del formulario.
            formContacto.reset();

        // 1000 milisegundos = 1 segundo
        }, 1000);

        // para evitar que el mensaje quede indefinidamente en la pagina espera 2 segundos y luego lo borra
        setTimeout(() => {

            // borra el msg
            respuestaFormulario.textContent = "";

        // 5000 milisegundos = 5 segundo
        }, 5000);
    });
}