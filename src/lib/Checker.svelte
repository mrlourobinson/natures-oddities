<script>
    export let frontSelected = [];
    export let backSelected = [];

    function checkAnswer(answer) {
        const cover = document.getElementById('checker');

        if (cover) {
            cover.classList.add('hidden'); // Add the hidden class to trigger fade-out
            setTimeout(() => {
                cover.style.opacity = 1; // Set display to none after fading out
                cover.style.pointerEvents = 'all';
        }, 500); // Match this timeout with the CSS transition duration
    }}

    function hideChecker() {
        const cover = document.getElementById('checker');

        if (cover) {
            cover.classList.remove('hidden'); // Add the hidden class to trigger fade-out
            setTimeout(() => {
                cover.style.opacity = 0; // Set display to none after fading out
                cover.style.pointerEvents = 'none';
        }, 500); // Match this timeout with the CSS transition duration
    }}



</script>

