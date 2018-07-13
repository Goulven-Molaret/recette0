import { Component, OnInit } from '@angular/core';
import { Receipe } from '../receipe';
import { Ingredient } from '../ingredient';
import { RecetteService } from '../recette.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  countries = ["France", "Chine", "Brésil", "Italy", "Japon"]
  types = ["Quotidien", "Exotique"];
  difficulties = ["Facile", "Moyen", "Compliqué", "Extrêmement compliqué"];
  ingredient0: Ingredient = {
    id: 0,
    name: "ingredient0",
    quantity: 0,
    unit : "unit"
  };



  difficulty: String;
  nextID: number;
  updating = false;
  //description: String;
  recette0: Receipe = {
    id: 0,
    name: "porc au caramel",
    difficulty: "facile",
    country: "Chine",
    type: "quotidien",
    ingredients: [this.ingredient0],
    description: ""

  };
  newReceipe: Receipe = {
    id: 0,
    name: "",
    difficulty:"none",
    country:"none",
    type: "none",
    ingredients: [],
    description: ""
  };
  urlId: String;
  recettes: Receipe[]=[this.recette0];

  
  constructor(private receipeService: RecetteService, 
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.nextID=1;
    this.urlId = this.route.snapshot.paramMap.get('id');
    if(this.urlId == null){
      this.updating = false;
    }
    else{
      this.updating = true;
      this.getReceipe(this.urlId);
    }
  }

  getReceipe(id: String){
    this.receipeService.getReceipe(id).subscribe(receipe => this.newReceipe = receipe);
    console.log(this.newReceipe.name)
  }
  update(){
    //Update the current receipe
    this.receipeService.updateReceipe(this.urlId, this.newReceipe).subscribe(() => console.log("receipe updated !"));
    console.log("updated");
  }

  valid(){
    this.newReceipe.id = this.nextID;
    console.log(this.newReceipe.id+"Nouvelle recette : "+this.newReceipe.name+", Pays : "+this.newReceipe.country);
    console.log(this.newReceipe.description);
    console.log(this.newReceipe.difficulty);
    console.log("ingrédient : "+this.newReceipe.ingredients);
    this.receipeService.addReceipe(this.newReceipe).subscribe(() => console.log("receipe added !"));
    this.nextID++;
  }

}
