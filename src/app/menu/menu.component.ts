import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
// import { baseURL } from '../shared/baseurl';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
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
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishService: DishService, @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = (errmess as any));
  }
}
