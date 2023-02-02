import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { InternalService } from 'src/app/services/internal.service';

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

  constructor(private titleService: Title, private internalService: InternalService,
    public route: ActivatedRoute, private fb: FormBuilder,
    public router: Router) {
    this.titleService.setTitle("Browse - PED");
  }

  get searchParams() {
    return this.searchForm.get("params") as FormArray;
  }

  ngOnInit(): void {

    // // Init entry search subscription
    this.searchParams.valueChanges.subscribe(formData => {
      console.log(formData)
      let filter = {};
      formData.forEach(currItem => {
        if (currItem.key) {
          if (!filter.hasOwnProperty(currItem.area)) {
            filter[currItem.area] = [];
          }
          filter[currItem.area].push(currItem.key);
        }
      });
      this.curPageNum = 1;
      this.getEntries((this.curPageNum - 1) * this.itemsPerPage, filter);
      this.updateQueryParams(filter);
    })

    // Parse query params
    if (Object.keys(this.route.snapshot.queryParams).length > 0) {
      const valid_areas = ["free_text","term","cross_ref","entry_id","uniprot_acc","protein_name","publication_identifier","publication_html","data_owner"];
      Object.keys(this.route.snapshot.queryParams).forEach(param => {
        if (valid_areas.includes(param)) {
          this.searchParams.push(this.fb.group({
            "area": param,
            "key": this.route.snapshot.queryParams[param]
          }), { emitEvent: false })
        }
        if(param === "limit") this.itemsPerPage = parseInt(this.route.snapshot.queryParams[param]);
        if(param === "page") this.curPageNum = parseInt(this.route.snapshot.queryParams[param]);
      })
    }

    // Make update
    if (this.searchParams.length > 0) {
      this.searchParams.updateValueAndValidity({ onlySelf: false, emitEvent: true }) // Force update
    }else{
      this.addSearchField("free_text");
    }
  }

  updateQueryParams(filter_params) {
    filter_params = {
      ...filter_params,
      limit: this.itemsPerPage,
      page: this.curPageNum,
    }

    console.log(filter_params)

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: filter_params
      });
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

  pageChanged(event: PageChangedEvent): void {
    // this.curPageNum = event.page;
    let filter = {};
    this.searchParams.value.forEach(currItem => {
      if (currItem.key) {
        if (!filter.hasOwnProperty(currItem.area)) {
          filter[currItem.area] = [];
        }
        filter[currItem.area].push(currItem.key);
      }
    });
    this.getEntries((event.page - 1) * this.itemsPerPage, filter)
    this.updateQueryParams(filter);
  }

  changeLimit(new_limit){
    this.curPageNum = 1;
    this.itemsPerPage = new_limit;
    let filter = {};
    this.searchParams.value.forEach(currItem => {
      if (currItem.key) {
        if (!filter.hasOwnProperty(currItem.area)) {
          filter[currItem.area] = [];
        }
        filter[currItem.area].push(currItem.key);
      }
    });
    this.getEntries((this.curPageNum - 1) * this.itemsPerPage, filter)
    this.updateQueryParams(filter);
  }

  getEntries(offset, params = {}) {
    this.internalService.searchEntries({
      offset: offset,
      limit: this.itemsPerPage,
      sort_field: "entry_id",
      ...params
    }).subscribe(responseData => {
      console.log(responseData)
      this.itemsCount = responseData["count"]
      this.resultData = responseData["result"]
    });
  }

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
