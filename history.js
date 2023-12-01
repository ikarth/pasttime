function extractBindingsToGrammar(e) {
	let bind = {}
	for(const [key, value] of Object.entries(e.bindings)) {
		bind[key.slice(1)] = "" + value;
	}
	return bind;
}

function scoreAnyGoalFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p><strong>#comment#</strong></p>';
	//binds.comment = [
	//	`The last player to touch the puck before that goal for the #team1# was #actor#.`
	//	];
	binds.puck = [
		"puck", "careening puck", "wild puck"];
	if (binds.actor == "no one") {
		binds.comment = [
			`The #puck# goes in to the #team1# goal!`,
			`The #puck# went into the net! It's the #team1#'s point!`
		];
	}
	return tracery.createGrammar(binds);
}

function scoreGoalFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p><strong>#comment#</strong></p>';
	binds.comment = [
		`#actor# takes the shot. The #team1# score!`, 
		`Scoring for the #team1#, was #actor#.`
		];
	binds.puck = [
		"puck", "careening puck", "wild puck"];
	if (binds.actor == "no one") {
		binds.comment = [
			`The #puck# goes in to the #team1# goal!`,
			`The #puck# went into the net! It's the #team1#'s point!`
		];
	}
	return tracery.createGrammar(binds);
}

function sportsGameBeginTournamentFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<h1>#headline#</h1><h2><em>A Novel</em></h2><p>#comment#</p>';
	binds.comment = ["Welcome to the Hlockey International Playoffs. We've got a lot of games ahead of us."];
	binds.headline = "The Hlockey Playoffs";
	//binds.gameNum = "" + globalGameCount; 
	console.log(binds);
	return tracery.createGrammar(binds);
}

function sportsTeamJoinTournamentFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = ["We've got the #teamName#.", "The #teamName# are here.", "Look forward to seeing the #teamName# on the ice.", "The #teamName# are ready to take on their traditional rivals.", "Of course we've got the #teamName#.", "The #teamName# have been strong this year.", "The #teamName# made it in to the playoffs.", "The #teamName# are considered to be contenders.", "The #teamName# are here.", "The #teamName# are ready to go.", "We'll be broadcasting the next game for the #teamName#, so stay tuned."];
	binds.headline = "The Hlockey Playoffs";
	//binds.gameNum = "" + globalGameCount; 
	console.log(binds);
	return tracery.createGrammar(binds);
}

function sportsWinTournament(e) {
const binds = extractBindingsToGrammar(e);
	binds.origin = '<h2>#comment#</h2>';
	binds.comment = ["#winTeam# wins the Hlockey Tournament!"];
	binds.headline = "The Hlockey Playoffs";
	return tracery.createGrammar(binds);	
}

function sportsGameStartFunc(e) {
	// const homeTeam = e.bindings['?homeTeam'];
	// const awayTeam = e.bindings['?awayTeam'];
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<h2>#headline#</h2><p>#comment#</p>';
	binds.punct = [".", "!", "...", ".", ".", "!", "."];
	binds.remark = ['Let\'s go#punct#', "Let's see how these teams do.", "It's a beautiful day for Hlockey#punct#", "", "The teams are lining up#punct#", "That was a beautiful rendition of the national anthem.", "Game on#punct#", "Here we go#punct#", "It's time for some Hlockey#punct#"];
	binds.tour = ['This is round #tournamentRound# in the playoffs.', 'Tournament round #tournamentRound#.', 'Round #tournamentRound# of the tournament.', 'Round #tournamentRound# of the playoffs.'];
	binds.comment = ["Welcome to #homeTeam# vs. #awayTeam#. #tour# #standings# #remark#"];
	binds.headline = "Game #gameNum#: #homeFancyName# vs. #awayFancyName#";
	binds.standings = "#homeStandings# #awayStandings#";
	binds.homeStandings = "The #homeTeam# currently have #homeWins# wins and #homeLosses# losses. #homeDanger#";
	binds.awayStandings = "The #awayTeam# currently have #awayWins# wins and #awayLosses# losses. #awayDanger#";
	binds.homeDanger = "";
	binds.awayDanger = "";
	homeLoss = parseInt(binds.homeLosses, 10);
	awayLoss = parseInt(binds.awayLosses, 10);
	dangerPhrase = [["They are undefeated.", "That's a solid position.", "They are in good shape.", "They have a big safety net."], ["They don't have much room for error, but they can afford one more loss.", "Overall, they're fine."], ["They can't afford to lose any more."]];
	binds.homeDanger = dangerPhrase[homeLoss];
	binds.awayDanger = dangerPhrase[awayLoss];

	//binds.gameNum = "" + globalGameCount; 
	console.log("sportsGameStart", binds);
	return tracery.createGrammar(binds);
}
// (pattern sportsGameStart
//   (event ?e1 where
//     event: sportsGameStart
//     homeTeam: ?homeTeam
//     awayTeam: ?awayTeam
//     ))

