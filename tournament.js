function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function makeTournament(teams) {
	const tourny = {};
	tourny.teams = teams;
	tourny.gameRecords = [];
	tourny.rounds = [];
	for (const t of tourny.teams) {
		t.wins = 0;
		t.losses = 0;
		t.swissPoints = 0;
		t.byeCount = 0;
		t.pastOpponets = [];
	}

	tourny.teams = shuffle(tourny.teams);
	tourny.winner = false;
	tourny.eliminated = [];

	return tourny;
}

function updateByName(arr, name, key, val) {
	const i = arr.findIndex(a => a.name == name);
	arr[i][key] = val;
	return arr;
}

function makeNextEliminationTournamentRound(tourny) {
	const eliminate = tourny.teams.filter((t) => { return t.losses > 0;});
	tourny.teams = tourny.teams.filter((t) => { return t.losses == 0;});
	tourny.eliminated = tourny.eliminated.concat(eliminate);
	tourny.games = [];
	tourny.teams = shuffle(tourny.teams);

	if(tourny.teams.length == 1) {
		tourny.winner = tourny.teams[0];
		console.log(`${tourny.winner.name} wins the tournament.`);
		return tourny;
	}
	
	const pairs = [];
	if(tourny.teams.length % 2 != 0) {
		tourny.teams.push({"name": null, "losses": 999});
	}
	for(let index = 0; index < tourny.teams.length; index+=2) {
		const pair = [tourny.teams[index], tourny.teams[index+1]];
		pairs.push(pair);
	}

	for(const p of pairs) {
		tourny.games.push(p);
	}
	return tourny;
}

function playTournamentGames(tourny) {
	for(const g of tourny.games) {
		
		if(g[1].name == null) {
			const winner = 0;
			const winCount = g[winner].wins + 1;
			const swissCount = g[winner].swissPoints + 1;
			tourny.teams = updateByName(tourny.teams, g[winner].name, "wins", winCount);
			tourny.teams = updateByName(tourny.teams, g[winner].name, "swissPoints", swissCount);
			
			console.log(`the ${g[winner].name} have a bye`);	
		} else {
			const winner = 0;
			const winCount = g[winner].wins + 1;
			const swissCount = g[winner].swissPoints + 1;
			
			tourny.teams = updateByName(tourny.teams, g[winner].name, "wins", winCount);
			tourny.teams = updateByName(tourny.teams, g[winner].name, "swissPoints", swissCount);
			
			const loser = 1;
			const lossCount = g[loser].losses + 1;
			tourny.teams = updateByName(tourny.teams, g[loser].name, "losses", lossCount);	 
			console.log(`the ${g[winner].name} beat the ${g[loser].name}`);	
		}
		
	}
	return tourny;
}

let test_tourny = makeTournament(teamList)

while(test_tourny.winner == false) {
	test_tourny = makeNextEliminationTournamentRound(test_tourny);
	test_tourny = playTournamentGames(test_tourny);
	console.log(test_tourny);
}
