let currentSceneId = null;
let winnerOfLastGame = null;
let currentTournamentRound = 0;


const malusTable = {}

function recordMalus(hater, hatee, howMuch) {
    if  (undefined === malusTable[hater]) {
        malusTable[hater] = {}
    }
    if (undefined === malusTable[hater][hatee]) {
        malusTable[hater][hatee] = 0;
    }
    malusTable[hater][hatee] += howMuch;    
}

function readMalus(hater, hatee) {
    if  (undefined === malusTable[hater]) {
        malusTable[hater] = {}
    }
    if (undefined === malusTable[hater][hatee]) {
        malusTable[hater][hatee] = 0;
    }
    return malusTable[hater][hatee];
}

function decayMalus(hater) {
    if(undefined === malusTable[hater]) {
        malusTable[hater] = {}
    }
    for(let k in malusTable[hater].keys()) {
        malusTable[hater][k] *= 0.9;
    }
}

function findEnemies(hater, team) {
    let enemyList = [];
    team.forEach(player => {
        let malus = readMalus(hater, player.playerID);
        enemyList.push([malus, player.playerID, player.x, player.y]);
    });
    return enemyList;
}

class leagueGameScene extends Phaser.Scene 
{
    constructor ()
    {
        super({ key: 'leagueGameScene' });
    }

    preload() {
            this.load.image('sky', 'assets/space3.png');
            this.load.image('logo', 'assets/phaser3-logo.png');
            this.load.image('red', 'assets/red.png');
            this.load.image('star', 'assets/star.png');
            this.load.image('star_flip', 'assets/flip_star.png');
            this.load.image('puck', 'assets/bomb.png');
            this.load.image('corner', 'assets/arc.png');
            this.load.image('goal', 'assets/goal.png');
    }

    create() {
        const _this = this;

        this.gameScene = this.scene.get('sportsGameScene');
            
        this.tournament = makeTournament(teamList);

        historyRecorder.recordHistory({
                                event: "sportsBeginTournament",
                                timeStep: 0,
                                tournamentRound: "" + currentTournamentRound,
                                message: `The Hlockey tournament begins!`,
                                proximateCause: "the Director"
                            });
        for(let t of this.tournament.teams) {
            historyRecorder.recordHistory({
                                event: "sportsTeamJoinTournament",
                                timeStep: -2,
                                teamName: t.fancyName,
                                message: `The ${t.name} are in the tournament!`,
                                proximateCause: "the Director"
                            });
        }
        historyRecorder.reportHistory();
        historyRecorder = new Metatron();

        this.input.once('pointerdown', function ()
        {

            
            //while(this.tournament.winner == false) {
            //    this.tournament = makeNextEliminationTournamentRound(this.tournament);
            //    this.playTournamentGames(this.tournament);
                console.log(this.tournament);
            //}

        }, this);

    }

