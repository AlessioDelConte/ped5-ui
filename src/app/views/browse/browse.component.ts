import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Block } from 'notiflix';
import { InternalService } from 'src/app/services/internal.service';

const VALID_SEARCH_AREAS = ["free_text", "term", "cross_ref", "entry_id", "uniprot_acc", "protein_name", "publication_identifier", "publication_html", "data_owner"];

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  public searchForm: FormGroup = new FormGroup({
    params: new FormArray([])
  });

  public resultData = [];
  public itemsCount = 0;
  public itemsPerPage = 20;
  public curPageNum = 1;
  private sortField = "entry_id";
  private sortOrder = "asc";

  constructor(private titleService: Title, private internalService: InternalService,
    public route: ActivatedRoute, private fb: FormBuilder,
    public router: Router) {
    this.titleService.setTitle("Browse - PED");
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(new_params => {
      console.log("new_params")
      console.log(new_params)
      this.parseParamsToForm(new_params);

      let filter = this.parseFormToFilter()
      this.searchEntries(this.curPageNum, this.itemsPerPage, this.sortField, this.sortOrder, filter)


      if (this.searchParams.length <= 0) {
        this.addSearchField("free_text");
      }
    })
  }

  parseParamsToForm(query_params) {
    this.searchParams.clear()
    Object.keys(query_params).forEach(param => {
      if (VALID_SEARCH_AREAS.includes(param)) {
        if(Array.isArray(query_params[param])){
          query_params[param].forEach(value => {
            this.searchParams.push(this.fb.group({
              "area": param,
              "key": value
            }), { emitEvent: false })
          })
        }else{
          this.searchParams.push(this.fb.group({
            "area": param,
            "key": query_params[param]
          }), { emitEvent: false })
        }
      }
      if (param === "limit") this.itemsPerPage = parseInt(query_params[param]);
      if (param === "page") this.curPageNum = parseInt(query_params[param]);
    })
  }

  parseFormToFilter(): object {
    let filter = {};
    this.searchParams.value.forEach(currItem => {
      if (currItem.key) {
        if (!filter.hasOwnProperty(currItem.area)) {
          filter[currItem.area] = [];
        }
        filter[currItem.area].push(currItem.key);
      }
    });
    return filter;
  }

  pageChanged(event: PageChangedEvent | any): void {
    this.curPageNum = event.page;
    console.log("Page change event")
    this.changeQueryParams(this.curPageNum, this.itemsPerPage);
  }

  changeLimit(new_limit) {
    this.changeQueryParams(1, new_limit);
  }


  doSearch() {
    this.changeQueryParams(1, this.itemsPerPage);
  }

  changeQueryParams(page, limit){
    let filter = this.parseFormToFilter();
    let filter_params = {
      ...filter,
      limit: limit,
      page: page,
    }

    this.router.navigate([],
      {
        relativeTo: this.route,
        queryParams: filter_params
      });
  }

  searchEntries(page = 0, limit = 20, sort_field = "entry_id", sort_order = "asc", params = {}) {
    Block.standard("#browser")
    this.internalService.searchEntries({
      offset: (page - 1) * limit,
      limit: limit,
      sort_field: sort_field,
      sort_order: sort_order,
      ...params
    }).subscribe(responseData => {
      console.log(responseData)
      this.itemsCount = responseData["count"]
      this.resultData = responseData["result"]
      this.curPageNum = page
      Block.remove("#browser")
    });
  }


  // Search Form Functions

  get searchParams() {
    return this.searchForm.get("params") as FormArray;
  }

  addSearchField(area, key = null) {
    this.searchParams.push(this.fb.group({
      area: area,
      key: key ? key : null
    }));
  }

  removeSearchField(index) {
    this.searchParams.removeAt(index);
    if (this.searchParams.length === 0) {
      this.addSearchField('free_text');
    }
  }

  // Format functions

  getProteinACCs(consructChains) {
    let proteins = new Set();
    for (let i = 0; i < consructChains.length; i++) {
      const chain = consructChains[i];
      for (let j = 0; j < chain["fragments"].length; j++) {
        const fragment = chain["fragments"][j];
        if (fragment['uniprot_acc']) proteins.add(fragment['uniprot_acc']);
      }
    }
    return proteins;
  }

  getEnsNum(ensembles: Array<Object>): number {
    return ensembles.length
  }

  getEnsConformers(ensembles: Array<Object>): number {
    let count = 0;
    ensembles.forEach(ens => {
      count += ens['models'];
    })
    return count;
  }
}
