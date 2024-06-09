// Inicialización de la instancia de Vue.js
new Vue({
    el: '#app', // Selecciona el elemento con el id 'app' como el contenedor para la instancia de Vue
    data: {
        catImages: [], // Array para almacenar las imágenes de gatos obtenidas de la API
        loading: true, // Booleano para indicar si los datos están siendo cargados
        error: null // Variable para almacenar cualquier mensaje de error
    },
    // Hook del ciclo de vida de Vue: se ejecuta cuando la instancia es creada
    created() {
        this.fetchCatImages(); // Llama al método para obtener las imágenes de gatos cuando la instancia es creada
    },
    methods: {
        // Método para obtener las imágenes de gatos desde la API
        async fetchCatImages() {
            try {
                const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10'); // Realiza una solicitud a la API de TheCatAPI
                if (!response.ok) {
                    throw new Error('Error al obtener las imágenes de gatos'); // Lanza un error si la respuesta no es satisfactoria
                }
                const data = await response.json(); // Convierte la respuesta a formato JSON
                this.catImages = data; // Almacena las imágenes obtenidas en el array catImages
            } catch (error) {
                console.error('Error fetching cat images:', error); // Muestra un mensaje de error en la consola
                this.error = error.message; // Almacena el mensaje de error en la variable error
            } finally {
                this.loading = false; // Cambia el estado de loading a false una vez que la solicitud ha terminado
            }
        }
    }
});