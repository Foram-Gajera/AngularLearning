import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Location } from '@angular/common';
import { Params , ActivatedRoute } from '@angular/router';
import { switchMap} from 'rxjs/operators';
import { MatSliderModule } from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { DISHES } from '../shared/dishes';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
})
export class DishdetailComponent implements OnInit {

  dishIds: string[];
  prev: string;
  next: string;
  dish: Dish;

  dishcopy: Dish;

  errMess: string;

  @ViewChild('cform') commentFormDirective;
  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
    name: '',
    rating: 5,
    comment: ''
  };

  validationMessages = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be at least 3 characters.',
    },
    comment: {
      required: 'comment is required.',
      minlength: 'Name must be at least 3 characters.'
    }
  };
    visibility = 'shown';

  constructor(private dishservice: DishService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder, @Inject('BaseURL') public BaseURL) {
    this.createForm();
   }

  ngOnInit(): void {
    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => {this.dish = dish;  this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
    errmess => this.errMess = (errmess as any));
  }

  createForm(){
    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data),
    errmess => this.errMess = (errmess as any));

    this.onValueChanged();
  }

  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.author = this.commentForm.value.name;
    this.comment.date = (new Date()).toDateString();
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
    .subscribe( dish => {
      this.dish = dish;
      this.dishcopy = this.dishcopy;
    },
    errmess => {
      this.dish = null;
      this.dishcopy = null;
      this.errMess = (errmess as any);
    });
    console.log(this.comment);
    this.commentForm.reset({
      name: '',
      rating: 0,
      comment: ''
    });
    // this.commentFormDirective.resetForm();
    // const commentobj = DISHES[8];
  }

  onValueChanged(data?: any){
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && control.invalid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }

}
