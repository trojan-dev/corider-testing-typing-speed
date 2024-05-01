
// Global variables
const keyboardChars = "1234567890_qwertyuiop_asdfghjkl_zxcvbnm"
let letterCount = 0;
let TIMER_COUNT = 60;
let timerInstance = null;
const subjects = ['the cat', 'a dog', 'my friend', 'the sun', 'a tree', 'the joker'];
const verbs = ['runs', 'jumps', 'eats', 'sleeps', 'flies', 'performed a magic show'];
const adverbs = ['quickly', 'slowly', 'happily', 'carefully', 'quietly', 'hastingly'];
const adjectives = ['happy', 'big', 'friendly', 'beautiful', 'clever', 'funny'];


// Functions
function generateRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function generateSentence() {
    const subject = generateRandomWord(subjects);
    const verb = generateRandomWord(verbs);
    const adverb = generateRandomWord(adverbs);
    const adjective = generateRandomWord(adjectives);

    return `${subject} ${verb} ${adverb} because it is ${adjective}`;
}

function generateInfiniteSentence() {
    const wordsPromise = new Promise((resolve) => {
        let sentence = '';
        const startTime = Date.now();

        const interval = setInterval(() => {
            sentence += generateSentence() + ' ';
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= 4000) {
                clearInterval(interval);
                console.log(`${sentence.length} words generated in 5 seconds`);
                resolve(sentence)
            }
        }, 150);
    })
    return wordsPromise;
}

const beginBtn = document.getElementById("begin");
const loadingText = document.querySelector("button ~ p");
const wordsContainer = document.getElementById("words");
const keys = document.getElementById("keys-wrapper");
const timer = document.getElementById("timer");
const resetBtn = document.getElementById("reset");


// Keyboard key press listener
document.addEventListener('keydown', (e) => {
    const key = e.key;
    const firstLetterSpan = document.querySelector("#words").children[0];
    if (firstLetterSpan.innerHTML === "&nbsp;" && key !== " ") {
        return;
    }
    if (key === firstLetterSpan.textContent || firstLetterSpan.innerHTML === "&nbsp;") {
        if (firstLetterSpan.innerHTML !== "&nbsp;") {
            letterCount++
        }
        firstLetterSpan.remove();
    }

    const keyInDOM = document.querySelector(`[data-value="${key}"]`);
    if (keyInDOM) {
        keyInDOM.style.backgroundColor = 'lightgreen';
        setTimeout(() => {
            keyInDOM.style.backgroundColor = 'transparent'
        }, 200)
    }

})

// Start test button
beginBtn.addEventListener('click', async (e) => {
    e.target.disabled = true;
    loadingText.textContent = "Please wait while the sentence loads..."
    const sentence = await generateInfiniteSentence();
    const sentenceArr = sentence.split(" ");
    sentenceArr.forEach(word => {
        word.split("").forEach(letter => {
            const span = document.createElement("span");
            span.textContent = `${letter}`
            wordsContainer.appendChild(span);
        })
        const spaceContent = document.createElement('span');
        spaceContent.innerHTML = `&nbsp;`
        wordsContainer.appendChild(spaceContent);

    })
    loadingText.textContent = "";
    const keysArr = keyboardChars.split("_");
    keysArr.forEach((keySet) => {
        const div = document.createElement('div');
        keySet.split("").forEach(key => {
            const button = document.createElement("button");
            button.textContent = key;
            button.classList.add("keyboard-key")
            button.setAttribute('data-value', key);
            div.append(button);
        })
        keys.append(div);
    })
    timerInstance = setInterval(() => {
        if (TIMER_COUNT < 0) {
            clearInterval(timerInstance);
            alert(`You typed ${letterCount} letters in 60 seconds`)
            window.location.reload();
            return false;
        }
        timer.textContent = TIMER_COUNT;
        TIMER_COUNT--;
    }, 1000)


}, { once: true })

// Event delegation for the keys
keys.addEventListener('click', (e) => {

    const key = e.target.getAttribute('data-value');
    const firstLetterSpan = document.querySelector("#words").children[0];
    if (firstLetterSpan.innerHTML === "&nbsp;" && key !== " ") {
        return;
    }
    if (key === firstLetterSpan.textContent || firstLetterSpan.innerHTML === "&nbsp;") {
        if (firstLetterSpan.innerHTML !== "&nbsp;") {
            letterCount++
        }
        firstLetterSpan.remove();
    }


    e.target.style.backgroundColor = 'lightgreen';
    setTimeout(() => {
        e.target.style.backgroundColor = 'transparent'
    }, 200)

})

// Reset button
resetBtn.addEventListener('click', () => {
    window.location.reload();
})




