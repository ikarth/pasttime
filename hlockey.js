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
//
// sportsGameStart
// sportsGameEnd
// sportsGamePeriodEnd
// sportsGamePeriodStart
// sportsGamePeriodOvertime
//
// Bookkeeping events:
// sportsScoreReport
//
// Player/Team Events
//
// Major Patterns:
// PlayerX scored a goal for TeamY
// (TeamZ) PlayerX passed the puck to (TeamZ) PlayerY, who scored a goal for teamZ
// 
// Minor Patterns:
// (TeamZ) PlayerX passed the puck to (TeamZ) PlayerY
// (TeamZ) PlayerX passed the puck to (TeamW) PlayerY


// historyRecorder.recordHistory({
//     event: "sportsPlayerHitsPuck",
//     player: PlayerA_ID,
//     puck: PlayerB_ID,
//     actor: PlayerA_ID,
//     actorTeam: this.teamName,
//     target: PlayerB_ID,
//     targetTeam: the_puck.gameObject.teamName,
//     message: `${PlayerA_ID} hits the ${PlayerB_ID}!`,
//     proximateCause: PlayerA_ID,
//     tags: ["play-event", "puck-event", "common"]
// });

let historyRecorder = new Metatron();

class SportPlayer extends Phaser.Physics.Arcade.Sprite {
constructor(scene, x, y, teamNumber, personality, history_recorder, playerID)
{
    super(scene, x, y);
    //scene.physics.add.existing(this);
    this.scene.add.existing(this);
    this.playerID = playerID;

    this.personality = personality;
    this.history_recorder = history_recorder;

    this.pastEvents = [];

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

    const currentTime = this.scene.game.getFrame();
    
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
        this.history_recorder.recordHistory({   
                currentGame: this.scene.sportsGame.gameID,
                currentPeriod: this.scene.currentPeriod,
                timeStep: currentTime,
                event: "arenaOutOfBounds",
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

        this.history_recorder.recordHistory({
            currentGame: this.scene.sportsGame.gameID,
            currentPeriod: this.scene.currentPeriod,
            timeStep: currentTime,
            event: "arenaInOfBounds",
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


    