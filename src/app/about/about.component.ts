import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leader: Leader;
  leaders: Leader[];
  constructor(private leaderservice: LeaderService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // this.leader = this.leaderservice.getLeader(id);
    this.leaderservice.getLeaders()
    .subscribe(leaders => this.leaders = leaders);
  }

}
