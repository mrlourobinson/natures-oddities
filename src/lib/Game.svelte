<script>
    import SlotMachine from '../lib/SlotMachine.svelte'
    import Score from '../lib/Score.svelte'

    import Checker from '../lib/Checker.svelte'

    let spinTrigger = false;
    let correct = 0;
    let frontIndex, frontSelected, backIndex, backSelected;

    let animals = [
 {
   "label": "Fox",
   "genus": "Canis Vulpes",
   "name": "fox",
   "id": 1,
   "front": "image_front_1",
   "back": "image_back_1"
 },
 {
   "label": "Fish",
   "genus": "Osteichthyes",
   "name": "fish",
   "id": 2,
   "front": "image_front_2",
   "back": "image_back_2"
 },
 {
   "label": "Dolphin",
   "genus": "Delphinidae",
   "name": "dolphin",
   "id": 3,
   "front": "image_front_3",
   "back": "image_back_3"
 },
 {
   "label": "Dog",
   "genus": "Canis Familiaris",
   "name": "dog",
   "id": 4,
   "front": "image_front_4",
   "back": "image_back_4"
 },
 {
   "label": "Horse",
   "genus": "Equus",
   "name": "horse",
   "id": 5,
   "front": "image_front_5",
   "back": "image_back_5"
 },
 {
   "label": "Whale",
   "genus": "Balaenopteridae",
   "name": "whale",
   "id": 6,
   "front": "image_front_6",
   "back": "image_back_6"
 },
 {
   "label": "Goat",
   "genus": "goaty",
   "name": "goat",
   "id": 7,
   "front": "image_front_7",
   "back": "image_back_7"
 },
 {
   "label": "Sheep",
   "genus": "sheepy",
   "name": "sheep",
   "id": 8,
   "front": "image_front_8",
   "back": "image_back_8"
 },
 {
   "label": "Panther",
   "genus": "panthy",
   "name": "panther",
   "id": 9,
   "front": "image_front_9",
   "back": "image_back_9"
 },
 {
   "label": "Wolf",
   "genus": "wolfy",
   "name": "wolf",
   "id": 10,
   "front": "image_front_10",
   "back": "image_back_10"
 },
 {
   "label": "Zebra",
   "genus": "Equus Zebra",
   "name": "zebra",
   "id": 11,
   "front": "image_front_11",
   "back": "image_back_11"
 },
 {
   "label": "Donkey",
   "genus": "donker",
   "name": "donkey",
   "id": 12,
   "front": "image_front_12",
   "back": "image_back_12"
 },
 {
   "label": "Tiger",
   "genus": "tigey",
   "name": "tiger",
   "id": 13,
   "front": "image_front_13",
   "back": "image_back_13"
 },
 {
   "label": "Lion",
   "genus": "loiny",
   "name": "lion",
   "id": 14,
   "front": "image_front_14",
   "back": "image_back_14"
 }
]

    let answers = [
        'dolphinwhale','whaledolphin',
        'dogfox','foxdog',
        'dogwolf','wolfdog',
        'sheepgoat','goatsheep',
        'tigerlion','liontiger',
        'donkeyzebra','zebradonkey',
        'horsedonkey','donkeyhorse',
        'jaguarlion','lionjaguar',
        'horsezebra','zebrahorse',

    ]

    let turn = 0;
    let score = [
        'unanswered',
        'unanswered',
        'unanswered',
        'unanswered',
        'unanswered'
    ];

    function selectAnimals() {
        frontIndex = Math.floor(Math.random() * animals.length);
        frontSelected = animals[frontIndex];

        backIndex = Math.floor(Math.random() * animals.length);
        backSelected = animals[backIndex];
    }
    selectAnimals();

    function startSpin() {
        selectAnimals();

        spinTrigger = true;

        // Reset the trigger after starting the spin
        setTimeout(() => spinTrigger = false, 100); // Prevent immediate retrigger
    }

    function restartGame() {
        score = [
            'unanswered',
            'unanswered',
            'unanswered',
            'unanswered',
            'unanswered'
        ];
        turn = 0;

        hideChecker();
    }

    function checkAnswer(answer) {
        const cover = document.getElementById('checker');

        let bothHalves = frontSelected['name'].concat(backSelected.name);
        if (answers.includes(bothHalves) && answer == 'real') { 
            correct = 1;
            score[turn] = 'win';
        } else if (!answers.includes(bothHalves) && answer == 'real' && frontSelected.name != backSelected.name) { 
            correct = 4;
            score[turn] = 'lose';
        } else if (!answers.includes(bothHalves) && answer == 'fake') { 
            correct = 0;
            score[turn] = 'win';
        } else if (frontSelected.name == backSelected.name && answer == 'fake') {
            correct = 2;
            score[turn] = 'lose';
        } else if (frontSelected.name == backSelected.name && answer == 'real') {
            correct = 3;
            score[turn] = 'win';
        }

        if (cover) {
            cover.classList.add('hidden'); // Add the hidden class to trigger fade-out
            setTimeout(() => {
                cover.style.opacity = 1; // Set display to none after fading out
                cover.style.pointerEvents = 'all';
        }, 500); // Match this timeout with the CSS transition duration

        console.log(correct);
        console.log(score);
        turn++;
    }}

    function hideChecker() {
        const cover = document.getElementById('checker');

        if (cover) {
            cover.classList.remove('hidden'); // Add the hidden class to trigger fade-out
            setTimeout(() => {
                cover.style.opacity = 0; // Set display to none after fading out
                cover.style.pointerEvents = 'none';
        }, 0);

        setTimeout(function() {
            startSpin();
        }, 500);
        
    }}

    const countScore = (arr, val) =>
        arr.reduce((a, v) => (v === val ? a + 1 : a), 0);


