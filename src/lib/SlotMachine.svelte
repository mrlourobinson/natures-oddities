<script>
    import { onMount } from 'svelte';
    export let id = ''; // Unique identifier for each instance
    export let spinTrigger = false; // New prop to trigger spin
    export let animals = []; // All animals array
    export let frontAnimalName = ''; // Name of the specific front animal
    export let backAnimalName = ''; // Name of the specific back animal

    // Extract front and back images based on the animal names
    let frontImages = animals.map(animal => animal.front);
    let backImages = animals.map(animal => animal.back);

    let images = [];
    let slotImagesRef;
    let imageHeight = 0;
    let scrollAmount = 0;
    let interval;

    // Function to shuffle an array and ensure a specific item is at the end
    function shuffleAndPlaceLast(array, specificItem) {
        const filteredArray = array.filter(item => item !== specificItem); // Exclude specific item
        for (let i = filteredArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredArray[i], filteredArray[j]] = [filteredArray[j], filteredArray[i]]; // Swap elements
        }
        filteredArray.push(specificItem); // Place specific item at the end
        return filteredArray;
    }

    function stopScrolling() {
        clearInterval(interval);

        // Ensure the specific animals are at the end of the shuffled arrays
        const frontAnimal = animals.find(animal => animal.name === frontAnimalName)?.front;
        const backAnimal = animals.find(animal => animal.name === backAnimalName)?.back;

        // Shuffle and place specific images at the end
        images = id === 'left'
            ? shuffleAndPlaceLast(frontImages, frontAnimal)
            : shuffleAndPlaceLast(backImages, backAnimal);

        // Scroll to the last image (specific animal)
        scrollAmount = (images.length - 1) * imageHeight;
        slotImagesRef.style.transition = 'transform 0.5s ease-out';
        slotImagesRef.style.transform = `translateY(-${scrollAmount}px)`;
    }

    // Initialize image set based on ID
    onMount(() => {
        images = id === 'left' ? frontImages : backImages;

        // Set up an observer to capture image height once images load
        const observer = new ResizeObserver(() => {
            if (slotImagesRef.querySelector('img')) {
                imageHeight = slotImagesRef.querySelector('img').getBoundingClientRect().height;
                startScrolling();
            }
        });
        observer.observe(slotImagesRef);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    });

    function startScrolling() {
    if (interval) clearInterval(interval);

        // Set initial fast scroll speed
        let speed = 50; 
        let deceleration = 1.02; // Deceleration factor for a gradual slow-down

        interval = setInterval(() => {
            scrollAmount += imageHeight;
            slotImagesRef.style.transition = `transform ${speed}ms linear`;
            slotImagesRef.style.transform = `translateY(-${scrollAmount}px)`;

            if (scrollAmount >= images.length * imageHeight) {
                scrollAmount = 0;
                slotImagesRef.style.transition = 'none';
                slotImagesRef.style.transform = 'translateY(0px)';
            }

            // Gradually slow down
            if (speed < 500) {
                speed *= deceleration;
            }
        }, speed);

        setTimeout(stopScrolling, 3000);
    }

    // Watch for changes to spinTrigger prop
    $: if (spinTrigger) {
        startScrolling(); // Start scrolling when button is pressed
    }
</script>

<style>
    :global(.slot-machine-container) {
        height: var(--imageHeight);
    }
</style>

<div class="slot-machine-container" id={id} style="--imageHeight: {imageHeight}px">
    <div class="slot-images" bind:this={slotImagesRef}>
        {#each images as image}
            <img src='../imgs/{image}.png' alt="Slot" />
        {/each}
        {#each images as image} <!-- Duplicate for seamless loop -->
            <img src='../imgs/{image}.png' alt="Slot" />
        {/each}
    </div>
</div>