function sportsScoreReportFunc(e) {
	const binds = extractBindingsToGrammar(e);
	// const homeTeam = e.bindings['?homeTeam'];
	// const awayTeam = e.bindings['?awayTeam'];
	// const homeScore = e.bindings['?homeScore'];
	// const awayScore = e.bindings['?awayScore'];
	binds.origin = '<p>#comment#</p>';
	binds.comment = [
		"The score stands at #homeTeam# #homeScore#, #awayTeam# #awayScore#.",
		"Current score, #homeTeam# #homeScore#, #awayTeam# #awayScore#."
		];
	return tracery.createGrammar(binds);
}
const sportsScoreReportPattern = `
(pattern sportsScoreReport
 (event ?e1 where
   event: sportsScoreReport
   homeTeam: ?homeTeam
    awayTeam: ?awayTeam
    homeScore: ?homeScore
    awayScore: ?awayScore
    ))`;

// (pattern sportsScoreReport
//  (event ?e1 where
//    event: sportsScoreReport
//    homeTeam: ?homeTeam
//     awayTeam: ?awayTeam
//     scoreHome: ?homeScore
//     scoreAway: ?awayScore
//     ))

function sportsGameEndFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = ["Game over. Final score, #homeTeam# #homeScore#, #awayTeam# #awayScore#"];
	return tracery.createGrammar(binds);
}
// (pattern sportsGameEnd
//  (event ?e1 where
//    event: sportsGameEnd
//    homeTeam: ?homeTeam
//    awayTeam: ?awayTeam
//    scoreHome: ?homeScore
//    scoreAway: ?awayScore
//     ))

function sportsGameEndWinFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = ["The #winTeam# are now #winnerWins#-#winnerLosses#. The #loseTeam# are #loserWins#-#loserLosses#."];
	return tracery.createGrammar(binds);
}

function sportsTeamEliminatedFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<h3><strong><code>#comment#<code><strong></h3>';
	binds.comment = ["The #loseTeam# are eliminated from the playoffs."];
	return tracery.createGrammar(binds);
}

function sportsGamePeriodStartFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = ["We're starting period #periodNum#."];
	return tracery.createGrammar(binds);
}
// (pattern sportsGamePeriodStart
//  (event ?e1 where
//    event: sportsGamePeriodStart
//     homeTeam: ?homeTeam
//     awayTeam: ?awayTeam
//     scoreHome: ?homeScore
//     scoreAway: ?awayScore
//     ))

function sportsPlayerCollisionFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p style=\"color:red\">#comment#</p>';
	binds.knock = "";
	binds.comment = ["#attacker# slams in to #defender##knock#."];
	if((binds.attacker == "Nobody") || (binds.defender == "Nobody")) {
		binds.comment = "";
	}
	if ((Number(binds.hitDamage)) < 1) {
		binds.comment = ""
	} else {
		binds.knock = " and knocks out #hitDamage# teeth"
	}
	return tracery.createGrammar(binds);
}

function sportsTeamRemainsFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p><code>#comment#</code></p>';
	binds.comment = ["The #team# are still in the tournament, with #wins# wins and #losses# losses."];
	return tracery.createGrammar(binds);
}
// (pattern sportsTeamRemains
// (event ?e1 where
// event: sportsTeamRemains
// team: ?team
// wins: ?wins
// losses: ?losses
// tournamentRound: ?round
// ))

function sportsGameEndByeFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p><code>#comment#</code></p>';
	binds.comment = ["The #team# have a bye for round #round#."];
	return tracery.createGrammar(binds);
}
// (pattern sportsGameEndBye
// (event ?e1 where
// event: sportsGameEndBye
// byeTeam: ?team
// tournamentRound: ?round))    

function arenaOutOfBoundsFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p style=\"color:grey\">#comment#</p>';
	binds.comment = ["#actor# is sent to limbo.", "#actor# was knocked out of the rink."];
	return tracery.createGrammar(binds);
}

function arenaInOfBoundsFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p style=\"color:grey\">#comment#</p>';
	binds.comment = ["#actor# returns to the rink."];
	return tracery.createGrammar(binds);
}

// (pattern arenaOutOfBounds
//     (event ?e1 where
//     event: arenaOutOfBounds
//     place: ?place
//     actor: ?actor
//     actorTeam: ?actorTeam))

//     (pattern arenaInOfBounds
//     (event ?e1 arenaInOfBounds
//       event: arenaInOfBounds
//       place: ?place
//       actor: ?actor
//       actorTeam: ?actorTeam
//     ))

// (pattern sportsPlayerCollision
//     (event ?e1 where
//     event: sportsPlayerCollision
//     hitDamage: ?hitDamage,
//     attacker: ?attacker,
//     defender: ?defender
//     ))

function sportsTeamStartingLineupFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.intro = ['Playing for the #team# are', 'Playing for the #team# we have', 'The #team# have a starting lineup of', 'Starting for the #team# are', 'The starting lineup for the #team# consists of']
	binds.comment = ["#intro# are #player0#, #player1#, #player2#, #player3#, and #player4#."];
	return tracery.createGrammar(binds);
}

// (pattern sportsTeamStartingLineup
// (event ?e1 where
//    event: sportsTeamStartingLineup
//    team: ?team
//    player0: ?player0
//    player1: ?player1
//    player2: ?player2
//    player3: ?player3
//    player4: ?player4
//     ))

function sportsGamePeriodEndFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = ["And that's the end of period #currentPeriod#; the score is #homeTeam# #homeScore#, #awayTeam# #awayScore#."];
	return tracery.createGrammar(binds);
}
// (pattern sportsGamePeriodEnd
// (event ?e1 where
//    event: sportsGamePeriodEnd
//    homeTeam: ?homeTeam
//     awayTeam: ?awayTeam
//     scoreHome: ?homeScore
//     scoreAway: ?awayScore))

function sportsGamePeriodOvertimeFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = ["We're going into overtime. The multiball rule is in effect. The score is tied at #homeTeam# #homeScore#, #awayTeam# #awayScore#"];
	return tracery.createGrammar(binds);
}
// (pattern sportsGamePeriodOvertime
// (event ?e1 where
//    event: sportsGamePeriodOvertime
//    homeTeam: ?homeTeam
//     awayTeam: ?awayTeam
//     scoreHome: ?homeScore
//     scoreAway: ?awayScore))

function scoreGoalOtherFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.debug = "#team1# vs. #team2# ";
	binds.debug = ""; 
	binds.origin = '<p>#debug#<strong>#comment#</strong></p>';
	binds.shoots = ["shoots", "hits the puck", "tries to line up the shot", "connects", "hits it", "takes a swipe", "bats it with the stick"];
	binds.the_puck = ["the puck", "the puck", "the hot puck", "the puck", "the biscuit", "the puck", "it"];
	binds.comment = ["#actor# #shoots#, but #the_puck# goes in the other team's net! A point for the #team1#!",
		"The #team2#'s #actor# #shoots#, #the_puck# goes wild, into #team1#'s net!",
		"Well, that's embarassing. #actor# just managed to hit #the_puck# into the #team1#'s goal!"];
	return tracery.createGrammar(binds);
	return "";
}

// (pattern scoreGoalOtherTeam
//   (event ?e1 where
//     event: sportsPlayerHitsPuck,
//     target: ?puck
//     actor: ?actor
//     actorTeam: ?team2)
//   (event ?e2 where
//     event: sportsGoalScored
//     target: ?puck
//     actor: ?actor
//     scoringTeam: ?team1
//     (not= ?team1 ?team2))
//   (unless-event ?eMid between ?e1 ?e2 where
//     target: ?puck
//     event: sportsPlayerHitsPuck)
//     )

