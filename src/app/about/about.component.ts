import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  errMess: string;
  leader: Leader;
  leaders: Leader[];
  constructor(private leaderservice: LeaderService, @Inject('BaseURL') public BaseURL ) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // this.leader = this.leaderservice.getLeader(id);
    this.leaderservice.getLeaders()
    .subscribe(leaders => this.leaders = leaders,
      errmess => this.errMess = (errmess as any));
  }

}
