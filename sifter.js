const gameHistory = [
    {
        "event": "sportsGameStart",
        "actor": "TeamOne",
        "target": "TeamTwo",
        "message": "The game between TeamOne and TeamTwo begins.",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_3",
        "target": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_3",
        "target": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_4",
        "target": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_4",
        "target": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_1",
        "target": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_1",
        "target": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_4",
        "target": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_4",
        "target": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsGoalScored",
        "actor": "puck_1",
        "message": "Goal scored in TeamOne's goal by player_4 !",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsScoreReport",
        "actor": "puck_1",
        "message": "The score is now TeamOne 1 to TeamTwo 0",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaPuckResetToCenter",
        "actor": "puck_1",
        "message": "Puck puck_1 returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsGoalScored",
        "actor": "puck_1",
        "message": "Goal scored in TeamTwo's goal by player_2 !",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsScoreReport",
        "actor": "puck_1",
        "message": "The score is now TeamOne 1 to TeamTwo 1",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaPuckResetToCenter",
        "actor": "puck_1",
        "message": "Puck puck_1 returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_4",
        "target": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_4",
        "target": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_4",
        "target": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsGoalScored",
        "actor": "puck_1",
        "message": "Goal scored in TeamTwo's goal by player_4 !",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsScoreReport",
        "actor": "puck_1",
        "message": "The score is now TeamOne 1 to TeamTwo 2",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaPuckResetToCenter",
        "actor": "puck_1",
        "message": "Puck puck_1 returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsGoalScored",
        "actor": "puck_1",
        "message": "Goal scored in TeamTwo's goal by player_2 !",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsScoreReport",
        "actor": "puck_1",
        "message": "The score is now TeamOne 1 to TeamTwo 3",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaPuckResetToCenter",
        "actor": "puck_1",
        "message": "Puck puck_1 returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsGoalScored",
        "actor": "puck_1",
        "message": "Goal scored in TeamTwo's goal by player_2 !",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsScoreReport",
        "actor": "puck_1",
        "message": "The score is now TeamOne 1 to TeamTwo 4",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaPuckResetToCenter",
        "actor": "puck_1",
        "message": "Puck puck_1 returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_3",
        "target": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_3",
        "target": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsGamePeriodEnd",
        "actor": "game_TeamOne_TeamTwo",
        "message": "End of period 1, score is TeamOne 1, TeamTwo 4",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_4",
        "target": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_1",
        "target": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_3",
        "target": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_3",
        "target": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_3",
        "target": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsGamePeriodEnd",
        "actor": "game_TeamOne_TeamTwo",
        "message": "End of period 2, score is TeamOne 1, TeamTwo 4",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsGoalScored",
        "actor": "puck_1",
        "message": "Goal scored in TeamOne's goal by player_2 !",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsScoreReport",
        "actor": "puck_1",
        "message": "The score is now TeamOne 2 to TeamTwo 4",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaPuckResetToCenter",
        "actor": "puck_1",
        "message": "Puck puck_1 returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "actor": "player_2",
        "target": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsGamePeriodEnd",
        "actor": "game_TeamOne_TeamTwo",
        "message": "End of period 3, score is TeamOne 2, TeamTwo 4",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsGameEnd",
        "actor": "game_TeamOne_TeamTwo",
        "message": "Game over. Final score, TeamOne 2, TeamTwo 4.",
        "proximateCause": "the Director",
        "data": {
            "TeamOne": 2,
            "TeamTwo": 4
        }
    }
];


const schema = {
  tag:    {":db/cardinality": ":db.cardinality/many"}
};

