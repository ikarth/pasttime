const gameHistory = [
    {
        "event": "sportsGameStart",
        "subjectID": "TeamOne",
        "objectID": "TeamTwo",
        "message": "The game between TeamOne and TeamTwo begins.",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsGoalScored",
        "subjectID": "puck",
        "message": "Goal scored in TeamOne's goal by player_5 !",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsScoreReport",
        "subjectID": "puck",
        "message": "The score is now TeamOne 1 to TeamTwo 0",
        "proximateCause": "player_5"
    },
    {
        "event": "arenaPuckResetToCenter",
        "subjectID": "puck",
        "message": "Puck returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_7",
        "objectID": "puck_1",
        "message": "player_7 hits the puck_1!",
        "proximateCause": "player_7"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_7",
        "objectID": "puck_1",
        "message": "player_7 hits the puck_1!",
        "proximateCause": "player_7"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_7",
        "objectID": "puck_1",
        "message": "player_7 hits the puck_1!",
        "proximateCause": "player_7"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsGamePeriodEnd",
        "subjectID": "game_TeamOne_TeamTwo",
        "message": "End of period 1, score is TeamOne 1, TeamTwo 0",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_4",
        "message": "player_4 went out of bounds!",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_4",
        "message": "player_4 returned to the rink!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsGoalScored",
        "subjectID": "puck",
        "message": "Goal scored in TeamTwo's goal by player_5 !",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsScoreReport",
        "subjectID": "puck",
        "message": "The score is now TeamOne 1 to TeamTwo 1",
        "proximateCause": "player_5"
    },
    {
        "event": "arenaPuckResetToCenter",
        "subjectID": "puck",
        "message": "Puck returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_7",
        "objectID": "puck_1",
        "message": "player_7 hits the puck_1!",
        "proximateCause": "player_7"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_1",
        "message": "player_6 hits the puck_1!",
        "proximateCause": "player_6"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_4",
        "message": "player_4 went out of bounds!",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_4",
        "message": "player_4 returned to the rink!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_1",
        "message": "player_6 hits the puck_1!",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_1",
        "message": "player_6 hits the puck_1!",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_7",
        "objectID": "puck_1",
        "message": "player_7 hits the puck_1!",
        "proximateCause": "player_7"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsGamePeriodEnd",
        "subjectID": "game_TeamOne_TeamTwo",
        "message": "End of period 2, score is TeamOne 1, TeamTwo 1",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_8",
        "objectID": "puck_1",
        "message": "player_8 hits the puck_1!",
        "proximateCause": "player_8"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_8",
        "objectID": "puck_1",
        "message": "player_8 hits the puck_1!",
        "proximateCause": "player_8"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_7",
        "objectID": "puck_1",
        "message": "player_7 hits the puck_1!",
        "proximateCause": "player_7"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_1",
        "message": "player_6 hits the puck_1!",
        "proximateCause": "player_6"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_7",
        "objectID": "puck_1",
        "message": "player_7 hits the puck_1!",
        "proximateCause": "player_7"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_3",
        "objectID": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsGamePeriodEnd",
        "subjectID": "game_TeamOne_TeamTwo",
        "message": "End of period 3, score is TeamOne 1, TeamTwo 1",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsGamePeriodOvertime",
        "subjectID": "game_TeamOne_TeamTwo",
        "message": "The score is tied, TeamOne 1, TeamTwo 1, going to overtime.",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsGoalScored",
        "subjectID": "puck",
        "message": "Goal scored in TeamOne's goal by player_1 !",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsScoreReport",
        "subjectID": "puck",
        "message": "The score is now TeamOne 2 to TeamTwo 1",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaPuckResetToCenter",
        "subjectID": "puck",
        "message": "Puck returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_2",
        "message": "player_1 hits the puck_2!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_2",
        "message": "player_1 hits the puck_2!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_2",
        "message": "player_5 hits the puck_2!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_2",
        "message": "player_2 hits the puck_2!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_2",
        "message": "player_1 hits the puck_2!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_2",
        "message": "player_6 hits the puck_2!",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsGoalScored",
        "subjectID": "puck",
        "message": "Goal scored in TeamTwo's goal by player_6 !",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsScoreReport",
        "subjectID": "puck",
        "message": "The score is now TeamOne 2 to TeamTwo 2",
        "proximateCause": "player_6"
    },
    {
        "event": "arenaPuckResetToCenter",
        "subjectID": "puck",
        "message": "Puck returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_2",
        "message": "player_6 hits the puck_2!",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_1",
        "message": "player_6 hits the puck_1!",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_1",
        "message": "player_6 hits the puck_1!",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_2",
        "message": "player_4 hits the puck_2!",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsGoalScored",
        "subjectID": "puck",
        "message": "Goal scored in TeamOne's goal by player_2 !",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsScoreReport",
        "subjectID": "puck",
        "message": "The score is now TeamOne 3 to TeamTwo 2",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaPuckResetToCenter",
        "subjectID": "puck",
        "message": "Puck returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_1",
        "message": "player_2 hits the puck_1!",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_4",
        "message": "player_4 went out of bounds!",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_4",
        "message": "player_4 returned to the rink!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsGoalScored",
        "subjectID": "puck",
        "message": "Goal scored in TeamTwo's goal by player_4 !",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsScoreReport",
        "subjectID": "puck",
        "message": "The score is now TeamOne 3 to TeamTwo 3",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaPuckResetToCenter",
        "subjectID": "puck",
        "message": "Puck returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_3",
        "objectID": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_3",
        "objectID": "puck_1",
        "message": "player_3 hits the puck_1!",
        "proximateCause": "player_3"
    },
    {
        "event": "sportsGamePeriodEnd",
        "subjectID": "game_TeamOne_TeamTwo",
        "message": "End of period 4, score is TeamOne 3, TeamTwo 3",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsGamePeriodOvertime",
        "subjectID": "game_TeamOne_TeamTwo",
        "message": "The score is tied, TeamOne 3, TeamTwo 3, going to overtime.",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_3",
        "message": "player_5 hits the puck_3!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_3",
        "message": "player_6 hits the puck_3!",
        "proximateCause": "player_6"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_4",
        "message": "player_4 went out of bounds!",
        "proximateCause": "player_4"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_4",
        "message": "player_4 returned to the rink!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_3",
        "message": "player_6 hits the puck_3!",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_3",
        "message": "player_2 hits the puck_3!",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_7",
        "objectID": "puck_1",
        "message": "player_7 hits the puck_1!",
        "proximateCause": "player_7"
    },
    {
        "event": "sportsGoalScored",
        "subjectID": "puck",
        "message": "Goal scored in TeamTwo's goal by player_2 !",
        "proximateCause": "player_2"
    },
    {
        "event": "sportsScoreReport",
        "subjectID": "puck",
        "message": "The score is now TeamOne 3 to TeamTwo 4",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaPuckResetToCenter",
        "subjectID": "puck",
        "message": "Puck returned to the center point",
        "proximateCause": "the Director"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_3",
        "message": "player_1 hits the puck_3!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_6",
        "objectID": "puck_1",
        "message": "player_6 hits the puck_1!",
        "proximateCause": "player_6"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_3",
        "message": "player_1 hits the puck_3!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_5",
        "objectID": "puck_1",
        "message": "player_5 hits the puck_1!",
        "proximateCause": "player_5"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_2",
        "objectID": "puck_2",
        "message": "player_2 hits the puck_2!",
        "proximateCause": "player_2"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 went out of bounds!",
        "proximateCause": "player_1"
    },
    {
        "event": "arenaOutOfBounds",
        "subjectID": "player_1",
        "message": "player_1 returned to the rink!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_8",
        "objectID": "puck_1",
        "message": "player_8 hits the puck_1!",
        "proximateCause": "player_8"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_3",
        "message": "player_1 hits the puck_3!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_3",
        "message": "player_1 hits the puck_3!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_4",
        "objectID": "puck_1",
        "message": "player_4 hits the puck_1!",
        "proximateCause": "player_4"
    },
    {
        "event": "sportsPlayerHitsPuck",
        "subjectID": "player_1",
        "objectID": "puck_1",
        "message": "player_1 hits the puck_1!",
        "proximateCause": "player_1"
    },
    {
        "event": "sportsGamePeriodEnd",
        "subjectID": "game_TeamOne_TeamTwo",
        "message": "End of period 5, score is TeamOne 3, TeamTwo 4",
        "proximateCause": "the Director"
    },
    {
        "event": "sportsGameEnd",
        "subjectID": "game_TeamOne_TeamTwo",
        "message": "Game over. Final score, TeamOne 3, TeamTwo 4.",
        "proximateCause": "the Director",
        "data": {
            "TeamOne": 3,
            "TeamTwo": 4
        }
    }
];


const schema = {
  tag:    {":db/cardinality": ":db.cardinality/many"}
};

const allRawSiftingPatterns = `

(pattern scoreGoal
  (event ?e1 where
    event: sportsPlayerHitsPuck,
    objectID: ?puck
    subjectID: ?actor)
  (event ?e2 where
    event: sportsGoalScored,
    subjectID: ?puck,
    proximateCause: ?actor)
  (unless-event ?eMid between ?e1 ?e2 where
    objectID: ?puck
    event: sportsPlayerHitsPuck)
  )

 (pattern passThePuck
  (event ?e1 where
    event: sportsPlayerHitsPuck,
    objectID: ?puck
    subjectID: ?actor1)
  (event ?e2 where
    event: sportsPlayerHitsPuck,
    objectID: ?puck
    subjectID: ?actor2)
  (unless-event ?eMid between ?e1 ?e2 where
    objectID: ?puck
    event: arenaPuckResetToCenter
    event: sportsPlayerHitsPuck)
  (unless-event ?eMid between ?e1 ?e2 where
    objectID: ?puck
    event: arenaPuckResetToCenter
    event: sportsPlayerHitsPuck)
  )    

(pattern scoreGoalAssist
  (event ?e1 where
    event: sportsPlayerHitsPuck,
    objectID: ?puck
    subjectID: ?actor1)
  (event ?e2 where
    event: sportsPlayerHitsPuck,
    objectID: ?puck
    subjectID: ?actor2
    proximateCause: ?actor1)
  (event ?e3 where
    event: sportsGoalScored,
    ;subjectID: ?puck
    proximateCause: ?actor2)
  (unless-event ?eMid between ?e1 ?e3 where
    objectID: ?puck
    event: sportsPlayerHitsPuck)
  )   
  `;



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