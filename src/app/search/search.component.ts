import { Component, OnInit } from '@angular/core';
import { Receipe } from '../receipe';
import { RecetteService } from '../recette.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerms: String;
  results = ["frites", "poulet"];
  recette0: Receipe = {
    id: 0,
    name: "porc au caramel",
    difficulty: "facile",
    country: "Chine",
    type: "quotidien",
    description: "cuisinez !",
    ingredients: []

  };
  receipes: Receipe[];


  constructor(private receipeService: RecetteService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchTerms = this.route.snapshot.paramMap.get('query');
    console.log(this.searchTerms);
    if(this.searchTerms == null){
      this.getAllReceipes();
    }
    else {
      this.getSearchedReceipes();
    }
    

  }

 

  ngDoCheck(){
    if(this.searchTerms !== this.route.snapshot.paramMap.get('query')){
      this.searchTerms = this.route.snapshot.paramMap.get('query');
      console.log(this.searchTerms);
      if(this.searchTerms == null){
        this.getAllReceipes();
      }
      else {
        this.getSearchedReceipes();
      }
    }
  }

  getSearchedReceipes(){
    this.receipeService.searchReceipe(this.searchTerms).subscribe(receipes => {this.receipes = receipes});
  }

  getAllReceipes(): void {
    this.receipeService.getReceipes().subscribe(receipes => {this.receipes =receipes
      console.log(this.receipes)}
    );
    console.log("Receipes retrieved");
    
  }

  update(receipeID :String ){
    console.log(receipeID);
  }

  delete(receipeID: String){
    this.receipeService.deleteReceipe(receipeID).subscribe(() => {console.log("deleting receipe : "+receipeID);
    this.getAllReceipes();
  });
    
  }

}
