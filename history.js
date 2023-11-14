
function scoreGoalFunc(e) {
	const scoringPlayerName = e.bindings['?actor'];
	const scoringTeamName = e.bindings['?team1'];
	console.log();
	//console.log(e.bindings.?actor);
	return tracery.createGrammar({'origin': '<p>#comment#</p>',
		"comment": [
		`#playerName# takes the shot. #teamName# scores!`, 
		`Scoring for #teamName#, was number #playerNumber#, #playerName.`],
		'teamName': scoringTeamName,
		'playerName': scoringPlayerName
	});
}

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
	const scoringPlayerName = e.bindings['?actor2'];
	const scoringPlayerNameAssist = e.bindings['?actor1'];
	const scoringTeamName = e.bindings['?team1'];
	console.log();
	//console.log(e.bindings.?actor);
	return tracery.createGrammar({'origin': '<p>#comment#</p>',
		"comment": [
		`Assist by #assistName#, passing to #playerName#.`],
		'teamName': scoringTeamName,
		'playerName': scoringPlayerName,
		'assistName': scoringPlayerNameAssist
	});
}

const commentaryFunctions = {
	"scoreGoal": scoreGoalFunc,
	"scoreGoalOtherTeam": scoreGoalOtherFunc,
	"passThePuck": passThePuckFunc,
	"scoreGoalAssist": scoreGoalAssistFunc,
	"stealThePuck": stealThePuckFunc,
	"": ""
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
