    const collision_mask_arena = 0b0000001;
    const collision_mask_score = 0b0000010;
    const collision_mask_puck  = 0b0000100;
    const collision_mask_team1 = 0b0001000;
    const collision_mask_team2 = 0b0010000;
    const collision_puck_sense = 0b0100000;

    const fieldHeight = 600;
    const fieldWidth = 800;


    // Hlocky event list: building the data model
    //
    // Events:
    // sportsPlayerHitsPuck: player hits puck
    // sportsPlayerCollision: player collides with player
    // sportsGoalScored
    // arenaOutOfBounds
    // arenaInOfBounds

    // Game Events:
    // arenaPuckResetToCenter
    // sportsGameStart
    // sportsGameEnd
    // sportsGamePeriodEnd
    // sportsGamePeriodStart
    // sportsGamePeriodOvertime
    //
    // Bookkeeping events:
    // sportsScoreReport
    //
    // Major Patterns:
    // PlayerX scored a goal for TeamY
    // (TeamZ) PlayerX passed the puck to (TeamZ) PlayerY, who scored a goal for teamZ
    // 
    // Minor Patterns:
    // (TeamZ) PlayerX passed the puck to (TeamZ) PlayerY
    // (TeamZ) PlayerX passed the puck to (TeamW) PlayerY

    class Metatron {
        constructor() {
            this.history = [];
            this.partialMatches = compiledPatterns.map(pat => {return {pattern: pat, bindings: {}}});

            this.db = datascript.empty_db(schema);
            //let parsed = parse(allRawSiftingPatterns);
            //this.compiledPatterns = compile(parsed);
        }

        recordHistory(event) {
            console.log(event);
            this.history.push(event);

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

        announceHistory(matchGroups) {
            const completedPatterns = matchGroups.complete || [];
            completedPatterns.forEach(match => {
                console.log(match.pattern.name);
            });
        }

        reportHistory() {
            let report = [];
            this.history.forEach((e) => {
                //console.log(e);
                report.push(e.message);
            });
            console.log(report);
            console.log(this.history);
        }
    }

    const historyRecorder = new Metatron();

    class SportPlayer extends Phaser.Physics.Arcade.Sprite {
        constructor(scene, x, y, teamNumber, personality, history_recorder, playerID)
        {
            super(scene, x, y);
            //scene.physics.add.existing(this);
            this.scene.add.existing(this);
            this.playerID = playerID;

            this.personality = personality;
            this.history_recorder = history_recorder;

            this.max_rotation_speed = 4.0;

            if (teamNumber >= 0) {
                const sensor = this.scene.matter.bodies.circle(0, 0, 32, {isSensor: true, label: 'nearby'});
                sensor.label = "playerSensor";
                const player_size = 3 + (24 * ((1.0 - this.personality.areodynamics) * this.personality.grit));
                const player_reach = Math.max(player_size + 6, 38 * this.personality.edge);
                const core = this.scene.matter.bodies.circle(0, 0, player_size);
                core.label = "player";
                const compoundBody = this.scene.matter.body.create({
                    parts: [sensor, core],
                    inertia: Infinity,
                    friction: 0.511000001 * (1.0 - this.personality.areodynamics)
                });

                this.pBody = this.scene.matter.add.gameObject(this);
                this.pBody.setExistingBody(compoundBody)
                if (teamNumber % 2 == 0) {
                    this.setTexture('star_flip');
                    
                    this.pBody.setCollidesWith(collision_mask_puck | collision_mask_team1 | collision_mask_team2 | collision_mask_arena).setCollisionCategory(collision_mask_team2);
                    this.body.label = "player";
                    this.label = "player";
                    this.pBody.playerID = this.playerID;
                    this.teamNum = teamNumber % 2;
                } else {
                    this.setTexture('star');
                    this.pBody.setCollidesWith(collision_mask_puck | collision_mask_team1 | collision_mask_team2 | collision_mask_arena).setCollisionCategory(collision_mask_team1);
                    this.body.label = "player";
                    this.label = "player";
                    this.pBody.playerID = this.playerID;
                    this.teamNum = teamNumber % 2;
                }
                this.pBody.setVelocity(Phaser.Math.Between(-0.010, 0.010), Phaser.Math.Between(-0.010, 0.010));
                this.pBody.setFrictionAir(0.41101 * (1.0 - this.personality.areodynamics));
                this.pBody.setFriction(0.001);
                this.pBody.setBounce(0.89999999);
                //this.pBody.setMass(2.001);
                this.teamName = scene.sportsGame.teams[teamNumber % 2].name;

                this.playerNameLabel = scene.add.text(0, 0, this.playerID + "\n" + this.teamName, { font: 'sans serif'});

                
            } else {
                this.setTexture('puck');
                //const puck_sensor = this.scene.matter.bodies.circle(0, 0, 16, {isSensor: true, label: 'puck'});
                //const puck_core = this.scene.matter.bodies.circle(0, 0, 16, {label: 'puck'});
                //puck_sensor.setCollidesWith(collision_mask_team1 | collision_mask_team2).setCollisionCategory(collision_puck_sense);
                //puck_core.setCollidesWith(collision_mask_puck |  collision_mask_score | collision_mask_arena).setCollisionCategory(collision_mask_puck);

                // const compoundBody = this.scene.matter.body.create({
                //     parts: [puck_sensor, puck_core],
                //     inertia: Infinity,
                //     friction: 0.0001
                // });
                //this.pBody = this.scene.matter.add.gameObject(this);
                //this.pBody.setExistingBody(compoundBody);

                this.pBody = this.scene.matter.add.gameObject(this).setCollidesWith(collision_mask_team1 | collision_mask_team2 | collision_mask_puck |  collision_mask_score | collision_mask_arena).setCollisionCategory(collision_mask_puck);

                this.isPuck = true;
                this.body.label = "puck";
                this.teamName = "puck";
                this.pBody.playerID = this.playerID;

                this.pBody.setVelocity(Phaser.Math.Between(-0.010, 0.010), Phaser.Math.Between(-0.010, 0.010));
                this.pBody.setFrictionAir(0.01);
                this.pBody.setFriction(0.2);
                this.pBody.setMass(0.2);

                this.pBody.setBounce(0.99999999);
            }
            
            this.setPosition(x, y);
            this.team = teamNumber;
            
            //this.pBody.setFriction(0);
            //this.pBody.body.inertia = Infinity;
        }

        setTeam(teamNumber) {
            this.team = teamNumber;
            console.log(this.team);
        }

        create() {
            
        }

        preUpdate (time, delta)
        {
            super.preUpdate(time, delta);

            this.rotation += 0.01;
        }

        update(time, delta)
        {
            
            if (this.isPuck) {
                //console.log(this);
            } else {
                const angle = this.scene.angleToPuck(this);
                //const angleDelta = Phaser.Math.Angle.Wrap(angle);
                //this.setAngularVelocity(angleDelta * 0.01);
                //this.thrust(0.1);
                if ((this.personality.diligence) > Phaser.Math.FloatBetween(0.0, 1.0)) {
                    
                    const thrust = 0.1 * this.personality.gumption * (2 * (0.5 - this.personality.fear));
                    this.scene.matter.applyForceFromAngle(this.pBody, thrust, angle);
                    this.lastMoveCause = this.playerID;
                }

                if ((this.personality.distractibility) > Phaser.Math.FloatBetween(0.0, 1.0)) {
                    const angle = Phaser.Math.FloatBetween(0, 2 * Phaser.Math.PI2);
                    const thrust = 0.1;
                    this.scene.matter.applyForceFromAngle(this.pBody, thrust, angle);
                    this.lastMoveCause = this.playerID;
                }
            }


            // Check for out-of-bounds
            if (this.x < 0 || this.y < 0 || this.x > fieldWidth || this.y > fieldHeight) {
                this.history_recorder.recordHistory(
                    {event: "arenaOutOfBounds",
                    player: this.playerID,
                    place: "limbo",
                    actor: this.playerID,
                    actorTeam: this.teamName,
                    message: `${this.playerID} went out of bounds!`,
                    proximateCause: this.lastMoveCause,
                    tags: ["limbo", "player-event", "arena"]
                });

                this.playerInLimbo = true;
            }
            if (this.playerInLimbo) {

                this.history_recorder.recordHistory(
                    {event: "arenaInOfBounds",
                    player: this.playerID,
                    place: "arena",
                    actor: this.playerID,
                    actorTeam: this.teamName,
                    message: `${this.playerID} returned to the rink!`,
                    proximateCause: this.lastMoveCause,
                    tags: ["limbo", "player-event", "arena"]
                });

                this.x = Phaser.Math.FloatBetween(0, fieldWidth);
                this.y = Phaser.Math.FloatBetween(0, fieldHeight);
                this.playerInLimbo = false;
                this.pBody.setVelocity(Phaser.Math.Between(-0.010, 0.010), Phaser.Math.Between(-0.010, 0.010));
            }

            if(this.forceToApply) {
                if(this.forceToApply.length >= 2) {
                    const forceMag = this.forceToApply[0];
                    const forceAngle = this.forceToApply[1];
                    this.pBody.applyForce({x: Math.cos(forceAngle) * forceMag, y: Math.sin(forceAngle) * forceMag});
                    this.forceToApply = null;
                }
            }

            if(this.playerNameLabel) {
                this.playerNameLabel.x = this.x;  
                this.playerNameLabel.y = this.y - 20;  
            }
            

        }


    }
    class sportsGameScene extends Phaser.Scene
    {
        preload ()
        {
            //this.load.setBaseURL('.');

            this.load.image('sky', 'assets/space3.png');
            this.load.image('logo', 'assets/phaser3-logo.png');
            this.load.image('red', 'assets/red.png');
            this.load.image('star', 'assets/star.png');
            this.load.image('star_flip', 'assets/flip_star.png');
            this.load.image('puck', 'assets/bomb.png');
            this.load.image('corner', 'assets/arc.png');
            this.load.image('goal', 'assets/goal.png');
        }

        initSportsGame(teams) {

        }

        create ()
        {
            
            // debugging viz
            //this.viz_graphic = this.add.graphics({ lineStyle: { color: 0x00ffff } });

            this.periodLength = 500;
            this.periodCount = 3;
            this.currentPeriod = 0;
            this.currentPeriodStart = 0;
            this.penaltyTime = 0;
            this.bonusTime = 0;

            this.inPlayPuckCount = 0;


            this.GoalBackWidth = 125;
            this.add.image(400, 300, 'sky');

            this.matter.world.setBounds();

            this.sportsGame = {
                score: {0: 0, 1: 0},
                teams: [{name: "TeamOne"}, {name: "TeamTwo"}]
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


            // this.group_players = this.physics.add.group({
            //     'key': 'players'
            // });

            

            this.players = [];
            const numPlayers = 5;
            for(let i = 0; i < numPlayers; i++) {
                
                let sportTeam = -1;
                let playerID = "UnnamedPlayer";
                let teamID = null;
                if (0 != i) {
                    sportTeam = 1 + (i % 2);
                    playerID = `player_${i}`;
                    const teamNum = (i % 2);
                    if (this.sportsGame.teams.length < teamNum) {
                        teamID = this.sportsGame.teams[(i % 2)].name;
                    }               
                    this.addRandomPlayer(sportTeam, playerID, teamNum, teamID);                 
                }
                else {
                    playerID = "puck_0";
                    this.addPuck();
                }
                
            }
            this.puck = this.players[0];
            //particles.startFollow(logo);

            //this.physics.world.collide(this.group_wall, this.group_players)


            this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {

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

                    const angle_to_goal = this.angleToGoal(the_player.gameObject);
                    const thrust = 0.01;

                    if(the_player.gameObject.personality.twitchiness) {
                        //thrust = 1.0 * the_player.gameObject.personality.twitchiness * the_player.gameObject.personality.twitchiness;
                    }

                    //console.log(the_puck);

                    the_puck.gameObject.lastMoveCause = PlayerA_ID;
                    the_puck.gameObject.lastMoveTime = this.game.getFrame();
                    the_puck.gameObject.forceToApply = [thrust, angle_to_goal];

                    historyRecorder.recordHistory({
                        event: "sportsPlayerHitsPuck",
                        player: PlayerA_ID,
                        puck: PlayerB_ID,
                        actor: PlayerA_ID,
                        actorTeam: this.teamName,
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

                    const TeamOne = this.sportsGame.teams[0].name;
                    const TeamTwo = this.sportsGame.teams[1].name;
                    const teamThatScoredName = this.sportsGame.teams[teamThatScored].name;

                    console.log(the_puck);

                    // log event
                    historyRecorder.recordHistory({
                        event: "sportsGoalScored",
                        player: lastHit,
                        puck: the_puck.gameObject.playerID,
                        target: the_puck.gameObject.playerID,
                        actor: lastHit,                        
                    	actorTeam: teamThatScoredName,
                        subjectID: the_puck.gameObject.playerID,
                        message: `Goal scored in ${teamThatScoredName}'s goal by ${lastHit} !`,
                        proximateCause: lastHit,
                        tags: ["play-event", "goal", "puck-event"]
                    });

                    // increase score
                    this.sportsGame.score[teamThatScoredName] += 1;

                    const ScoreOne = this.sportsGame.score[TeamOne];
                    const ScoreTwo = this.sportsGame.score[TeamTwo];

                    historyRecorder.recordHistory({
                        event: "sportsScoreReport",
                        player: lastHit,
                        puck: the_puck.gameObject.playerID,
                        subjectID: the_puck.gameObject.playerID,
                        message: `The score is now ${TeamOne} ${ScoreOne} to ${TeamTwo} ${ScoreTwo}`,
                        proximateCause: lastHit,
                        tags: ["game-event", "play-event"]
                    });

                    //reset puck
                    the_puck.gameObject.pBody.setVelocity(0,0);
                    the_puck.gameObject.pBody.x = fieldWidth / 2;
                    the_puck.gameObject.pBody.y = fieldHeight / 2;
                    historyRecorder.recordHistory({
                        event: "arenaPuckResetToCenter",
                        subjectID: the_puck.gameObject.playerID,
                        puck: the_puck.gameObject.playerID,
                        message: `Puck ${the_puck.gameObject.playerID} returned to the center point`,
                        proximateCause: "the Director",
                        tags: ["game-event", "play-event"]
                    });
                    
                    console.log(this.sportsGame);

                }
            });

            this.matter.world.debugConfig.showVelocity = true;
            //this.matter.world.debugConfig.showCollisions = true;

            const TeamOne = this.sportsGame.teams[0].name;
            const TeamTwo = this.sportsGame.teams[1].name;
            historyRecorder.recordHistory({
                event: "sportsGameStart",
                subjectID: TeamOne,
                objectID: TeamTwo,
                message: `The game between ${TeamOne} and ${TeamTwo} begins.`,
                proximateCause: "the Director"
            });
            this.resetFaceoff();
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

            this.players.push(sportPlayer);
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

            target_point_x += Phaser.Math.FloatBetween(0 - accuracyVariance, accuracyVariance);
            target_point_y += Phaser.Math.FloatBetween(0 - accuracyVariance, accuracyVariance);
            const hitViz = this.add.circle(target_point_x, target_point_y, 5, hitColor);
            this.timedEvent = this.time.delayedCall(15000, () => {
                hitViz.destroy();
            }, [], this);

            let puck_dist = Phaser.Math.Distance.Between(sportPlayer.x, sportPlayer.y, target_point_x, target_point_y);
            
            //this.viz_graphic = this.add.graphics({ lineStyle: { color: 0x00ffff } });
            // console.log(this.viz_graphic);
            //this.viz_graphic.clear().strokeCircle(sportPlayer.x, sportPlayer.y, puck_dist);


            return Phaser.Math.Angle.Between(sportPlayer.x, sportPlayer.y, target_point_x, target_point_y);
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
                event: "sportsGamePeriodEnd",
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
                    event: "sportsGameEnd",
                    subjectID: "game_" + TeamOne + "_" + TeamTwo,
                    message: `Game over. Final score, ${TeamOne} ${ScoreOne}, ${TeamTwo} ${ScoreTwo}.`,
                    proximateCause: "the Director",
                    data: {TeamOne: ScoreOne, TeamTwo: ScoreTwo}
                    });
                    this.scene.stop();

                    historyRecorder.reportHistory();

                }
            }
            

        }
    }