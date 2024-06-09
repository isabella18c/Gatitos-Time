# Proyecto de Imágenes de Gatos con Vue.js

Este proyecto es una aplicación web interactiva que consume la API pública de TheCatAPI para mostrar imágenes de gatos. Utiliza Vue.js para la gestión de datos y la reactividad, junto con HTML, CSS y Bootstrap para la presentación y el diseño responsivo.

## Funcionamiento del Proyecto

### Estructura del Proyecto

El proyecto está compuesto por los siguientes archivos:

- **index.html**: Contiene la estructura HTML básica de la aplicación.
- **styles.css**: Define los estilos CSS personalizados para el proyecto.
- **main.js**: Contiene la lógica de Vue.js y las funciones para consumir la API de TheCatAPI.
- **README.md**: Este archivo, que proporciona una descripción y guía detallada del proyecto.

### Descripción del Código

#### index.html

El archivo `index.html` proporciona la estructura básica de la aplicación y vincula los archivos CSS y JavaScript necesarios:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GATITOS TIME</title>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
        </style>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css"> <!-- Este debe ser después de Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>
<body>
    <div id="app" class="container mt-5">
        <h1 class="page-title mb-4">GATITOS TIME</h1>
        <div v-if="loading" class="alert alert-info">Cargando...</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="catImages.length" class="row">
            <div v-for="image in catImages" :key="image.id" class="col-md-4 mb-4">
                <div class="card h-100 custom-card">
                    <img :src="image.url" :title="image.id" :alt="image.id" class="card-img-top custom-img">
                    <div class="card-body text-center">
                        <h5 class="card-title">{{ image.id }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="main.js"></script>
</body>
</html>

### styles.css

El archivo styles.css contiene los estilos personalizados para la aplicación, incluyendo el diseño de las cartas y la animación de las imágenes:

body {
    font-family: "Roboto", sans-serif;
    background-color: #152340; /* Fondo del body */
    margin: 0;
    padding: 20px;
    color: #fffb9f; /* Color del texto */
    text-transform: uppercase; /* Texto en mayúsculas para el body */
}

.container {
    max-width: 1200px;
    background-color: transparent; /* Fondo transparente para el contenedor principal */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.page-title {
    margin-top: 20px; /* Margen superior */
    margin-bottom: 20px; /* Margen inferior */
    color: #fffb9f; /* Color del texto */
    text-transform: uppercase; /* Texto en mayúsculas */
}

.custom-card {
    background-color: #3e5793; /* Fondo de las cartas */
    border-radius: 10px; /* Borde redondeado de 10px */
    border: none; /* Sin borde adicional */
    color: #fffb9f; /* Color del texto dentro de las cartas */
    box-shadow: none; /* Elimina la sombra */
}

.custom-img {
    padding: 10px; /* Padding de 10px para las imágenes */
    border-radius: 10px; /* Redondear las esquinas de las imágenes */
    object-fit: cover;
    height: 200px; /* Ajusta la altura según tus necesidades */
    background-color: #fff; /* Fondo blanco detrás de las imágenes */
    transition: transform 0.3s; /* Transición para la animación */
}

.custom-img:hover {
    transform: scale(1.05); /* Escalar la imagen al pasar el mouse */
}

.card-body {
    text-align: center;
    text-transform: uppercase; /* Texto en mayúsculas */
}

.card-title {
    color: #fffb9f; /* Color del texto */
    text-transform: uppercase; /* Texto en mayúsculas */
    margin-top: 10px; /* Margen superior */
    margin-bottom: 10px; /* Margen inferior */
}

### main.js
El archivo main.js contiene la lógica de Vue.js para consumir la API y actualizar la interfaz de usuario:

new Vue({
    el: '#app',
    data: {
        catImages: [],
        loading: true,
        error: null
    },
    created() {
        this.fetchCatImages();
    },
    methods: {
        async fetchCatImages() {
            try {
                const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
                if (!response.ok) {
                    throw new Error('Error al obtener las imágenes de gatos');
                }
                const data = await response.json();
                this.catImages = data;
            } catch (error) {
                console.error('Error fetching cat images:', error);
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
});


### Flujo de Trabajo

Inicialización del Proyecto: Cuando se carga la página, Vue.js inicializa la aplicación y llama al método fetchCatImages dentro del ciclo de vida created.

Consumo de la API: El método fetchCatImages utiliza fetch para hacer una solicitud GET a la API de TheCatAPI y obtener 10 imágenes de gatos.

Actualización de la Interfaz de Usuario:

Si la solicitud es exitosa, las imágenes se almacenan en la propiedad catImages del estado de la aplicación.
Si ocurre un error, se captura y se muestra en la interfaz.
Renderización de la Interfaz:

Las imágenes de gatos se muestran en una cuadrícula responsiva utilizando Bootstrap.
Las cartas tienen un diseño personalizado con bordes redondeados, colores específicos y animación al pasar el mouse sobre las imágenes.
Interacción del Usuario:

Los usuarios pueden ver las imágenes de gatos con sus IDs.
Al pasar el mouse sobre las imágenes, estas se escalan ligeramente gracias a la transición definida en CSS.