const allRawSiftingPatterns = `

(pattern sportsBeginTournament
  (event ?e1 where
    event: sportsBeginTournament
    tournamentRound: ?tournamentRound
    ))

(pattern sportsTeamJoinTournament
  (event ?e1 where
    event: sportsTeamJoinTournament
    teamName: ?teamName
    ))

(pattern sportsGameStart
  (event ?e1 where
    event: sportsGameStart
    homeTeam: ?homeTeam
    awayTeam: ?awayTeam
    homeFancyName: ?homeFancyName
    awayFancyName: ?awayFancyName
    tournamentRound: ?tournamentRound
    gameNum: ?gameNum
    ))

(pattern sportsScoreReport
 (event ?e1 where
   event: sportsScoreReport
   homeTeam: ?homeTeam
    awayTeam: ?awayTeam
    scoreHome: ?homeScore
    scoreAway: ?awayScore
    ))

(pattern sportsGameEnd
 (event ?e1 where
   event: sportsGameEnd
   homeTeam: ?homeTeam
   awayTeam: ?awayTeam
   scoreHome: ?homeScore
   scoreAway: ?awayScore
    ))

(pattern sportsGameEndTie
 (event ?e1 where
   event: sportsGameEndTie
   homeTeam: ?homeTeam
   awayTeam: ?awayTeam
   tournamentRound: ?tournamentRound))

(pattern sportsGameEndWin
 (event ?e1 where
   event: sportsGameEndWin
   winTeam: ?winTeam
   loseTeam: ?loseTeam
   tournamentRound: ?tournamentRound))

(pattern sportsTeamStartingLineup
(event ?e1 where
   event: sportsTeamStartingLineup
   team: ?team
   player0: ?player0
   player1: ?player1
   player2: ?player2
   player3: ?player3
   player4: ?player4
    ))

(pattern sportsGamePeriodStart
 (event ?e1 where
   event: sportsGamePeriodStart
    homeTeam: ?homeTeam
    awayTeam: ?awayTeam
    scoreHome: ?homeScore
    scoreAway: ?awayScore
    ))

(pattern sportsGamePeriodEnd
(event ?e1 where
   event: sportsGamePeriodEnd
   homeTeam: ?homeTeam
    awayTeam: ?awayTeam
    scoreHome: ?homeScore
    scoreAway: ?awayScore))

(pattern sportsGamePeriodOvertime
(event ?e1 where
   event: sportsGamePeriodOvertime
   homeTeam: ?homeTeam
    awayTeam: ?awayTeam
    scoreHome: ?homeScore
    scoreAway: ?awayScore))

(pattern scoreGoal
  (event ?e2 where
    event: sportsGoalScored,
    target: ?puck,
    actor: ?actor
    scoringTeam: ?team1
    actorTeam: ?team1
    )
    )

(pattern scoreAnyGoal
  (event ?e2 where
    event: sportsGoalScored
    target: ?puck
    actor: ?actor
    scoringTeam: ?team1
    actorTeam: puck
    (not= ?team2 ?team1)))

(pattern scoreGoalOtherTeam
  (event ?e2 where
    event: sportsGoalScored
    target: ?puck
    actor: ?actor
    actorTeam: ?team2
    scoringTeam: ?team1
    (not= ?team1 ?team2)
    (not= ?team2 puck))
    )

 (pattern passThePuck
  (event ?e1 where
    event: sportsPlayerPassesPuck,
    targetPlayer: ?actor2
    sourcePlayer: ?actor1
    sourceTeam: ?team1
    targetTeam: ?team2))

 (pattern stealThePuck
  (event ?e1 where
    event: sportsPlayerHitsPuck,
    targetPlayer: ?actor2
    sourcePlayer: ?actor1
    sourceTeam: ?team1
    targetTeam: ?team2))

 (pattern scoreGoalAssist
  (event ?e1 where
    event: sportsGoalAssist,
    targetPlayer: ?actor2
    sourcePlayer: ?actor1
    sourceTeam: ?team1
    targetTeam: ?team2))
  `;


function addEntity(db, entity) {
  //console.log(db);
  const transaction = [[":db/add", -1, "type", "entity"]];
  //console.log(entity);
  transaction.push([":db/add", -1, "playerID", entity.playerID]);
  db = datascript.db_with(db, transaction);
  //console.log( datascript.datoms(db, ":eavt"));
  entity.databaseID = newestEID(db);
  return db;
}


// Add an event to the DB and return an updated DB.
function addEvent(db, event) {
  const transaction = [[":db/add", -1, "type", "event"]];
  for (const attr of Object.keys(event)) {
    if (attr === "tags") continue;
    transaction.push([":db/add", -1, attr, event[attr]]);
  }
  for (const tag of event.tags || []) {
    transaction.push([":db/add", -1, "tag", tag]);
  }
  return datascript.db_with(db, transaction);
}

// Given a list of compiled `patterns`, a `db`, a string of query `rules`,
// and a list of `events` to push into the `db`, executes the patterns against
// the `db` in an incremental fashion while pushing the `events` into the `db`
// one by one.
//
// This is one example "driver" function for the core Winnow
// incremental execution model, but others can also be conceived of
// for different use cases. Depending on the application, a driver function
// might want to more aggressively remove complete matches from the pool,
// add events using a different `addEvent` function, interleave execution with
// more complicated game state updates, and so on.
function getAllMatches(patterns, db, rules, events) {
  let partialMatches = patterns.map(pat => {return {pattern: pat, bindings: {}}});
  for (const event of events) {
    db = addEvent(db, event);
    const latestEventID = newestEID(db);
    partialMatches = mapcat(partialMatches, pm => tryAdvance(pm, db, rules, latestEventID));
    partialMatches = partialMatches.filter(pm => pm.lastStep !== "die");
  }
  return partialMatches;
}








let db = datascript.empty_db(schema);
const parsed = parse(allRawSiftingPatterns);
const compiledPatterns = compile(parsed);
console.log(compiledPatterns[0]);
//console.log(datascript.q(compiledPatterns[0].completeQuery, db));

//const matches = getAllMatches(compiledPatterns, db, "", gameHistory);
//console.log(matches);


function groupBy(f, xs) {
  const groups = {};
  for (const x of xs) {
    const k = f(x);
    if (!groups[k]) groups[k] = [];
    groups[k].push(x);
  }
  return groups;
}