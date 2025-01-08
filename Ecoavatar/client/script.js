// Configuración inicial del canvas
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

const spriteSheetPath = canvas.getAttribute("data-sprite-sheet");
const hatImagePath = canvas.getAttribute("data-hat");

const spriteSheet = new Image();
const hatImage = new Image();
spriteSheet.src = spriteSheetPath;
hatImage.src = hatImagePath;

const FRAME_WIDTH = 500; 
const FRAME_HEIGHT = 500;
let currentFrame = 0;
const totalFrames = 2; 
let frameCounter = 0;
const frameSpeed = 120;

let isHatEquipped = false;

// Dibujar el personaje
function drawCharacter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sx = currentFrame * FRAME_WIDTH;
  const sy = 0;

  ctx.drawImage(
      spriteSheet,
      sx, sy,
      FRAME_WIDTH, FRAME_HEIGHT,
      0, 0,
      canvas.width, canvas.height
  );

  frameCounter++;
  if (frameCounter >= frameSpeed) {
      currentFrame = (currentFrame + 1) % totalFrames;
      frameCounter = 0;
  }

  if (isHatEquipped) {
      drawHat();
  }
}

function drawHat() {
  const hatX = 50; 
  const hatY = 1;
  const hatWidth = 400; 
  const hatHeight = 400;
  
  ctx.drawImage(hatImage, hatX, hatY, hatWidth, hatHeight);
}

// Loop de animación
function animationLoop() {
    drawCharacter();
    requestAnimationFrame(animationLoop);
}

// Equipar recompensa
function equipReward() {
  hatImage.onload = function () {
      isHatEquipped = true;
      Swal.fire({
          title: "¡Sombrero equipado!",
          text: "Tu personaje ahora luce más elegante.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          position: 'top-end',
      });
  };

  hatImage.src = hatImagePath;
}

spriteSheet.onload = () => {
    animationLoop();
};

spriteSheet.onerror = () => {
    console.error("Error: No se pudo cargar la hoja de sprites.");
};

// Eventos DOM
document.addEventListener("DOMContentLoaded", () => {
    const equipButton = document.querySelector(".equipar-btn");
    equipButton.addEventListener("click", equipReward);

    const publicarButton = document.querySelector(".btn-publicar");
    publicarButton.addEventListener("click", () => {
        const textarea = document.querySelector(".foro-textarea");
        const comentarioTexto = textarea.value.trim();

        if (comentarioTexto === "") {
            Swal.fire({
                icon: "error",
                title: "Comentario vacío",
                text: "Escribe algo antes de publicar.",
            });
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Publicado",
            text: "Tu comentario se ha publicado exitosamente.",
        });
        textarea.value = "";
    });
});


// Función para abrir el modal al hacer clic en "Completar"
function openChallengeModal(button) {
    const desafioId = button.getAttribute('data-desafio-id');

    document.getElementById('challengeModal').style.display = 'flex';

    // Configurar el atributo de acción del formulario dinámicamente
    const form = document.getElementById('challengeForm');
    form.setAttribute('action', `/upload/${desafioId}`);
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('challengeModal');
    modal.style.display = 'none'; // Cerrar el modal cambiando su estilo a 'none'
}

// Cuando se haga clic en "Subir Publicación"
document.getElementById('submitPost').addEventListener('click', function () {
    console.log('Subir Publicación clickeado');
    const form = document.getElementById('challengeForm');
    const formData = new FormData(form);

    fetch(form.getAttribute('action'), {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            Swal.fire({
                title: "¡Publicación creada exitosamente!",
                text: "Gracias por tu contribución.",
                icon: "success",
                confirmButtonText: "OK",
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
            closeModal(); 
        } else {
            Swal.fire({
                title: "Error",
                text: data.message || "Algo salió mal al procesar la publicación.",
                icon: "error",
                confirmButtonText: "Intentar nuevamente"
            });
        }
    })
    .catch(error => console.error('Error:', error));
});