function randomHit() {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.oof = ["Oof", "Ouch", "Yeesh", "Youch"];
	binds.oofpunct = [".", "!"];
	binds.oofremark = ["That looked painful.", "Looks like that hurt.", "That's gonna leave a mark."];
	binds.comment = [`#oof##oofpunct# #oofremark#`];
	return tracery.createGrammar(binds);
}

function randomCommentary(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.oof = ["Oof", "Ouch", "Yeesh", "Youch"];
	binds.oofpunct = [".", "!"];
	binds.oofremark = ["That looked painful.", "Looks like that hurt.", "That's gonna leave a mark."];
	binds.vague = ["I can't believe what I'm watching", "This is getting intense", "They're gonna remember that one", "I can hardly keep up", "The #team1# are keeping them off balance", "The #team1# are keeping the pressure on", "You don't see that in videogames", "You saw it here, folks", "That's gonna throw them for a loop", "They're on their game tonight", "That's a unique way to play", "You don't see that every day", "Let's see if that works out for them", "None of you are free of sin", "What is this, a team of clowns", "That was exceptional", "That sucked", "What is this shit", "Looks like it'll be a long game for #team1#"];
	binds.sponsormessage = ["The Maple Syrup Distillers Association: We Stab Trees.",
		"Moose. Oh god its on the road.",
		"The Film Board of Canada.",
		"Hlockey: the sport of random ultraviolence.",
		"The National Hlockey League.",
		"The Muppets: Sex and Violence. Coming to a theater near you.",
		"It's Alex's birthday! Happy birthday Alex!",
		"Pluto: It's not a planet...yet.",
		"The Birds. This is for'em.",
		"The Toronto Dentists Guild.",
		"The Charismatic Megafauna Preservation Society.",
		"The Association for the Awareness of Seasonal Aggression Disorder."];
	binds.comment = [`#oof##oofpunct# #oofremark#`,
		"#vague##oofpunct#", "#vague##oofpunct#",
		"",
		"",
		"",
		"",
		"The #team1# are on the move",
		`And now for a word from our sponsor: #sponsormessage#`];
	return tracery.createGrammar(binds);
}

function passThePuckFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.debug = "<em>#actor1#->#actor2#</em>";
	binds.debug = "";
	binds.origin = '<p>#debug##comment#</p>';
	if (Math.random() < 0.4) {
		//binds.origin = "";
	}
	if (Math.random() < 0.3) {
		return randomCommentary(e);
	}
	binds.passes = ["passes", "executes a clean pass", "cycles", "does the give-and-go", "exchanges", "passes", "goes tape to tape", "makes a filthy pass", "makes a pass", "makes a clean pass"];
	binds.comment = [
		"The #team1#'s #actor1# #passes# to #actor2#.",
		"Good pass from #actor1# to #actor2#.",
		"Keeping the momentum going, #actor1# #passes# to #actor2#.",
		"The puck is passed to #actor2#.",
		"#actor1# sends the puck laterally. Picked up by #actor2#.",
		"#actor1# #passes# to #actor2#.",
		"#actor1# sends the puck laterally. Picked up by #actor2#.",
		"#actor1# #passes# to #actor2#.",
		"#actor1# #passes# to #actor2#.",
		"#actor1# #passes# to #actor2#.",
		"#actor1# #passes# to #actor2#.",
		"#actor1# #passes# to #actor2#.",
		"#actor1# #passes#, #actor2# picks it up.",
		"#actor1# #passes#.",
		"A pass to #actor2#.",
		"A pass by #actor1#.",
		"A pass to #actor2#.",
		"A pass by #actor1#.",
		];
	return tracery.createGrammar(binds);
}

 // (pattern passThePuck
 //  (event ?e1 where
 //    event: sportsPlayerHitsPuck,
 //    target: ?puck
 //    actor: ?actor1
 //    actorTeam: ?team1)
 //  (event ?e2 where
 //    event: sportsPlayerHitsPuck,
 //    target: ?puck
 //    actorTeam: ?team1
 //    actor: ?actor2)
 //  (unless-event ?eMid between ?e1 ?e2 where
 //    target: ?puck
 //    event: arenaPuckResetToCenter)
 //  ;;(unless-event ?eMid between ?e1 ?e2 where
 //  ;;  target: ?puck
 //  ;;  event: sportsPlayerHitsPuck)
 //    )

function stealThePuckFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.debug = "<em>#team1#->#team2#</em>";
	binds.debug = "";
	binds.origin = '<p>#debug##comment#</p>';
	binds.comment = [
		"The #team2# have control of the puck!",
		"#actor2# steals the puck from the #team1#!",
		"#actor2# steals the puck from #actor1#!",
		"That's a steal as #actor2# takes control of the puck from the #team1#!",
		"That's a steal as #actor2# takes control of the puck!",
		"#actor2# steals the puck from #actor1# of the #team1#!",
		"#actor2# steals the puck from #actor1#; now the #team2# are on the offense!",
		"#actor2# steals the puck from #actor1#! The #team2# have the puck!",
		"That's a steal as #actor2# of the #team2# takes control of the puck!",
		"#actor2# of the #team2# steals the puck from #actor1# of the #team1#!",
		"#actor2# of the #team2# steals the puck from #actor1#; now the #team2# are on the offense!",
		"The #team2#'s #actor2# steals the puck from #actor1#! The #team2# have the puck!",
		];
	return tracery.createGrammar(binds);
}

 // (pattern stealThePuck
 //  (event ?e1 where
 //    event: sportsPlayerHitsPuck,
 //    target: ?puck
 //    actor: ?actor1
 //    actorTeam: ?team1)
 //  (event ?e2 where
 //    event: sportsPlayerHitsPuck,
 //    target: ?puck
 //    actorTeam: ?team2
 //    actor: ?actor2
 //    (not= ?team1 ?team2))
 //  (unless-event ?eMid between ?e1 ?e2 where
 //    target: ?puck
 //    event: arenaPuckResetToCenter)
 //  ;;(unless-event ?eMid between ?e1 ?e2 where
 //  ;;  target: ?puck
 //  ;;  event: sportsPlayerHitsPuck)
 //    )

function scoreGoalAssistFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = [`Assist by #actor1#, passing to #actor2#.`,
		`#actor1# passed to #actor2#, setting up the score.`];
	return tracery.createGrammar(binds);
}

 // (pattern scoreGoalAssist
 //  (event ?e1 where
 //    event: sportsGoalAssist,
 //    targetPlayer: ?actor2
 //    sourcePlayer: ?actor1
 //    sourceTeam: ?team1
 //    targetTeam: ?team2))

// (pattern scoreGoalAssist
//   (event ?e1 where
//     event: sportsPlayerHitsPuck,
//     target: ?puck
//     actor: ?actor1
//     actorTeam: ?team1)
//   (event ?e2 where
//     event: sportsPlayerHitsPuck,
//     target: ?puck
//     actor: ?actor2
//     actorTeam: ?team1
//     (not= ?actor1 ?actor2))
//   (event ?e3 where
//     event: sportsGoalScored,
//     target: ?puck
//     actor: ?actor2)
//   (unless-event ?eMid between ?e1 ?e3 where
//     target: ?puck
//     event: arenaPuckResetToCenter)
//   (unless-event ?eMid between ?e1 ?e3 where
//     target: ?puck
//     event: sportsPlayerHitsPuck
//     actor: ?actor3
//     (not= ?actor3 ?actor1))
//   )   

