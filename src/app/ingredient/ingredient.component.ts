import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../ingredient';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  @Input() ingredients: Ingredient[];
  @Output() submitIngredient = new EventEmitter<Ingredient[]>();

  adding = false;
  addingUnit = false;
  newIngredient: Ingredient;
  units = ["g","mL","cuillières à café"];
  newUnit: String;


  constructor() { }

  ngOnInit() {
    //this.ingredients = [];
  }

  add(){
    this.newIngredient = new(Ingredient);
    this.adding = true;
  }
  submit(){
    this.ingredients.push(this.newIngredient);
    this.submitIngredient.emit(this.ingredients);
    this.adding = false;
    console.log(this.ingredients[0])
  }
  addUnit(newUnit){
    this.units.push(newUnit);
    this.addingUnit = false;
  }
  
  NewUnit(){
    this.addingUnit = true;
  }

}
