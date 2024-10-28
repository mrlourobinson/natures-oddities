// place files you want to import through the `$lib` alias in this folder.
function startSpin() {

    frontIndex = Math.floor(Math.random() * (animals.length + 1))
    frontSelected = animals[frontIndex]

    backIndex = Math.floor(Math.random() * (animals.length + 1))
    backSelected = animals[backIndex]


    spinTrigger = true;
    // Reset the trigger after starting the spin
    setTimeout(() => spinTrigger = false, 100); // Prevent immediate retrigger
}