const commentaryFunctions = {
	"scoreGoal": scoreGoalFunc,
	"scoreAnyGoal": scoreAnyGoalFunc,
	"scoreGoalOtherTeam": scoreGoalOtherFunc,
	"passThePuck": passThePuckFunc,
	"scoreGoalAssist": scoreGoalAssistFunc,
	"stealThePuck": stealThePuckFunc,
	"sportsGameStart": sportsGameStartFunc,
	"sportsScoreReport": sportsScoreReportFunc,
	"sportsGameEnd": sportsGameEndFunc,
	"sportsGamePeriodStart": sportsGamePeriodStartFunc,
	"sportsGamePeriodEnd": sportsGamePeriodEndFunc,
	"sportsGamePeriodOvertime": sportsGamePeriodOvertimeFunc,
	"sportsTeamStartingLineup": sportsTeamStartingLineupFunc,
	"sportsBeginTournament": sportsGameBeginTournamentFunc,
	"sportsTeamJoinTournament": sportsTeamJoinTournamentFunc,
	"sportsGameEndWin": sportsGameEndWinFunc,
	"randomCommentary": randomCommentary,
	"sportsWinTournament": sportsWinTournament,
	"sportsTeamEliminated": sportsTeamEliminatedFunc,
	"sportsPlayerCollision": sportsPlayerCollisionFunc,
	"arenaInOfBounds": arenaInOfBoundsFunc,
	"arenaOutOfBounds": arenaOutOfBoundsFunc,
	"sportsGameEndBye":sportsGameEndByeFunc,
	"sportsTeamRemains": sportsTeamRemainsFunc
}


function commentateTranscript(siftedEvent) {
	siftedEvent.pattern.name;
	if(siftedEvent.lastStep != 'complete') {
		// Partial events?
		return "";
	}
	if (commentaryFunctions[siftedEvent.pattern.name]) {
		return commentaryFunctions[siftedEvent.pattern.name](siftedEvent);
	}
	return "";
	console.log(siftedEvent);
	const text = "It was Alex's birthday"; // No commentary found
	return "<p>" + text + "</p>";
}

class Metatron {
    constructor() {
        this.history = [];
        this.partialMatches = compiledPatterns.map(pat => {return {pattern: pat, bindings: {}}});

        this.db = datascript.empty_db(schema);
        //let parsed = parse(allRawSiftingPatterns);
        //this.compiledPatterns = compile(parsed);

        this.recordedAnnouncements = [];
    }

    resetPartialMatches() {
    	this.partialMatches = compiledPatterns.map(pat => {return {pattern: pat, bindings: {}}});
    	this.db = datascript.empty_db(schema);
    }

    recordHistory(event) {
        //console.log(event);
        this.history.push(event);

        for (const attr of Object.keys(event)) {
            if(event[attr]) { } else { console.log()}
        }

        this.db = addEvent(this.db, event);
        
        this.runPartialMatch();
    }

    runPartialMatch() {
    	const latestEventID = newestEID(this.db);
        const rules = "";
        //console.log(this.db);
        //console.log(this.partialMatches);
        //console.log(latestEventID);
    	const newPartialMatches = mapcat(this.partialMatches, pm => {
        	//console.log(pm);
        	return tryAdvance(pm, this.db, rules, latestEventID);});
        const matchGroups = groupBy(pm => pm.lastStep, newPartialMatches);
        //console.log(matchGroups);
        const accepts = matchGroups.accept || [];
        const passes = matchGroups.pass || [];
        this.partialMatches = accepts.concat(passes);
        this.announceHistory(matchGroups);
    }

    recordPlayer(player) {
        this.db = addEntity(this.db, player);
    }

    announceHistory(matchGroups) {
        const completedPatterns = matchGroups.complete || [];
        completedPatterns.forEach(match => {
            if(false) {
            	console.log(match.pattern.name, match);
            }
            this.recordedAnnouncements.push(match);
        });
    }

    cleanHistory() {

    }

    reportHistory() {

        let report = [];
        this.history.forEach((e) => {
            //console.log(e);
            report.push(e.message);
            //transcribeBookPassage(e.message);
        });
        //console.log(report);
        //console.log(this.history);
        //console.log(groupBy(m => m.pattern.name, this.recordedAnnouncements));
        //console.log(this.recordedAnnouncements);

        this.recordedAnnouncements.forEach(m => {
        	const commentary = commentateTranscript(m);
        	//console.log(commentary);
        	//console.log(m);
        	console.log(m.pattern.name);
        	//console.log(m.pattern);
        	if (typeof(commentary) == 'string') {
        		transcribeBookPassage(commentary);
        	} else {
        		// TODO: check if it has a flatten() function first
        		const eventID = commentary.raw.e1 + " + " + commentary.raw.e2;
        		const flatOutput = commentary.flatten('#origin#');
        		transcribeBookPassage(flatOutput)
        	}
        });

        this.resetPartialMatches();
    }
}
