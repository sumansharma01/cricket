
class Game {
  //id:number;
  teams: Array<Team> = [];
  playing_team: Team;
  constructor() {
    for (let index = 0; index < 2; index++) {
      this.teams.push(new Team(index, this));
    }
    this.playing_team = this.teams[0];
    //this.id=0;
  }
  changeTeam() {
    this.playing_team = this.teams[1];
    //this.id=1;
  }
}

class Team {
  team_id: number;
  players: Array<Player> = [];
  static team_score: [number, number] = [0, 0];
  current_player: Player;
  playing_team: Game;
  constructor(team_id: number, playing_team: Game) {
    this.team_id = team_id;
    this.playing_team = playing_team;
    for (let i = 0; i < 10; i++) {
      this.players.push(new Player(i, this));
    }
    this.current_player = this.players[0];
  }
  changePlayer() {
    this.current_player = this.players[this.team_id + 1];
  }
  changeTeam() {
    this.playing_team.changeTeam();
  }
}


class Player {
  player_id: number;
  team_number: number;

  individual_score: number = 0;
  ball_index: number = 0;
  all_balls: Array<number> = [null, null, null, null, null, null];
  changePlayers: Team;

  constructor(id: number, changePlayers: Team) {
    this.player_id = id;
    this.changePlayers = changePlayers;
  }

  //hit runs
  ballhit() {
    let random_run = Math.floor(Math.random() * 7);
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
        (document.getElementById("hit1") as HTMLButtonElement).disabled = true;
        
        (document.getElementById("hit2") as HTMLButtonElement).disabled = false;
      }
      if (this.changePlayers.team_id == 1 && this.player_id == 9) {
        console.log("Game ended");
        (document.getElementById("hit2") as HTMLButtonElement).disabled = true;
      }
      this.ball_index = 0;

      this.changePlayers.changePlayer();
      this.player_id++;
      console.log(
        `Team= ${this.changePlayers.team_id}, ${this.player_id}, Player changed! and team_number=${this.team_number}`
      );
      console.log(Team.team_score);
    }
  }
}

let game;

document.getElementById("create-teams").addEventListener("click", () => {
  game = new Game();
  (document.getElementById("hit1") as HTMLButtonElement).disabled = false;
  
  (document.getElementById("hit2") as HTMLButtonElement).disabled = true;
  console.log(game);
});

document.getElementById("hit1").addEventListener("click", () => {
  game.playing_team.current_player.ballhit();
  console.log(game);
  //console.log("Team score=", Team.team_score);
});
document.getElementById("hit2").addEventListener("click", () => {
  game.playing_team.current_player.ballhit();
  console.log(game);
  //console.log("Team score=", Team.team_score);
});

document.getElementById("generate").addEventListener("click", () => {
  console.log("result generated: ",game);
  let table=document.createElement("table");
  table.innerHTML=`<tr>
    <td>Team 1</td>
    <td>Ball 1</td>
    <td>Ball 2</td>
    <td>Ball 3</td>
    <td>Ball 4</td>
    <td>Ball 5</td>
    <td>Ball 6</td>
  </tr>`;
  for(let i=0;i<10;i++){
    let tr=document.createElement("tr");
    let player=document.createElement("td");
    table.appendChild(tr);
    player.innerHTML=`Player ${i+1}`;
    tr.appendChild(player);
    for(let j=0;j<6;j++){
      let td=document.createElement("td");
      td.innerHTML=game.teams[0].players[i].all_balls[j];
      tr.appendChild(td);
    }
  }


  document.body.appendChild(table);
});