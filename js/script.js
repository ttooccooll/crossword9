(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			 	{
					clue: "Christmas decor responsible for many face slaps, although that's not the interaction it's known for",
					answer: "mistletoe",
					position: 1,
					orientation: "across",
					startx: 1,
					starty: 1
				},
			 	{
					clue: "This is where you store your popcorn at Christmas.",
					answer: "tin",
					position: 4,
					orientation: "across",
					startx: 8,
					starty: 3
				},
				{
					clue: "Nine down is one of these.",
					answer: "reindeer",
					position: 6,
					orientation: "across",
					startx: 1,
					starty: 4
				},
				{
					clue: "You'll need this if you're going to get your own Christmas tree.",
					answer: "axe",
					position: 7,
					orientation: "across",
					startx: 8,
					starty: 5
				},
				{
					clue: "One of three things I saw one Christmas morning",
					answer: "ship",
					position: 8,
					orientation: "across",
					startx: 2,
					starty: 6
				},
				{
					clue: "a roasted Christmas delicacy",
					answer: "chestnuts",
					position: 10,
					orientation: "across",
					startx: 1,
					starty: 8
				},
				{
					clue: "We only have two of these on the whole planet, and Santa only lives at one of them! It's more scarce than bitcoin!",
					answer: "pole",
					position: 12,
					orientation: "across",
					startx: 1,
					starty: 10
				},
				{
					clue: "Ralphy is going to do this to his own eye!",
					answer: "shoot",
					position: 13,
					orientation: "across",
					startx: 6,
					starty: 10
				},
				{
					clue: "This person wrote the earliest prophesy about the Messiah.",
					answer: "moses",
					position: 14,
					orientation: "across",
					startx: 4,
					starty: 12
				},
				{
					clue: "This resin is said to be one of the first Christmas presents.",
					answer: "myrrh",
					position: 1,
					orientation: "down",
					startx: 1,
					starty: 1
				},
				{
					clue: "In modern society, should we replace all of these with car horns in the classic Christmas song lyrics?",
					answer: "sleighbells",
					position: 2,
					orientation: "down",
					startx: 3,
					starty: 1
				},
				{
					clue: "These fellas build the toys.",
					answer: "elves",
					position: 3,
					orientation: "down",
					startx: 6,
					starty: 1
				},
				{
					clue: "While Tevye probably never celebrated Christmas, he certainly probably appreciated all of these things associated with it.",
					answer: "traditions",
					position: 4,
					orientation: "down",
					startx: 8,
					starty: 3
				},
				{
					clue: "just one of Christmas's nom de plumes",
					answer: "noel",
					position: 5,
					orientation: "down",
					startx: 10,
					starty: 3
				},
				{
					clue: "one of Snoopy's titles",
					answer: "pet",
					position: 9,
					orientation: "down",
					startx: 5,
					starty: 6
				},
				{
					clue: "the only Roman god on Santa's payrole",
					answer: "cupid",
					position: 10,
					orientation: "down",
					startx: 1,
					starty: 8
				},
				{
					clue: "It would be more convenient for Santa if all of the reindeer had _____ like Rudolph.",
					answer: "noses",
					position: 11,
					orientation: "down",
					startx: 6,
					starty: 8
				},
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)

let toggleState = 0;
let usdPrice = null;
let blockHeight = null;
let satFee = null;

async function fetchPrice() {
	try {
		const response = await fetch('https://mempool.space/api/v1/prices');
		const data = await response.json();
		usdPrice = data.USD.toFixed();
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchBlock() {
	try {
		const response = await fetch('https://blockchain.info/q/getblockcount');
		const data = await response.text();
		blockHeight = parseInt(data).toFixed(0);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchFee() {
	try {
		const response = await fetch('https://mempool.space/api/v1/fees/recommended');
		const data = await response.json();
		satFee = data.halfHourFee.toFixed();
		console.log(satFee);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function togglePrice() {
	if (!usdPrice) {
		await fetchPrice();
	}
	if (!blockHeight) {
		await fetchBlock();
	}
	if (!satFee) {
		await fetchFee();
	}

	const button = document.querySelector('.onesat');
	switch (toggleState) {
		case 0:
			button.textContent = `${blockHeight}`;
			break;
		case 1:
			button.textContent = `${satFee} sat/vB`;
			break;
		case 2:
			button.textContent = `$${usdPrice}`;
			break;
		case 3:
			button.textContent = '1sat=1sat';
			break;
	}
	toggleState = (toggleState + 1) % 4;
}