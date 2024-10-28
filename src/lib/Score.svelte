<script>
    export let score = [];


</script>

<div class="score-counter">
    {#each score as point}
        <span class="{point}"></span>
    {/each}
</div>