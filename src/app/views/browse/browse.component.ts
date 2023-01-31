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
    this.addSearchField("free_text");

    // Init entry search result
    this.getEntries(0);

    // this.updateQueryParams();
    this.searchParams.valueChanges.subscribe(formData => {
      let search_params = {};
      formData.forEach(currItem => {
        if (currItem.key) {
          if (!search_params.hasOwnProperty(currItem.area)) {
            search_params[currItem.area] = [];
          }
          search_params[currItem.area].push(currItem.key);
        }
      });
      this.getEntries(0, search_params);
    })
  }

  updateQueryParams() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          limit: this.itemsPerPage,
          page: this.curPageNum
        }
      });
  }

  addSearchField(area, key = null) {
    this.searchParams.push(this.fb.group({
      area: area,
      key: key ? key: null
    }));
  }

  removeSearchField(index) {
    this.searchParams.removeAt(index);
    if (this.searchParams.length === 0) {
      this.addSearchField('free_text');
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.curPageNum = event.page;
    this.getEntries((this.curPageNum - 1) * this.itemsPerPage)
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
