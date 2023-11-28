function extractBindingsToGrammar(e) {
	let bind = {}
	for(const [key, value] of Object.entries(e.bindings)) {
		bind[key.slice(1)] = "" + value;
	}
	return bind;
}

function scoreGoalFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = [
		`#actor# takes the shot. #team1# scores!`, 
		`Scoring for #team1#, was #actor#.`
		];
	return tracery.createGrammar(binds);
}

function sportsGameStartFunc(e) {
	const homeTeam = e.bindings['?homeTeam'];
	const awayTeam = e.bindings['?awayTeam'];
	return tracery.createGrammar({'origin': '<h2>#headline#</h2><p>#comment#</p>',
		"headline": "Game #gameNum#: #homeTeam# vs. #awayTeam#",
		"comment": ["Welcome to #homeTeam# vs. #awayTeam#."],
		'homeTeam': homeTeam,
		'awayTeam': awayTeam
	});
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

function sportsGamePeriodEndFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = ["And that's the end of this period; the score is #homeTeam# #homeScore#, #awayTeam# #awayScore#."];
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
	binds.comment = ["We're going into overtime. The score is tied at #homeTeam# #homeScore#, #awayTeam# #awayScore#"];
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
	return "";
}

function passThePuckFunc(e) {
	return "";
}

function stealThePuckFunc(e) {
	return "";
}

function scoreGoalAssistFunc(e) {
	const binds = extractBindingsToGrammar(e);
	binds.origin = '<p>#comment#</p>';
	binds.comment = [`Assist by #assistName#, passing to #playerName#.`];
	return tracery.createGrammar(binds);
}

const commentaryFunctions = {
	"scoreGoal": scoreGoalFunc,
	"scoreGoalOtherTeam": scoreGoalOtherFunc,
	"passThePuck": passThePuckFunc,
	"scoreGoalAssist": scoreGoalAssistFunc,
	"stealThePuck": stealThePuckFunc,
	"sportsGameStart": sportsGameStartFunc,
	"sportsScoreReport": sportsScoreReportFunc,
	"sportsGameEnd": sportsGameEndFunc,
	"sportsGamePeriodStart": sportsGamePeriodStartFunc,
	"sportsGamePeriodEnd": sportsGamePeriodEndFunc,
	"sportsGamePeriodOvertime": sportsGamePeriodOvertimeFunc
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

    recordHistory(event) {
        //console.log(event);
        this.history.push(event);

        for (const attr of Object.keys(event)) {
            if(event[attr]) { } else { console.log()}
        }

        this.db = addEvent(this.db, event);
        const latestEventID = newestEID(this.db);
        const rules = "";
        const newPartialMatches = mapcat(this.partialMatches, pm => tryAdvance(pm, this.db, rules, latestEventID));
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
            console.log(match.pattern.name, match);
            this.recordedAnnouncements.push(match);
        });
    }

    reportHistory() {
        let report = [];
        this.history.forEach((e) => {
            //console.log(e);
            report.push(e.message);
            //transcribeBookPassage(e.message);
        });
        console.log(report);
        console.log(this.history);
        console.log(groupBy(m => m.pattern.name, this.recordedAnnouncements));
        console.log(this.recordedAnnouncements);

        this.recordedAnnouncements.forEach(m => {
        	const commentary = commentateTranscript(m);
        	console.log(commentary);
        	console.log(m);
        	if (typeof(commentary) == 'string') {
        		transcribeBookPassage(commentary);
        	} else {
        		// TODO: check if it has a flatten() function first
        		const flatOutput = commentary.flatten('#origin#');
        		transcribeBookPassage(flatOutput)
        	}
        });
    }
}
