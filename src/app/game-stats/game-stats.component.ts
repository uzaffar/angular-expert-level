import {Component} from '@angular/core';
import {Team} from '../data.models';
import {Observable, tap} from 'rxjs';
import {NbaService} from '../nba.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent {

  teams$: Observable<Team[]>;
  allTeams: Team[] = [];
  teams: Team[] = [];
  divisions: string[] = ['-'];
  conferences = ['-', 'Western Conference', 'Eastern Conference']
  divisionEast = ['-', 'Atlantic', 'Central', 'Southeast'];
  divisionWest = ['-', 'Northwest', 'Pacific', 'Southwest'];

  constructor(protected nbaService: NbaService) {
    this.teams$ = nbaService.getAllTeams().pipe(
      tap(data => this.allTeams = data)
    );
  }

  trackTeam(teamId: string): void {
    let team = this.allTeams.find(team => team.id == Number(teamId));
    if (team)
      this.nbaService.addTrackedTeam(team);
  }

  getDivision = (value: string) => {
  }


  selectConference(event: string) {
    if (event === 'Eastern Conference') {
      this.divisions = this.divisionEast
    } else {
      this.divisions = this.divisionWest;
    }
  }

  getTeams = (allTeamsBE: Team[], conf: string, div: string) => {
    if (!!conf && conf === 'Eastern Conference') {
      return this.allTeams.filter(team => div && div !== '-'? team.division === div && team.conference === 'East' : team.conference === 'East')
    } else if (conf === 'Western Conference') {
      return this.allTeams.filter(team => div && div !== '-'? team.division === div && team.conference === 'West' : team.conference === 'West')
    } else {
      return this.allTeams
    }
  }


  selectDivision(value: string) {
    return this.allTeams.filter(team => team.division === value)
  }
}
