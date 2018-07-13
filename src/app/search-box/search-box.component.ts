import { Component, OnInit } from '@angular/core';
import { RecetteService } from '../recette.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  searchTerms: string;

  constructor(private receipeService: RecetteService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  submit(){
      this.router.navigate([`/search/${this.searchTerms}`], {relativeTo: this.route}) ;
      this.receipeService.searchReceipe(this.searchTerms).subscribe(() => console.log("searching : "+this.searchTerms))
  }

}
