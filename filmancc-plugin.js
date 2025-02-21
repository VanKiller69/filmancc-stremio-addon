class FilmanCCPlugin {
    constructor() {
        this.baseUrl = "https://filman.cc";
    }

    async fetchMovies() {
        try {
            const response = await fetch(`${this.baseUrl}/movies`);
            const html = await response.text();
            return this.parseMovies(html);
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    }

    parseMovies(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const movies = [];
        
        doc.querySelectorAll(".movie-item").forEach(item => {
            const title = item.querySelector(".movie-title").innerText;
            const link = item.querySelector("a").href;
            const thumbnail = item.querySelector("img").src;
            movies.push({ title, link, thumbnail });
        });
        
        return movies;
    }

    async getMovieStream(movieUrl) {
        try {
            const response = await fetch(movieUrl);
            const html = await response.text();
            const streamUrl = this.extractStreamUrl(html);
            return streamUrl;
        } catch (error) {
            console.error("Error fetching movie stream:", error);
            return null;
        }
    }

    extractStreamUrl(html) {
        const match = html.match(/source\s*src=\"(.*?)\"/);
        return match ? match[1] : null;
    }
}

const filmanPlugin = new FilmanCCPlugin();

async function loadMovies() {
    const movies = await filmanPlugin.fetchMovies();
    movies.forEach(movie => {
        console.log(`Title: ${movie.title}, Link: ${movie.link}, Thumbnail: ${movie.thumbnail}`);
    });
}

loadMovies();
