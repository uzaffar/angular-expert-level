import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, tap} from 'rxjs';
import {NbaService} from '../nba.service';
import {Game, Stats, Team} from '../data.models';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit, OnDestroy {

  @Input()
  team!: Team;

  games$!: Observable<Game[]>;
  stats!: Stats;
  showModal = false;
  numberOfDays = new BehaviorSubject<number>(6);
  subs: Subscription | undefined;
  showResults = [6, 12, 20];
  buttons = [
    {
      backgroundColorHex: '#b7b7b7',
      textColorHex: '#000000',
      icon: 'fa fa-trash',
      prefixIcon: true,
      name: 'No'
    },
    {
      backgroundColorHex: '#410000',
      textColorHex: '#ffffff',
      icon: 'fa fa-home',
      prefixIcon: true,
      name: 'Yes'
    },
  ]

  constructor(protected nbaService: NbaService) {
  }


  ngOnInit(): void {
    this.subs = this.numberOfDays.subscribe(
      val => {
        this.games$ = this.nbaService.getLastResults(this.team, val).pipe(
          tap(games => this.stats = this.nbaService.getStatsFromGames(games, this.team))
        )
      }
    )
  }

  removeTrackedTeam() {
    this.showModal = true;
  }

  dialogAction(event: string, team: Team) {
    if (event === 'Yes') {
      this.showModal = false;
      this.nbaService.removeTrackedTeam(team);
    } else {
      this.showModal = false;
    }
  }

  updateData(days: string) {
    this.numberOfDays.next(Number(days))
  }


  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }
}