</script>


<section class="game-area">
    <div class="titles">
        <h3 class="left">Nature's Oddities</h3>
        <div class="score-counter">
            {#each score as point}
                <span class="{point}"></span>
            {/each}
        </div>
        <h3 class="right">Vol.1</h3>
    </div>
    <div class="roller-area">
        <div class="rollers"></div>
        <div class="roller" id="left">
            <h4>{frontSelected.label}</h4>
            <p>{frontSelected.genus}</p>
            <SlotMachine 
                id="left" 
                spinTrigger={spinTrigger} 
                animals={animals} 
                frontAnimalName={frontSelected.name}  
            />
        </div>

        <div class="roller" id="right">
            <h4>{backSelected.label}</h4>
            <p>{backSelected.genus}</p>
            <SlotMachine 
            id="right" 
            spinTrigger={spinTrigger} 
            animals={animals} 
            backAnimalName={backSelected.name}
        />
        </div>
    </div>
    <div class="quiz-area">
        <!-- <button class="button" on:click={startSpin}>Start Slot Machine</button> -->
        <div class="check-buttons">
            <button class="button" on:click={() => checkAnswer("real", {frontSelected}, {backSelected})}>Real</button>
            <button class="button" on:click={() => checkAnswer("fake", {frontSelected}, {backSelected})}>Fake</button>
        </div>
    </div>

    <div class="cover" id="checker">
        <div class='popup' >
        
            {#if correct == 0}
                <h3>You got it!</h3>
                <p>A {frontSelected.name} has never bred with a {backSelected.name}.</p>
            {:else if correct == 1}
                <h3>Correct!</h3>
                <p>There actually have been {frontSelected.name} {backSelected.name} crossbreeds.</p>
            {:else if correct == 2}
                <h3>Correct!</h3>
                <p>That's just a {frontSelected.name}</p>
            {:else if correct == 3}
                <h3>Can't fool you...</h3>
                <p>That's just a {frontSelected.name}</p>
            {:else if correct == 4}
                <h3>Nope!</h3>
                <p>There has never been a half {frontSelected.name}, half {backSelected.name}.</p>
            {/if}
        
        {#if turn < 5}
            <button class="button" on:click={hideChecker}>Next round</button>

        {:else}
            <hr>
            {#if countScore(score, 'win') > 3}
                <h3>Good work!</h3>
                <p>You scored {countScore(score, 'win')} out of 5.</p>
                <button class="button" on:click={restartGame}>Another game?</button>
            {:else if countScore(score, 'win') < 3}
                <h3>Try harder</h3>
                <p>You scored {countScore(score, 'win')} out of 5.</p>
                <button class="button" on:click={restartGame}>Another game?</button>
            {:else}
                <h3>Not bad</h3>
                <p>You scored {countScore(score, 'win')} out of 5.</p>
                <button class="button" on:click={restartGame}>Another game?</button>
            {/if}
        {/if}
        </div>
    </div>

</section>

