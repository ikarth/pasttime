const playerNameGrammar = {
"origin": "#firstName# #lastName#",
"firstName": ["Seabright", "Max", "Nic", "Alex", "Mel", "Jason", "Cat", "Kate", "Jacob", "Jacan", "Aaron", "Telephone", "Katie", "Barrett", "Jasmine", "Sam", "Stella", "Stacey", "Kyle", "Asiiah", "Dani", "Erica", "Tammy", "Shawn"],
"lastName": ["Camerata", "Kreminski", "Jessica", "Phoneme", "Stigmata", "Pattern", "Wolfenstein", "Short", "Wyeth", "Bones", "Tooth", "Fysher", "Lancaster", "Montgimery", "Montgomery"]
}

function createRandomPlayer() {
    // const personality = {
        //     diligence: 0.019,
        //     fear: 0.0,
        //     distractibility: 0.05,
        //     teeth: 32,
        //     twitchiness: 0.41,
        //     edge: 0.9,
        //     areodynamics: 0.51,
        //     gumption: 0.5,
        //     grit: 0.5
        // };

    const personality = {
            diligence: Phaser.Math.FloatBetween(0.0, 1.0),
            fear: Phaser.Math.FloatBetween(0.0, 0.4),
            distractibility: Phaser.Math.FloatBetween(0.0, 1.0),
            teeth: 32,
            twitchiness: Phaser.Math.FloatBetween(0.0, 1.0),
            edge: Phaser.Math.FloatBetween(0.0, 1.0),
            areodynamics: Phaser.Math.FloatBetween(0.0, 1.0),
            gumption: Phaser.Math.FloatBetween(0.0, 1.0),
            grit: Phaser.Math.FloatBetween(0.0, 1.0),
            fuse: Phaser.Math.FloatBetween(0.0, 1.0)
        };

    return {
    	"name": tracery.createGrammar(playerNameGrammar).flatten("#origin#"),
    	"personality": personality
    }
}

//const teamNameList = ["Akron Aliens 👽", "Saskatoon Steelmen 🦾", "Fremont Foxes🦊", "Nacogdoches No 🙅‍♀️", "Eureka Euphemisms 🙊", "Toronto Teeth 🦷", "West Lafayette Wildebeests 🦬", "Kalamazoo Koalas 🐨", "Milwaukee Marxists 🥸", "Hadleyburg Haze 😶‍🌫️"];
const teamNameList = ["Akron Aliens", "Saskatoon Steelmen", "Fremont Foxes", "Nacogdoches No", "Eureka Euphemisms", "Toronto Teeth", "West Lafayette Wildebeests", "Kalamazoo Koalas", "Milwaukee Marxists", "Hadleyburg Haze"];

function CreateTeam(teamName) {
	const playerList = [];
	const teamSize = 5;

	const numPlayers = teamSize;
    for(let i = 0; i < numPlayers; i++) {
    	const player = createRandomPlayer();
    	playerList.push(player);
    }
    return {
    	"roster": playerList,
    	"name": teamName
    }
}

const teamList = [];
for(name of teamNameList) {
	teamList.push(CreateTeam(name));
}
for(team of teamList) {
	console.log(team);
}