    update(time, delta) {
        //console.log(this.tournament);
        //console.log([this.tournament.winner, currentSceneId]);
        if(this.tournament.winner === "ended") {
            return;
        }
        if(this.tournament.winner === "no winner") {
            if(currentSceneId != null) {
                if(currentSceneId == "winner") {
                    currentSceneId = null;
                }
                if(winnerOfLastGame != null) {
                    console.log("winnerOfLastGame", winnerOfLastGame);
                    if (winnerOfLastGame === "setup") {
                        this.gameScene = this.scene.get('sportsGameScene');
                        //this.gameScene.scene.restart();
                        this.gameScene.initSportsGame(this.nextGame);
                        //this.gameScene.scene.resume();
                        
                    } else {
                        this.gameScene.scene.stop();

                        let winner = 0;
                        let loser = 1;
                        if(winnerOfLastGame == 2) {
                            winner = 1;
                            loser = 0;
                        }
                        if(winnerOfLastGame == 0) {
                            const swissCount0 = this.nextGame[0].swissPoints + 0.5;
                            const swissCount1 = this.nextGame[1].swissPoints + 0.5;
                            this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[0].name, "swissPoints", swissCount0);
                            this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[1].name, "swissPoints", swissCount1);
                            console.log(`the ${this.nextGame[0].name} drew a tie with the ${this.nextGame[1].name}`);
                            historyRecorder.recordHistory({
                                event: "sportsGameEndTie",
                                timeStep: 99999,
                                homeTeam: this.nextGame[0].name,
                                awayTeam: this.nextGame[1].name,
                                tournamentRound: "" + currentTournamentRound,
                                message: `Tie game between ${this.nextGame[0].name} and ${this.nextGame[1].name}.`,
                                proximateCause: "the Director"
                            });
                            winnerOfLastGame = null; 
                        } else {
                            const winCount = this.nextGame[winner].wins + 1;
                            const swissCount = this.nextGame[winner].swissPoints + 1;
                        
                            this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[winner].name, "wins", winCount);
                            this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[winner].name, "swissPoints", swissCount);
                            
                            
                            const lossCount = this.nextGame[loser].losses + 1;
                            this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[loser].name, "losses", lossCount);   
                            console.log(`the ${this.nextGame[winner].name} beat the ${this.nextGame[loser].name}`);
                            historyRecorder.recordHistory({
                                event: "sportsGameEndWin",
                                timeStep: 99999,
                                winTeam: this.nextGame[winner].name,
                                loseTeam: this.nextGame[loser].name,
                                winnerWins: winCount,
                                winnerLosses: this.nextGame[winner].losses,
                                loserWins: this.nextGame[loser].wins,
                                loserLosses: lossCount,
                                tournamentRound: "" + currentTournamentRound,
                                message: `The ${this.nextGame[0].name} win and the ${this.nextGame[1].name} lose.`,
                                proximateCause: "the Director"
                            });

                            if (lossCount >= 3) {
                                historyRecorder.recordHistory({
                                event: "sportsTeamEliminated",
                                timeStep: 99999,
                                winTeam: this.nextGame[winner].fancyName,
                                loseTeam: this.nextGame[loser].fancyName,
                                tournamentRound: "" + currentTournamentRound,
                                message: `The ${this.nextGame[0].name} win and eliminate the ${this.nextGame[1].name} lose.`,
                                proximateCause: "the Director"
                            });
                            }

                            winnerOfLastGame = null; 


                        }
                        
                        
                    }
                }

            } else {
                console.log("starting next yournament round");
                if(this.tournament.games.length > 0) {
                    // Start the next game...    
                    this.nextGame = this.tournament.games.pop();
                    if(this.nextGame[1].name == null) {
                        const winner = 0;
                        const winCount = this.nextGame[winner].wins + 1;
                        const swissCount = this.nextGame[winner].swissPoints + 1;
                        this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[winner].name, "wins", winCount);
                        this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[winner].name, "swissPoints", swissCount);
                        console.log(`the ${this.nextGame[winner].name} have a bye`);    
                        historyRecorder.recordHistory({
                                event: "sportsGameEndBye",
                                timeStep: 0,
                                byeTeam: this.nextGame[winner].name,
                                tournamentRound: "" + currentTournamentRound,
                                message: `The ${this.nextGame[winner].name} have a bye this round.`,
                                proximateCause: "the Director"
                            });
                    } else {
                        this.scene.launch('sportsGameScene');
                        let t_gameScene = this.scene.get('sportsGameScene');
                        this.gameScene = this.scene.get('sportsGameScene');
                        //console.log(t_gameScene);
                        this.gameScene.scene.pause();
                        winnerOfLastGame = "setup";
                        currentSceneId = globalGameCount;
                        currentTournamentRound = this.tournament.round;
                    }
                } else {
                    // Start the next round...
                    this.tournament = makeNextEliminationTournamentRound(this.tournament);
                    console.log(this.tournament);
                    this.tournament.teams.forEach(t => {
                        console.log(t);
                        if (t.fancyName) {
                        historyRecorder.recordHistory({
                                event: "sportsTeamRemains",
                                timeStep: 0,
                                team: t.fancyName,
                                wins: t.wins,
                                losses: t.losses,
                                tournamentRound: "" + currentTournamentRound,
                                message: `The ${t.name} are still in the tournament.`,
                                proximateCause: "the Director"
                            });
                    }
                    });
                    
                }
                
            }
        } else {
            // Tournament is won
            console.log("tournament is won");
            console.log(this.tournament.winner);
            historyRecorder.recordHistory({
                                event: "sportsWinTournament",
                                timeStep: Infinity,
                                winTeam: this.tournament.winner.name,
                                tournamentRound: "" + currentTournamentRound,
                                message: `The ${this.nextGame[0].name} win the tournament!`,
                                proximateCause: "the Director"
                            });

            historyRecorder.reportHistory();
            this.tournament.winner = "ended";
        }


    }

    // playTournamentGames() {
    //     for(const g of this.tournament.games) {
        
    //         if(g[1].name == null) {
    //             const winner = 0;
    //             const winCount = g[winner].wins + 1;
    //             const swissCount = g[winner].swissPoints + 1;
    //             this.tournament.teams = updateByName(this.tournament.teams, g[winner].name, "wins", winCount);
    //             this.tournament.teams = updateByName(this.tournament.teams, g[winner].name, "swissPoints", swissCount);
    //             console.log(`the ${g[winner].name} have a bye`);    
    //         } else {
    //             this.scene.launch('sportsGameScene');
    //             this.gameScene.restart();
    //             this.gameScene.initSportsGame(g);

    //             const winner = 0;
                
    //             const winCount = g[winner].wins + 1;
    //             const swissCount = g[winner].swissPoints + 1;
            
    //             this.tournament.teams = updateByName(this.tournament.teams, g[winner].name, "wins", winCount);
    //             this.tournament.teams = updateByName(this.tournament.teams, g[winner].name, "swissPoints", swissCount);
                
    //             const loser = 1;
    //             const lossCount = g[loser].losses + 1;
    //             this.tournament.teams = updateByName(this.tournament.teams, g[loser].name, "losses", lossCount);   
    //             console.log(`the ${g[winner].name} beat the ${g[loser].name}`); 
    //         }
        
    //     }
    // }
}

