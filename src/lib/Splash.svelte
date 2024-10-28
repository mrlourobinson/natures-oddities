<script>

// Function to hide the cover with fade-out effect
function hideCover() {
    const cover = document.getElementById('cover');
    if (cover) {
        cover.classList.add('hidden'); // Add the hidden class to trigger fade-out
        setTimeout(() => {
            cover.style.display = 'none'; // Set display to none after fading out
        }, 500); // Match this timeout with the CSS transition duration
    }
}


</script>

<div class="cover" id="cover">
    <div class="header">
        <hr>
        <h4>Robinson School of<br>Evolutionary Biology<br>& Genealogy</h4>
        <hr>
    </div>

    <div class="headline">
        <h1>Nature’s<br>Oddities</h1>
        <h3>Can you tell the<br>Genus from the Gimmick?</h3>
    </div>

    <div class="enter">
        <h4>Play the game now:</h4>
        <button class="button" id="hide-button" on:click={() => hideCover()}>Play</button>
    </div>

    <div class="gap"></div>

    <div class="bottom">
        <h3>FIRST EDITION</h3>
    </div>
</div>