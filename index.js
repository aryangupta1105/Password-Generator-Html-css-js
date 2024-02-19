const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-displayLength]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copyBtn]")
const copyMsg = document.querySelector("[data-copyMsg]")
const upperCheck = document.querySelector("#Upper")
const lowerCheck = document.querySelector("#Lower")
const numCheck = document.querySelector("#Num")
const symbolCheck = document.querySelector("#Symbols")
const indicator = document.querySelector("[data-indicator]")
const generateBtn = document.querySelector("[data-generateBtn]")
const allCheckBox = document.querySelectorAll("input[type=checkbox]")

let password = "";
let checkCount = 0;
let passwordLength = 10;


// Handling Slider function 
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength;
}


const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Random Lowercase Letter 
function generateRandomLowercase() {
    return String.fromCharCode(generateRandom(97, 123));
}

// Random Lowercase Letter 
function generateRandomUppercase() {
    return String.fromCharCode(generateRandom(65, 91));
}

// Random Number 
function generateRandomNumber() {
    return generateRandom(1, 10);
}

// Generate Symbol 
function generateRandomSymbol() {
    let index = generateRandom(0, symbol.length-1);
    return symbol[index];
}



// function to Calculate Strength :
function setIndicator(color)
{
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}


setIndicator("#ccc");

function CalculateStrength()
{
    hasUpper = false;
    hasLower = false;
    hasNum = false;
    hasSymbol = false;

    if (upperCheck.checked) hasUpper = true;
    if (lowerCheck.checked) hasLower = true;
    if (numCheck.checked) hasNum = true;
    if (symbolCheck.checked) hasSymbol = true;

    
    if (hasUpper && hasLower && (hasNum || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

// copy Content function:

async function copyContent()
{
    try
    {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMsg.innerText = "Copied";
    }
    catch(e)
    {
        copyMsg.innerText = "failed";
    }
    // in css we will create active to change opacity to 1
    copyMsg.classList.add("active");

    // setting timeout function to hide after 2s by removing the active class:
    setTimeout(()=>
    {
        copyMsg.classList.remove("active");
    });
}


// Adding event listeners to the buttons and sliders

copyBtn.addEventListener("click" , ()=>
{
    if(passwordDisplay.value)
    {
        copyContent();
    }
});
// ------------------------------------ 

// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// Shuffle the array randomly - Fisher Yates Method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// adding event listener to the slider:
inputSlider.addEventListener("input" , (event)=>
{
    passwordLength = event.target.value;
    handleSlider();
})

// Creating handleCheckbox Function();

function handleCheckbox()
{
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>
    {
        if (checkbox.checked)
        checkCount++;
    })
}

allCheckBox.forEach((checkbox)=>
{
    checkbox.addEventListener("click" , handleCheckbox);
});



// Generate password button Adding event listeners:

generateBtn.addEventListener("click" , ()=>
{
    if( checkCount <= 0)
        return ;
    if(passwordLength < checkCount) {passwordLength = checkCount; handleSlider();}
    console.log(passwordLength);
    // removing previous password:
    password = "";


    let funArray = [];
    if (upperCheck.checked) funArray.push(generateRandomUppercase);
    if (lowerCheck.checked) funArray.push(generateRandomLowercase);
    if (numCheck.checked) funArray.push(generateRandomNumber);
    if (symbolCheck.checked) funArray.push(generateRandomSymbol);
    
        // Compulsory generation:
    for(let i = 0; i<funArray.length; i++)
    {
        password += funArray[i]();
    }

    // Remaining addition:
    for (let i = 0; i<passwordLength - checkCount ; i++)
    {
        let randIndex = generateRandom(0,funArray.length);
        password += funArray[randIndex]();
    }

    // Shuffling the password:
    password = shuffle(Array.from(password));

    passwordDisplay.value = password;
    // calculating the strength:
    CalculateStrength();
    console.log(password);
})