class sportsGameScene extends Phaser.Scene
    {
        constructor ()
        {
            super({ key: 'sportsGameScene' });
        }

        preload ()
        {
            //this.load.setBaseURL('.');


        }

        initSportsGame(teams) {
            console.log("initSportsGame");
            
            this.currentPeriod = 0;
            this.currentPeriodStart = 0;
            this.penaltyTime = 0;
            this.bonusTime = 0;

            this.inPlayPuckCount = 0;


            this.teamOne = teams[0];
            this.teamTwo = teams[1];
            console.log(this.teamOne);

            globalGameCount += 1;
            currentSceneId = globalGameCount;

            this.sportsGame = {
                gameID: `${currentSceneId} - ${this.teamOne.name} vs ${this.teamTwo.name}`,
                score: {0: 0, 1: 0},
                teams: [this.teamOne, this.teamTwo],
                gameNum: globalGameCount
            };
            this.sportsGame.teams.forEach((t) => {
                this.sportsGame.score[t.name] = 0;
            });
            this.players = [];
            this.addPuck();
            this.puck = this.players[0];
            console.log(this.teamOne.roster);
            for(const player of this.teamOne.roster) {
                let sportTeam = 1;
                let playerID = player.name;
                let teamID = 0;
                console.log(`Adding ${player.name}`)
                this.addExistingPlayer(sportTeam, playerID, player, this.teamOne, teamID, this.teamOne.name);
            }

            for(const player of this.teamTwo.roster) {
                let sportTeam = 2;
                let playerID = player.name;
                let teamID = 1;
                console.log(`Adding ${player.name}`)
                this.addExistingPlayer(sportTeam, playerID, player, this.teamTwo, teamID, this.teamTwo.name);
            }
            console.log(this.sportsGame);
            console.log(this.players);
            const TeamOne = this.sportsGame.teams[0].name;
            const TeamTwo = this.sportsGame.teams[1].name;
            console.log(this.scene);
            historyRecorder.recordHistory({
                currentGame: this.sportsGame.gameID,
                currentPeriod: this.currentPeriod,
                timeStep: 0,
                event: "sportsGameStart",
                homeTeam: TeamOne,
                awayTeam: TeamTwo,
                homeFancyName: this.sportsGame.teams[0].fancyName,
                awayFancyName: this.sportsGame.teams[1].fancyName,
                homeWins: this.sportsGame.teams[0].wins,
                homeLosses: this.sportsGame.teams[0].losses,
                awayWins: this.sportsGame.teams[1].wins,
                awayLosses: this.sportsGame.teams[1].losses,
                gameNum: this.sportsGame.gameNum,
                tournamentRound: "" + currentTournamentRound,
                message: `The game between ${TeamOne} and ${TeamTwo} begins.`,
                proximateCause: "the Director"
            });
            this.resetFaceoff();

            for(let rosterLineupTeam of [this.teamOne, this.teamTwo]) {
                console.log(rosterLineupTeam);
                historyRecorder.recordHistory({
                        currentGame: this.sportsGame.gameID,
                        currentPeriod: this.currentPeriod,
                        timeStep: 1,
                        event: "sportsTeamStartingLineup",
                        player0: rosterLineupTeam.roster[0].name,
                        player1: rosterLineupTeam.roster[1].name,
                        player2: rosterLineupTeam.roster[2].name,
                        player3: rosterLineupTeam.roster[3].name,
                        player4: rosterLineupTeam.roster[4].name,
                        team: rosterLineupTeam.name,
                        message: `The starting lineup for ${rosterLineupTeam.name} is ${rosterLineupTeam.roster[0].name}, ${rosterLineupTeam.roster[1].name}, ${rosterLineupTeam.roster[2].name}, ${rosterLineupTeam.roster[3].name}, ${rosterLineupTeam.roster[4].name}!`,
                        proximateCause: "the Director",
                        tags: ["play-event", "puck-event", "common"]
                        });
            }

            this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {

                const currentTime = this.game.getFrame();

                if((bodyA.label == "playerSensor") && (bodyB.label == "puck")) {
                    // TODO
                }
                if (((bodyA.label == "player") && (bodyB.label == "puck")) || ((bodyB.label == "player") && (bodyA.label == "puck")) || ((bodyA.label == "playerSensor") && (bodyB.label == "puck")) || ((bodyB.label == "playerSensor") && (bodyA.label == "puck"))
                    ) {
                    // TODO

                    let the_puck = null;
                    let the_player = null;
                    if(bodyA.label == "puck") {
                        the_puck = bodyA;
                        the_player = bodyB;
                    } else {
                        the_puck = bodyB;
                        the_player = bodyA;
                    }

                    
                    the_player.gameObject.pastHits.push(the_puck.gameObject.playerID);
                    the_puck.gameObject.pastHits.push(the_player.gameObject.playerID);
                    the_player.gameObject.pastHitsTeam.push("puck");
                    the_puck.gameObject.pastHitsTeam.push(this.sportsGame.teams[the_player.gameObject.team].name);


                    const PlayerA_ID = the_player.gameObject.playerID;
                    const PlayerB_ID = the_puck.gameObject.playerID;
                    const PlayerA_ID_Team =  this.sportsGame.teams[the_player.gameObject.team].name;
                    
                    const angle_to_goal_vals = this.angleToGoal(the_player.gameObject);
                    const angle_to_goal = angle_to_goal_vals[0];
                    const accuracyAmount = angle_to_goal_vals[1];
                    const thrust = 0.01;

                    if(the_player.gameObject.personality.twitchiness) {
                        //thrust = 1.0 * the_player.gameObject.personality.twitchiness * the_player.gameObject.personality.twitchiness;
                    }

                    //console.log(the_puck);

                    the_puck.gameObject.lastMoveCause = PlayerA_ID;
                    the_puck.gameObject.lastMoveTeam = PlayerA_ID_Team;
                    the_puck.gameObject.lastMoveTime = this.game.getFrame();
                    the_puck.gameObject.forceToApply = [thrust, angle_to_goal];

                    historyRecorder.recordHistory({
                        currentGame: this.sportsGame.gameID,
                        currentPeriod: this.currentPeriod,
                        timeStep: currentTime,
                        event: "sportsPlayerHitsPuck",
                        actor: PlayerA_ID,
                        actorTeam: the_player.gameObject.teamName,
                        accuracy: accuracyAmount,
                        target: PlayerB_ID,
                        targetTeam: the_puck.gameObject.teamName,
                        message: `${PlayerA_ID} hits the ${PlayerB_ID}!`,
                        proximateCause: PlayerA_ID,
                        proximateCauseTeam: the_player.gameObject.teamName,
                        tags: ["play-event", "puck-event", "common"]
                    });

                    let currentHit = the_puck.gameObject.pastHits[the_puck.gameObject.pastHits.length-1];
                    let prevHit = the_puck.gameObject.pastHits[the_puck.gameObject.pastHits.length-2];
                    let currentHitTeam = the_puck.gameObject.pastHitsTeam[the_puck.gameObject.pastHitsTeam.length-1];
                    let prevHitTeam = the_puck.gameObject.pastHitsTeam[the_puck.gameObject.pastHitsTeam.length-2];
                    if (currentHit == undefined) { currentHit = "no one"; }
                    if (prevHit == undefined) { prevHit = "no one"; }
                    if (currentHitTeam == undefined) { currentHitTeam = "no team"; }
                    if (prevHitTeam == undefined) { prevHitTeam = "no team"; }
                    //console.log(prevHit);

                    if (currentHit != prevHit) {
                        if (currentHitTeam == prevHitTeam) {
                            // pass
                            historyRecorder.recordHistory({
                                currentGame: this.sportsGame.gameID,
                                currentPeriod: this.currentPeriod,
                                timeStep: currentTime,
                                event: "sportsPlayerPassesPuck",
                                sourcePlayer: prevHit,
                                targetPlayer: currentHit,
                                sourceTeam: prevHitTeam,
                                accuracy: accuracyAmount,
                                targetTeam: currentHitTeam,
                                message: `${prevHit} passes to ${currentHit}!`,
                                proximateCause: PlayerA_ID,
                                proximateCauseTeam: the_player.gameObject.teamName,
                                tags: ["play-event", "puck-event", "common"]
                            });
                        } else {
                            // steal
                            historyRecorder.recordHistory({
                                currentGame: this.sportsGame.gameID,
                                currentPeriod: this.currentPeriod,
                                timeStep: currentTime,
                                event: "sportsPlayerStealsPuck",
                                sourcePlayer: prevHit,
                                targetPlayer: currentHit,
                                sourceTeam: prevHitTeam,
                                accuracy: accuracyAmount,
                                targetTeam: currentHitTeam,
                                message: `${currentHit} steals the puck from ${prevHit}!`,
                                proximateCause: PlayerA_ID,
                                proximateCauseTeam: the_player.gameObject.teamName,
                                tags: ["play-event", "puck-event", "common"]
                            });
                        }
                    }


                }

                if((bodyA.label == "player") && (bodyB.label == "player")) {
                    // TODO
                    const PlayerA_ID = bodyA.gameObject.playerID;
                    const PlayerB_ID = bodyB.gameObject.playerID;
                    console.log(bodyA);
                    //console.log(bodyB);
                    //console.log
                    let PlayerA_Vel = bodyA.parent.speed;//new Phaser.Math.Vector2(bodyA.getVelocity());
                    let PlayerB_Vel = bodyB.parent.speed;//new Phaser.Math.Vector2(bodyB.getVelocity());
                    console.log(PlayerA_Vel);
                    const Diff_Vel = PlayerA_Vel - PlayerB_Vel;
                    const howHardTheHitWas = Diff_Vel;
                    const whoHitHarder = PlayerA_Vel - PlayerB_Vel;
                    const hitDamage = Math.random() * howHardTheHitWas;
                    let attacker = "Nobody";
                    let defender = "Nobody";
                    if(hitDamage > 0.0) {
                        if (whoHitHarder >= 0) {
                            recordMalus(PlayerB_ID, PlayerA_ID, hitDamage);
                            attacker = PlayerA_ID;
                            defender = PlayerB_ID;
                        }
                        if (whoHitHarder < 0) {
                            recordMalus(PlayerA_ID, PlayerB_ID, hitDamage);
                            attacker = PlayerB_ID;
                            defender = PlayerA_ID;
                        }
                    }
                    

                    historyRecorder.recordHistory({
                         event: "sportsPlayerCollision",
                         subjectID: PlayerA_ID,
                         objectID: PlayerB_ID,
                         hitDamage: Math.abs(hitDamage / (15.01 - currentTournamentRound)),
                         attacker: attacker,
                         defender: defender,
                         message: `${PlayerA_ID} collides with ${PlayerB_ID}!`,
                         proximateCause: PlayerA_ID
                    });

                    // bounce blame
                    bodyA.lastMoveCause = PlayerB_ID;
                    bodyB.lastMoveCause = PlayerA_ID;

                }
                if(((bodyA.label == "puck") && (bodyB.label == "goal")) || ((bodyB.label == "puck") && (bodyA.label == "goal"))) {
                    // who gets the points?
                    let the_puck = null;
                    let the_goal = null;
                    if(bodyA.label == "puck") {
                        the_puck = bodyA;
                        the_goal = bodyB;
                    } else {
                        the_puck = bodyB;
                        the_goal = bodyA;
                    }
                    //console.log(bodyA);
                    //console.log(bodyB);
                    const teamThatScored = the_goal.gameObject.teamGoal;
                    let lastHit = the_puck.gameObject.lastMoveCause;
                    let lastHitTeam = the_puck.gameObject.lastMoveTeam;
                    const teamThatScoredName = this.sportsGame.teams[teamThatScored].name;
                    
                    // increase score
                    this.sportsGame.score[teamThatScoredName] += 1;

                    const TeamOne = this.sportsGame.teams[0].name;
                    const TeamTwo = this.sportsGame.teams[1].name;
                    let ScoreOne = this.sportsGame.score[TeamOne];
                    let ScoreTwo = this.sportsGame.score[TeamTwo];

                    if (lastHit == undefined) {
                       lastHit = "no one"; 
                    }
                    if (lastHitTeam == undefined) {
                        lastHitTeam = "puck";
                    }

                
                    let currentHit = the_puck.gameObject.pastHits[the_puck.gameObject.pastHits.length-1];
                    let prevHit = the_puck.gameObject.pastHits[the_puck.gameObject.pastHits.length-2];
                    let currentHitTeam = the_puck.gameObject.pastHitsTeam[the_puck.gameObject.pastHitsTeam.length-1];
                    let prevHitTeam = the_puck.gameObject.pastHitsTeam[the_puck.gameObject.pastHitsTeam.length-2];
                    if (currentHit == undefined) { currentHit = "no one"; }
                    if (prevHit == undefined) { prevHit = "no one"; }
                    if (currentHitTeam == undefined) { currentHitTeam = "no team"; }
                    if (prevHitTeam == undefined) { prevHitTeam = "no team"; }
                    if(currentHitTeam == prevHitTeam) {
                        if (prevHit != currentHit) {
                            if(prevHit != "no one") {
                                historyRecorder.recordHistory({
                                currentGame: this.sportsGame.gameID,
                                currentPeriod: this.currentPeriod,
                                timeStep: currentTime,
                                event: "sportsGoalAssist",
                                sourcePlayer: prevHit,
                                targetPlayer: currentHit,
                                sourceTeam: prevHitTeam,
                                targetTeam: currentHitTeam,
                                scoreAway: ScoreTwo,
                                scoreHome: ScoreOne,
                                homeTeam: TeamOne,
                                awayTeam: TeamTwo,
                                message: `${currentHit} was assisted by ${prevHit}.`,
                                proximateCause: lastHit,
                                scoringTeam: teamThatScoredName,
                                tags: ["play-event", "goal", "puck-event"]
                                });
                            }
                        }
                    }
                    
                    // log event
                    historyRecorder.recordHistory({
                        currentGame: this.sportsGame.gameID,
                        currentPeriod: this.currentPeriod,
                        timeStep: currentTime,
                        event: "sportsGoalScored",
                        target: the_puck.gameObject.playerID,
                        actor: lastHit,
                        actorTeam: lastHitTeam,
                        scoreAway: ScoreTwo,
                        scoreHome: ScoreOne,
                        homeTeam: TeamOne,
                        awayTeam: TeamTwo,
                        message: `Goal scored in ${teamThatScoredName}'s goal by ${lastHit} !`,
                        proximateCause: lastHit,
                        scoringTeam: teamThatScoredName,
                        tags: ["play-event", "goal", "puck-event"]
                    });

                    

                    

                    historyRecorder.recordHistory({
                        currentGame: this.sportsGame.gameID,
                        currentPeriod: this.currentPeriod,
                        timeStep: currentTime,
                        event: "sportsScoreReport",
                        actor: lastHit,
                        target: the_puck.gameObject.playerID,
                        subjectID: the_puck.gameObject.playerID,
                        scoreAway: ScoreTwo,
                        scoreHome: ScoreOne,
                        homeTeam: TeamOne,
                        awayTeam: TeamTwo,
                        message: `The score is now ${TeamOne} ${ScoreOne} to ${TeamTwo} ${ScoreTwo}`,
                        proximateCause: lastHit,
                        tags: ["game-event", "play-event"]
                    });

                    //reset puck
                    the_puck.gameObject.pastHits = [];
                    the_puck.gameObject.pastHitsTeam = [];
                    the_puck.gameObject.pBody.setVelocity(0,0);
                    the_puck.gameObject.pBody.x = fieldWidth / 2;
                    the_puck.gameObject.pBody.y = fieldHeight / 2;
                    historyRecorder.recordHistory({
                        currentGame: this.sportsGame.gameID,
                        currentPeriod: this.currentPeriod,
                        timeStep: currentTime,
                        event: "arenaPuckResetToCenter",
                        target: the_puck.gameObject.playerID,
                        message: `Puck ${the_puck.gameObject.playerID} returned to the center point`,
                        proximateCause: "the Director",
                        tags: ["game-event", "play-event"]
                    });
                    
                    //console.log(this.sportsGame);

                }
            });
            winnerOfLastGame = null;
            console.log(this.players);
        }

        create ()
        {
            this.leagueScene = this.scene.get('leagueGameScene');
            // debugging viz
            //this.viz_graphic = this.add.graphics({ lineStyle: { color: 0x00ffff } });

            this.periodLength = 900;
            this.periodCount = 3;
            this.currentPeriod = 0;
            this.currentPeriodStart = 0;
            this.penaltyTime = 0;
            this.bonusTime = 0;
            this.lastComment = 0;

            this.inPlayPuckCount = 0;


            this.GoalBackWidth = 125;
            //this.add.image(400, 300, 'sky');

            this.matter.world.setBounds();

            this.teamOne = teamList[0];
            this.teamTwo = teamList[1];

            this.sportsGame = {
                gameID: "the game",
                score: {0: 0, 1: 0},
                teams: [this.teamOne, this.teamTwo]
            }
            this.sportsGame.teams.forEach((t) => {
                this.sportsGame.score[t.name] = 0;
            });

            // const particles = this.add.particles(0, 0, 'red', {
            //     speed: 100,
            //     scale: { start: 1, end: 0 },
            //     blendMode: 'ADD'
            // });

            // const logo = this.matter.add.image(400, 100, 'logo');

            // logo.setVelocity(10.0, 20.0);
            // logo.setBounce(1.0);
            // logo.setIgnoreGravity(true);
            //logo.setCollideWorldBounds(true);

            // this.matter.world.on("collisionstart",
            //     function(event, BodyA, BodyB) {
            //         event.pairs.forEach(pair => {
            //             // if(
            //             //     (pair.BodyA == ))
            //         });
            //     });

            


            this.goal_left = this.add.rectangle(this.GoalBackWidth, (fieldHeight / 2), 8, 128, 0x902090);
            this.matter.add.gameObject(this.goal_left).setStatic(true).setCollidesWith(collision_mask_puck | collision_mask_team1 | collision_mask_team2).setCollisionCategory(collision_mask_arena);

            this.goal_left_score = this.add.rectangle(this.GoalBackWidth + 20, (fieldHeight / 2), 32, 120, 0x009090);
            const score_left_goal = this.matter.add.gameObject(this.goal_left_score).setStatic(true).setCollisionGroup(2).setCollidesWith(collision_mask_puck).setCollisionCategory(collision_mask_score);
            score_left_goal.label = "goal";
            score_left_goal.body.label = "goal";
            score_left_goal.teamGoal = 1;
            
            this.goal_left_top = this.add.rectangle(this.GoalBackWidth + 20, (fieldHeight / 2) - 64, 48, 8, 0x902090);
            this.matter.add.gameObject(this.goal_left_top).setStatic(true).setCollidesWith(collision_mask_puck | collision_mask_team1 | collision_mask_team2).setCollisionCategory(collision_mask_arena);
            
            this.goal_left_bottom = this.add.rectangle(this.GoalBackWidth + 20, (fieldHeight / 2) + 64, 48, 8, 0x902090);
            this.matter.add.gameObject(this.goal_left_bottom).setStatic(true).setCollidesWith(collision_mask_puck | collision_mask_team1 | collision_mask_team2).setCollisionCategory(collision_mask_arena);

            this.goal_right = this.add.rectangle(-8 + fieldWidth - this.GoalBackWidth, (fieldHeight / 2), 8, 128, 0x902090);
            const right_goal = this.matter.add.gameObject(this.goal_right).setStatic(true).setCollidesWith(collision_mask_puck | collision_mask_team1 | collision_mask_team2).setCollisionCategory(collision_mask_arena);
            

            this.goal_right_score = this.add.rectangle(-8 + fieldWidth - this.GoalBackWidth - 20, (fieldHeight / 2), 32, 120, 0x009090);
            const score_right_goal = this.matter.add.gameObject(this.goal_right_score).setStatic(true).setCollisionGroup(2).setCollidesWith(collision_mask_puck).setCollisionCategory(collision_mask_score);
            score_right_goal.label = "goal";
            score_right_goal.body.label = "goal";
            score_right_goal.teamGoal = 0;
            
            this.goal_right_top = this.add.rectangle(-8 + fieldWidth - this.GoalBackWidth - 20, (fieldHeight / 2) - 64, 48, 8, 0x902090);
            this.matter.add.gameObject(this.goal_right_top).setStatic(true).setCollidesWith(collision_mask_puck | collision_mask_team1 | collision_mask_team2).setCollisionCategory(collision_mask_arena);

            this.goal_right_bottom = this.add.rectangle(-8 + fieldWidth - this.GoalBackWidth - 20, (fieldHeight / 2) + 64, 48, 8, 0x902090);
            this.matter.add.gameObject(this.goal_right_bottom).setStatic(true).setCollidesWith(collision_mask_puck | collision_mask_team1 | collision_mask_team2).setCollisionCategory(collision_mask_arena);

            this.goal_target_left = this.add.circle(this.GoalBackWidth + 20, (fieldHeight/2), 5, 0xff0000);
            this.goal_target_right = this.add.circle(fieldWidth - (this.GoalBackWidth) - 28, (fieldHeight/2), 5, 0xff0000);

            if (false) {
                this.goal_center = this.add.rectangle((fieldWidth / 2) - this.GoalBackWidth, (fieldHeight / 2) - this.GoalBackWidth, this.GoalBackWidth, this.GoalBackWidth, 0x902090);
                const center_goal = this.matter.add.gameObject(this.goal_center).setStatic(true).setCollidesWith(collision_mask_puck).setCollisionCategory(collision_mask_score);
                center_goal.label = "goal";
                center_goal.body.label = "goal";
                center_goal.teamGoal = 1;
            }


            this.players = [];
            this.addPuck();
            this.puck = this.players[0];
            // for(const player of this.teamOne.roster) {
            //     let sportTeam = 1;
            //     let playerID = player.name;
            //     let teamID = 0;
            //     this.addExistingPlayer(sportTeam, playerID, player, this.teamOne, teamID, this.teamOne.name);
            // }

            // for(const player of this.teamTwo.roster) {
            //     let sportTeam = 2;
            //     let playerID = player.name;
            //     let teamID = 1;
            //     this.addExistingPlayer(sportTeam, playerID, player, this.teamTwo, teamID, this.teamTwo.name);
            // }

            

            

            this.matter.world.debugConfig.showVelocity = true;
            //this.matter.world.debugConfig.showCollisions = true;

            console.log(this.players);
        }

        addPuck() {
            this.inPlayPuckCount += 1;
            const pX = Phaser.Math.FloatBetween((fieldWidth / 2) - 50, 50 + (fieldWidth / 2));
            const pY = Phaser.Math.FloatBetween(0, fieldHeight);
            let playerID = `puck_${this.inPlayPuckCount}`;
            let sportTeam = -1;


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

            const sportPlayer = this.add.existing(new SportPlayer(this, pX, pY, sportTeam, personality, historyRecorder, playerID));
            historyRecorder.recordPlayer(sportPlayer);
            this.players.push(sportPlayer);
        }
        addExistingPlayer(sportTeam, playerID, playerData, teamData, teamIDNum, TeamName) {
            const pX = Phaser.Math.FloatBetween(0, fieldWidth);
            const pY = Phaser.Math.FloatBetween(0, fieldHeight);
            // (scene, x, y, teamNumber, personality, history_recorder, playerID);
            const sp = new SportPlayer(this, pX, pY, teamIDNum, playerData.personality, historyRecorder, playerID);
            //console.log(sp);
            const sportPlayer = this.add.existing(sp);
            this.players.push(sportPlayer);  
            historyRecorder.recordPlayer(sportPlayer);
            console.log(sportPlayer);
            console.log(this.players);
        }
        addRandomPlayer(sportTeam, playerID, teamNum, teamID) {

            const pX = Phaser.Math.FloatBetween(0, fieldWidth);
            const pY = Phaser.Math.FloatBetween(0, fieldHeight);


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

            const sportPlayer = this.add.existing(new SportPlayer(this, pX, pY, sportTeam, personality, historyRecorder, playerID));

            this.players.push(sportPlayer);  
            historyRecorder.recordPlayer(sportPlayer);
            console.log(sportPlayer);
        }

        angleToPuck(sportPlayer) {
            return Phaser.Math.Angle.Between(sportPlayer.x, sportPlayer.y, this.puck.x, this.puck.y);
        }

        angleToGoal(sportPlayer) {
            let target_point_x = (fieldWidth / 2);
            let hitColor = 0xffffff;
            //console.log(sportPlayer);
            if (sportPlayer.team == 1) {
                target_point_x = this.GoalBackWidth + 20;
                hitColor = 0xff0055;
            }
            if (sportPlayer.team == 2) {
                target_point_x = fieldWidth - (this.GoalBackWidth + 20);
                hitColor = 0x5500ff;
            }
            if (sportPlayer.team == 0) {
                target_point_x = fieldWidth - (this.GoalBackWidth + 20);
                hitColor = 0x55ff00;
            }
            let target_point_y = (fieldHeight / 2);
            if (this.puck.x < (this.GoalBackWidth + 16) || this.puck.x > (fieldWidth - (this.GoalBackWidth + 16))) {
                target_point_y = Phaser.Math.FloatBetween(0, 200);   
                if (1 > Phaser.Math.Between(0, 1)) {
                    target_point_y = fieldHeight - target_point_y;   
                }                
            }

            let accuracyVariance = 5.0;
            if(sportPlayer.personality.twitchiness) {
                accuracyVariance = 250.0 * sportPlayer.personality.twitchiness * sportPlayer.personality.twitchiness;
            }
            const target_variance_x = Phaser.Math.FloatBetween(0 - accuracyVariance, accuracyVariance);
            const target_variance_y = Phaser.Math.FloatBetween(0 - accuracyVariance, accuracyVariance);
            target_point_x += target_variance_x;
            target_point_y += target_variance_y;
            const hitViz = this.add.circle(target_point_x, target_point_y, 5, hitColor);
            this.timedEvent = this.time.delayedCall(15000, () => {
                hitViz.destroy();
            }, [], this);

            let puck_dist = Phaser.Math.Distance.Between(sportPlayer.x, sportPlayer.y, target_point_x, target_point_y);
            
            //this.viz_graphic = this.add.graphics({ lineStyle: { color: 0x00ffff } });
            // console.log(this.viz_graphic);
            //this.viz_graphic.clear().strokeCircle(sportPlayer.x, sportPlayer.y, puck_dist);


            return [Phaser.Math.Angle.Between(sportPlayer.x, sportPlayer.y, target_point_x, target_point_y), target_variance_x+target_variance_y];
        }

        resetFaceoff() {
            this.scene.pause();

            let puckCount = 0;
            this.players.forEach((p) => {
                if(p.isPuck) {
                    p.x = fieldWidth / 2;
                    p.y = fieldHeight / 2;
                    p.pBody.setVelocity(0, 0);
                    if (puckCount > 0) {
                        p.x += Phaser.Math.FloatBetween(-50.0, 50.0);
                        p.y += Phaser.Math.FloatBetween(-50.0, 50.0);
                        p.pBody.setVelocity(Phaser.Math.Between(-0.00, 0.00), Phaser.Math.Between(-9.90, 9.90));
                    }
                    puckCount++;
                } else {
                    if(p.label == "player") {
                        //console.log(p)
                        p.x = Phaser.Math.FloatBetween(this.GoalBackWidth + 32, (fieldWidth / 2) - 20);
                        p.y = Phaser.Math.FloatBetween(0, fieldHeight);
                        if(p.teamNum == 0) {

                        }
                        if(p.teamNum == 1) {
                            p.x = fieldWidth - p.x;
                        }
                    }
                }
            });
            this.scene.resume();
        }

        distanceToPuck(sportPlayer) {
            const dist = Phaser.Math.Distance.Between(this.puck.x, this.puck.y, sportPlayer.x, sportPlayer.y);
            return dist;
        }
        closestToPuck() {
            let closestDist = 999999;
            let closestIndex = null;
            for(let i = 1; i < this.players.length; i++) {
                const dist = distanceToPuck(this.players[i]);
                if(dist < closestDist) {
                    closestDist = dist;
                    closestIndex = i;
                }
            }
            return closestIndex;
        }

        update(time, delta) {

            const TeamOne = this.sportsGame.teams[0].name;
            const TeamTwo = this.sportsGame.teams[1].name;
            const ScoreOne = this.sportsGame.score[TeamOne];
            const ScoreTwo = this.sportsGame.score[TeamTwo];

            //console.log(this.players);
            this.players.forEach((p) => {
                //console.log(p)
                p.seekEnemies(findEnemies(p.playerID, this.players));

                p.update(time, delta);
            });

            const currentTime = this.game.getFrame();
            const timeSinceLastComment = currentTime - this.lastComment;
            


            if(timeSinceLastComment > 200 * Math.random()) {
                historyRecorder.recordHistory({
                    currentGame: this.sportsGame.gameID,
                    currentPeriod: this.currentPeriod,
                    timeStep: currentTime,
                    event: "sportsRandomComment",
                    scoreAway: ScoreTwo,
                    scoreHome: ScoreOne,
                    homeTeam: TeamOne,
                    awayTeam: TeamTwo,
                    subjectID: "game_" + TeamOne + "_" + TeamTwo,
                    message: `Random comment. Score is ${TeamOne} ${ScoreOne}, ${TeamTwo} ${ScoreTwo}`,
                    proximateCause: "the Director"
                });
                this.lastComment = currentTime;
            }
            
            if (this.currentPeriodStart + this.periodLength + this.penaltyTime + this.bonusTime < currentTime) {
                // period ends

                this.currentPeriod++;

                historyRecorder.recordHistory({
                    currentGame: this.sportsGame.gameID,
                    currentPeriod: this.currentPeriod,
                    timeStep: currentTime,
                    event: "sportsGamePeriodEnd",
                    scoreAway: ScoreTwo,
                    scoreHome: ScoreOne,
                    homeTeam: TeamOne,
                    awayTeam: TeamTwo,
                    subjectID: "game_" + TeamOne + "_" + TeamTwo,
                    message: `End of period ${this.currentPeriod}, score is ${TeamOne} ${ScoreOne}, ${TeamTwo} ${ScoreTwo}`,
                    proximateCause: "the Director"
                });

                this.currentPeriodStart = currentTime;
                this.penaltyTime = 0;
                this.bonusTime = 0;
                this.resetFaceoff();
            }

            if(this.currentPeriod == this.periodCount) {
                // End of game, unless we're tied...
                if(ScoreOne == ScoreTwo) {
                    this.periodCount++;
                    historyRecorder.recordHistory({
                    currentGame: this.sportsGame.gameID,
                    currentPeriod: this.currentPeriod,
                    timeStep: currentTime,
                    scoreAway: ScoreTwo,
                    scoreHome: ScoreOne,
                    homeTeam: TeamOne,
                    awayTeam: TeamTwo,
                    event: "sportsGamePeriodOvertime",
                    subjectID: "game_" + TeamOne + "_" + TeamTwo,
                    message: `The score is tied, ${TeamOne} ${ScoreOne}, ${TeamTwo} ${ScoreTwo}, going to overtime.`,
                    proximateCause: "the Director"
                    });
                    this.addPuck();
                    this.resetFaceoff();
                } else {
                    // end of game
                    historyRecorder.recordHistory({
                    currentGame: this.sportsGame.gameID,
                    currentPeriod: this.currentPeriod,
                    timeStep: currentTime,
                    event: "sportsGameEnd",
                    scoreAway: ScoreTwo,
                    scoreHome: ScoreOne,
                    homeTeam: TeamOne,
                    awayTeam: TeamTwo,
                    subjectID: "game_" + TeamOne + "_" + TeamTwo,
                    message: `Game over. Final score, ${TeamOne} ${ScoreOne}, ${TeamTwo} ${ScoreTwo}.`,
                    proximateCause: "the Director",
                    //data: {TeamOne: ScoreOne, TeamTwo: ScoreTwo}
                    });

                    historyRecorder.reportHistory();
                    console.log(historyRecorder);
                    if(ScoreOne < ScoreTwo) {
                        winnerOfLastGame = 2;    
                    }
                    if(ScoreOne > ScoreTwo) {
                        winnerOfLastGame = 1;    
                    }
                    if(ScoreOne == ScoreTwo) {
                        winnerOfLastGame = 0;    
                    }
                    historyRecorder = new Metatron();

                    this.matter.world.off("collisionstart");
                    
                    this.scene.stop();
                    currentSceneId = "winner";
                }
            }
            

        }
    }