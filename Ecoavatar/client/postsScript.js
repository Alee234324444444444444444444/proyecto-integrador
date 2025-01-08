// Funcion para listar las publicaciones
async function loadPosts() {
    try {
        console.log("Iniciando carga de posts...");
        const response = await fetch('http://localhost:3000/api/posts');
        const posts = await response.json();
        console.log("Posts recibidos:", posts);

        const postsList = document.getElementById('posts-list');
        
        posts.forEach(post => {
            const imageUrl = post.photo.startsWith('/') 
                ? `http://localhost:3000${post.photo}`
                : post.photo;

            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <div style="border: 1px solid #ddd; margin: 10px; padding: 15px; border-radius: 8px;">
                    <img src="${imageUrl}" alt="Post image" style="max-width: 300px; display: block; margin: 0 auto;"/>
                    <p style="margin: 10px 0;">${post.description}</p>
                    <small style="color: #666;">
                        Publicado el ${new Date(post.created_at).toLocaleDateString()}
                    </small>
                </div>
            `;
            postsList.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error cargando posts:", error);
        document.getElementById('posts-list').innerHTML = 
            '<p style="color: red; text-align: center;">Error al cargar las publicaciones</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadPosts);