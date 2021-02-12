var Game = /** @class */ (function () {
    function Game() {
        //id:number;
        this.teams = [];
        for (var index = 0; index < 2; index++) {
            this.teams.push(new Team(index, this));
        }
        this.playing_team = this.teams[0];
        //this.id=0;
    }
    Game.prototype.changeTeam = function () {
        this.playing_team = this.teams[1];
        //this.id=1;
    };
    return Game;
}());
var Team = /** @class */ (function () {
    function Team(team_id, playing_team) {
        this.players = [];
        this.team_id = team_id;
        this.playing_team = playing_team;
        for (var i = 0; i < 10; i++) {
            this.players.push(new Player(i, this));
        }
        this.current_player = this.players[0];
    }
    Team.prototype.changePlayer = function () {
        this.current_player = this.players[this.team_id + 1];
    };
    Team.prototype.changeTeam = function () {
        this.playing_team.changeTeam();
    };
    Team.team_score = [0, 0];
    return Team;
}());
var Player = /** @class */ (function () {
    function Player(id, changePlayers) {
        this.individual_score = 0;
        this.ball_index = 0;
        this.all_balls = [null, null, null, null, null, null];
        this.player_id = id;
        this.changePlayers = changePlayers;
    }
    //hit runs
    Player.prototype.ballhit = function () {
        var random_run = Math.floor(Math.random() * 7);
        this.all_balls[this.ball_index] = random_run;
        this.individual_score += random_run;
        Team.team_score[this.team_number] += random_run;
        this.ball_index++;
        if (random_run === 0 || this.ball_index == 7) {
            if (this.player_id == 9 && this.changePlayers.team_id == 0) {
                this.changePlayers.changeTeam();
                this.team_number = 1;
                console.log("Team changed!!!" + this.team_number + "= team_number");
                this.player_id = 0;
                document.getElementById("hit1").disabled = true;
                document.getElementById("hit2").disabled = false;
            }
            if (this.changePlayers.team_id == 1 && this.player_id == 9) {
                console.log("Game ended");
                document.getElementById("hit2").disabled = true;
            }
            this.ball_index = 0;
            this.changePlayers.changePlayer();
            this.player_id++;
            console.log("Team= " + this.changePlayers.team_id + ", " + this.player_id + ", Player changed! and team_number=" + this.team_number);
            console.log(Team.team_score);
        }
    };
    return Player;
}());
var game;
document.getElementById("create-teams").addEventListener("click", function () {
    game = new Game();
    document.getElementById("hit1").disabled = false;
    document.getElementById("hit2").disabled = true;
    console.log(game);
});
document.getElementById("hit1").addEventListener("click", function () {
    game.playing_team.current_player.ballhit();
    console.log(game);
    //console.log("Team score=", Team.team_score);
});
document.getElementById("hit2").addEventListener("click", function () {
    game.playing_team.current_player.ballhit();
    console.log(game);
    //console.log("Team score=", Team.team_score);
});
document.getElementById("generate").addEventListener("click", function () {
    console.log("result generated: ", game);
    var table = document.createElement("table");
    table.innerHTML = "<tr>\n    <td>Team 1</td>\n    <td>Ball 1</td>\n    <td>Ball 2</td>\n    <td>Ball 3</td>\n    <td>Ball 4</td>\n    <td>Ball 5</td>\n    <td>Ball 6</td>\n  </tr>";
    for (var i = 0; i < 10; i++) {
        var tr = document.createElement("tr");
        var player = document.createElement("td");
        table.appendChild(tr);
        player.innerHTML = "Player " + (i + 1);
        tr.appendChild(player);
        for (var j = 0; j < 6; j++) {
            var td = document.createElement("td");
            td.innerHTML = game.teams[0].players[i].all_balls[j];
            tr.appendChild(td);
        }
    }
    document.body.appendChild(table);
});
