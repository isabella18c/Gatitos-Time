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
                console.log('API Response:', data);
                this.catImages = data;
                console.log('Cat Images:', this.catImages);
            } catch (error) {
                console.error('Error buscando imagenes de gatitos:', error);
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
});