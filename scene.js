let currentSceneId = null;
let winnerOfLastGame = null;

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
        if(this.tournament.winner == false) {
            if(currentSceneId != null) {
                if(winnerOfLastGame != null) {
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
                            console.log(`the ${this.nextGame[winner].name} drew a tie with the ${this.nextGame[loser].name}`);
                            winnerOfLastGame = null; 
                        } else {
                            const winCount = this.nextGame[winner].wins + 1;
                            const swissCount = this.nextGame[winner].swissPoints + 1;
                        
                            this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[winner].name, "wins", winCount);
                            this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[winner].name, "swissPoints", swissCount);
                            
                            
                            const lossCount = this.nextGame[loser].losses + 1;
                            this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[loser].name, "losses", lossCount);   
                            console.log(`the ${this.nextGame[winner].name} beat the ${this.nextGame[loser].name}`);
                            winnerOfLastGame = null; 

                        }
                        
                        
                    }
                }

            } else {
                if(this.tournament.games.length > 0) {
                    // Start the next game...    
                    this.nextGame = this.tournament.games.pop();
                    if(this.nextGame[1].name == null) {
                        const winner = 0;
                        const winCount = nextGame[winner].wins + 1;
                        const swissCount = nextGame[winner].swissPoints + 1;
                        this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[winner].name, "wins", winCount);
                        this.tournament.teams = updateByName(this.tournament.teams, this.nextGame[winner].name, "swissPoints", swissCount);
                        console.log(`the ${this.nextGame[winner].name} have a bye`);    
                    } else {
                        this.scene.launch('sportsGameScene');
                        let t_gameScene = this.scene.get('sportsGameScene');
                        this.gameScene = this.scene.get('sportsGameScene');
                        //console.log(t_gameScene);
                        this.gameScene.scene.pause();
                        winnerOfLastGame = "setup";
                        currentSceneId = globalGameCount;

                    }
                } else {
                    // Start the next round...
                    this.tournament = makeNextEliminationTournamentRound(this.tournament);
                }
                
            }
        } else {
            // Tournament is won
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
                message: `The game between ${TeamOne} and ${TeamTwo} begins.`,
                proximateCause: "the Director"
            });
            this.resetFaceoff();

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


                    const PlayerA_ID = the_player.gameObject.playerID;
                    const PlayerB_ID = the_puck.gameObject.playerID;

                    const angle_to_goal_vals = this.angleToGoal(the_player.gameObject);
                    const angle_to_goal = angle_to_goal_vals[0];
                    const accuracyAmount = angle_to_goal_vals[1];
                    const thrust = 0.01;

                    if(the_player.gameObject.personality.twitchiness) {
                        //thrust = 1.0 * the_player.gameObject.personality.twitchiness * the_player.gameObject.personality.twitchiness;
                    }

                    //console.log(the_puck);

                    the_puck.gameObject.lastMoveCause = PlayerA_ID;
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
                        tags: ["play-event", "puck-event", "common"]
                    });
                }

                if((bodyA.label == "player") && (bodyB.label == "player")) {
                    // TODO
                    const PlayerA_ID = bodyA.gameObject.playerID;
                    const PlayerB_ID = bodyB.gameObject.playerID;
                    //console.log(bodyA);
                    //console.log(bodyB);

                    // historyRecorder.recordHistory({
                    //     event: "sportsPlayerCollision",
                    //     subjectID: PlayerA_ID,
                    //     objectID: PlayerB_ID,
                    //     message: `${PlayerA_ID} collides with ${PlayerB_ID}!`,
                    //     proximateCause: PlayerA_ID
                    // });

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
                    const lastHit = the_puck.gameObject.lastMoveCause;
                    const teamThatScoredName = this.sportsGame.teams[teamThatScored].name;
                    
                    // increase score
                    this.sportsGame.score[teamThatScoredName] += 1;

                    const TeamOne = this.sportsGame.teams[0].name;
                    const TeamTwo = this.sportsGame.teams[1].name;
                    let ScoreOne = this.sportsGame.score[TeamOne];
                    let ScoreTwo = this.sportsGame.score[TeamTwo];
                    
                    // log event
                    historyRecorder.recordHistory({
                        currentGame: this.sportsGame.gameID,
                        currentPeriod: this.currentPeriod,
                        timeStep: currentTime,
                        event: "sportsGoalScored",
                        target: the_puck.gameObject.playerID,
                        actor: lastHit,
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

            this.periodLength = 400;
            this.periodCount = 1;
            this.currentPeriod = 0;
            this.currentPeriodStart = 0;
            this.penaltyTime = 0;
            this.bonusTime = 0;

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
            if (sportPlayer.team == 1) {
                target_point_x = this.GoalBackWidth + 20;
                hitColor = 0xff0055;
            }
            if (sportPlayer.team == 2) {
                target_point_x = fieldWidth - (this.GoalBackWidth + 20);
                hitColor = 0x5500ff;
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
            //console.log(this.players);
            this.players.forEach((p) => {
                //console.log(p)
                p.update(time, delta);
            });


            const currentTime = this.game.getFrame();

            const TeamOne = this.sportsGame.teams[0].name;
            const TeamTwo = this.sportsGame.teams[1].name;
            const ScoreOne = this.sportsGame.score[TeamOne];
            const ScoreTwo = this.sportsGame.score[TeamTwo];
            
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

                    this.matter.world.off("collisionstart");
                    
                    this.scene.stop();
                    currentSceneId = null;
                }
            }
            

        }
    }