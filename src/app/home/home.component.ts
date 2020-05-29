import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(private dishservice: DishService, private promotionservice: PromotionService, private leaderservice: LeaderService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      dishErrMsg => this.dishErrMess = (dishErrMsg as any));
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      promoErrMsg => this.promoErrMess = (promoErrMsg as any));
    this.leaderservice.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      leaderErrMsg => this.leaderErrMess = (leaderErrMsg as any));
  }

}
