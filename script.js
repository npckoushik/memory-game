let clickedCard = null;
let preventClick = false;
let pairs = 0;
let noOfClicks = 0;
let btnContainer = document.getElementById("button-container");
const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "violet",
    "pink",
    "skyblue"
]
const cards = [...document.querySelectorAll('.card')];
for(let color in colors) {
    const cardAIndex = parseInt(Math.random() * cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex,1);
    cardA.className += ` ${colors[color]} `;
    cardA.setAttribute('data-color', color);

    const cardBIndex = parseInt(Math.random() * cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex,1);
    cardB.className += ` ${colors[color]} `;
    cardB.setAttribute('data-color', color);
}
function onCardClick(event) {
    console.log("fn called")
    let target = event.currentTarget;
    if(preventClick || target === clickedCard || target.className.includes('done')) {
        return;
        console.log("1st if")
    }
    target.className = target.className.replace('hidden','').trim();
    console.log("out of 1st if")
    target.classList.add('done');
    if(!clickedCard) {
        clickedCard = target;
    } else if(clickedCard) {
        
        if(clickedCard.getAttribute('data-color') != target.getAttribute('data-color')) {
            preventClick = true;
            setTimeout(()=>{
                clickedCard.className = clickedCard.className.replace('done','').trim();
                clickedCard.classList.add('hidden');
                target.className = target.className.replace('done','').trim();
                target.classList.add('hidden');
                clickedCard = null;
                preventClick = false;
            },500);
        }
        else {
            pairs++;
            clickedCard = null;
            if(pairs == 8) {
                document.getElementById("result").innerHTML = '<span id="winMsg">You WIN!!<span><br>Total number of clicks = '+noOfClicks;
            }
        }
    }
    if(pairs < 8) {
        noOfClicks++;
        document.getElementById("result").innerHTML = "Clicks : "+noOfClicks;
    }
    btnContainer.style.display = "block";
}