//images
let images = ["img/Dice-1.png", 
"img/Dice-2.png",
"img/Dice-3.png", 
"img/Dice-4.png",
"img/Dice-5.png",
"img/Dice-6.png"];
let dice = document.querySelectorAll("img");
//variabelen
let playerDie = [0, 0];
let player = 0;
let bankDie = [0, 0];
let bank = 0;
let credits = 100;
let message;
let guess;
let bid = 0;
let message1 = "";


//number generator
function diceRoll() {
    const num = Math.floor(Math.random() * 6 + 1);
    return num;
}
//shake wordt toegevoegd
function roll(die1, die2){
    dice.forEach(function(die){
        die.classList.add("shake");
    });
	//shake wordt geremoved
    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
        });
		//selects images for dice-1 and 2
        document.querySelector("#die-1").setAttribute("src", images[die1-1]);
        document.querySelector("#die-2").setAttribute("src", images[die2-1]);
		if (die1 == playerDie[0]){
			message1 = "U heeft " + playerDie[0] + " en " + playerDie[1];//player berekening
		}
		if (die1 == bankDie[0]){
			message1 = "De bank heeft " + bankDie[0] + " en " + bankDie[1];//bank berekening
		}
		document.querySelector("#total").innerHTML = message1;//totaal
    }, 450);
}

async function runGame() {
	if (credits > 0) {
		playerDie[0] = diceRoll();
		playerDie[1] = diceRoll();
		bankDie[0] = diceRoll();
		bankDie[1] = diceRoll();
		player = playerDie[0] + playerDie[1];
		bank = bankDie[0] + bankDie[1];
		roll(playerDie[0], playerDie[1])
		setTimeout(function(){
			guess = prompt("Gooit de bank hoger of lager?");
			const x = prompt("Wat is uw inleg:");
			bid = Number(x);
			roll(bankDie[0], bankDie[1]);
			setTimeout(function(){
				//hoger
				if (guess == "hoger") {
					if (player < bank) {
						alert("Je hebt gewonnen!");
						credits = credits + bid;
					} 
					else if (player > bank) {
						alert("Je hebt verloren!");
						credits = credits - bid;
					} else {
						alert("Niemand heeft gewonnen");
					}
				}
				//lager
				else if (guess == "lager") {
					if (player > bank) {
						alert("Je hebt gewonnen!");
						credits = credits + bid;
					} 
					else if (player < bank) {
						alert("Je hebt verloren!");
						credits = credits - bid;
					} 
					else {
						alert("Niemand heeft gewonnen");
					}
				} else {
					alert("Je typte geen hoger of lager, we beginnen opnieuw.");
				}
		
				alert("Je hebt " + credits + " credits");
			}, 500)
		}, 500);	
	}
	else {
		messageNoCredit = "Je hebt niet genoeg credits. Refresh de pagina om opnieuw te beginnen.";
		alert(messageNoCredit);
	}
}
roll(1,1);