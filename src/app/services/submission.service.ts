import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { InternalService } from './internal.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {

    public form;
    public method_ontology;
    public formData: FormData;
    public progress = 0;
    public ensembleCount = 0;
    public options = {
        linked_draft_id: null,
        parent_job_id: null
    }

    constructor(private fb: FormBuilder,
        private internalService: InternalService,
        private router: Router) {
        this.initForm();
    }

    public initForm(): FormGroup {
        this.form = this.fb.group({
            "title": null,
            "publication_status": null,
            "publication_identifier": null,
            "publication_source": null,
            "publication_html": null,
            "authors": this.fb.array([]),
            "experimental_procedure": null,
            "term_experimental_procedure": [[]],
            "structural_ensembles_calculation": null,
            "term_structural_ensembles_calculation": [[]],
            "md_calculation": null,
            "term_md_calculation": [[]],
            "expression_organism": null,
            "expression_organism_name": null,
            "entry_cross_reference": this.fb.array([]),
            "experimental_cross_reference": this.fb.array([]),

            "ensembles": this.fb.array([]),
            "constructs": this.fb.array([])
        })
        this.formData = new FormData();
        this.progress = 0;
        this.ensembleCount = 0;
        return this.form;
    }

    public addFormArrayElement(field, emitEvent: boolean = false): void {
        const rows = this.form.get(field) as FormArray;
        if (field === 'constructs') {
            rows.push(this.fb.group({
                description: null,
                chain_name: null,
                is_fixed: false,
                is_disordered: false,
                fragments: this.fb.array([]),
            }, {
                emitEvent: emitEvent
            }));
        } else if (field === 'ensembles') {
            this.ensembleCount += 1;
            const currEnsembleID = /*this.entry_id +*/ 'e' + ('000' + this.ensembleCount.toString()).substr(-3);;
            rows.push(this.fb.group({
                ensemble_id: currEnsembleID,
                description: null,
                conformations_filesize: 0,
                weights_filesize: 0,
                conformations_file_strategy: "direct",
                conformations_file_name: null,
                conformations_file_loc: null,
                weights_file_strategy: "direct",
                weights_file_name: null,
                weights_file_loc: null
            }, {
                emitEvent: emitEvent
            }));
        } else if (field === 'authors') {
            rows.push(this.fb.group({
                "name": null,
                "orcid_id": null,
                "role": null,
                "email": null,
                "corresponding_author": false
            }, { emitEvent: emitEvent }))
        } else if (field === 'entry_cross_reference' || field === 'experimental_cross_reference') {
            rows.push(this.fb.group({
                "db": null,
                "id": null
            }, { emitEvent: emitEvent }))
        }
    }

    public removeFormArrayElement(field, index, emitEvent: boolean = false): void {
        const rows = this.form.get(field) as FormArray;
        rows.removeAt(index, {
            emitEvent: emitEvent
        });
    }

    public addFormArrayElement_nested(field, index, nestedField, emitEvent: boolean = false): void {
        const rows = this.form.get(field)['controls'][index].get(nestedField) as FormArray;
        if (field === 'constructs' && nestedField === 'fragments') {
            rows.push(this.fb.group({
                description: null,
                part_of_ensemble: true,
                sequence: null,
                uniprot_acc: null,
                uniprot_start_position: null,
                uniprot_end_position: null,
                definition_type: "Uniprot ACC" // Or "Sequence"
            }), { emitEvent: emitEvent });
        }
    }

    public removeFormArrayElement_nested(field, index, nestedField, nestedIndex, emitEvent: boolean = false): void {
        const rows = this.form.get(field)['controls'][index].get(nestedField) as FormArray;
        rows.removeAt(nestedIndex, {
            emitEvent: emitEvent
        });
    }

    private parseConstructs(rawConstructs: Array<object>): void {
        let constructs = this.form.get('constructs') as FormArray;
        if (Array.isArray(rawConstructs)) {
            rawConstructs.forEach(constructData => {
                // Add default element
                this.addFormArrayElement('constructs', false);

                // Get last added element
                let curConstructIdx: number = constructs.length - 1;
                let curConstruct: AbstractControl = constructs.controls[curConstructIdx];

                // Modify if is ok
                if (typeof constructData["description"] === 'string') curConstruct.get("description").setValue(constructData["description"]);
                if (typeof constructData["chain_name"] === 'string') curConstruct.get("chain_name").setValue(constructData["chain_name"]);
                if (typeof constructData["is_fixed"] === 'boolean') curConstruct.get("is_fixed").setValue(constructData["is_fixed"]);
                if (typeof constructData["is_disordered"] === 'boolean') curConstruct.get("is_disordered").setValue(constructData["is_disordered"]);

                // Check fragments
                let fragments = curConstruct.get('fragments') as FormArray;
                if (Array.isArray(constructData["fragments"])) {
                    constructData["fragments"].forEach(fragmentData => {
                        // Add default elemente
                        this.addFormArrayElement_nested('constructs', curConstructIdx, 'fragments');

                        // Get last element
                        let curFragIdx = fragments.length - 1;
                        let curFrag = fragments.controls[curFragIdx];

                        // Modify if is ok
                        if (typeof fragmentData["description"] === 'string') curFrag.get("description").setValue(fragmentData["description"]);
                        if (typeof fragmentData["part_of_ensemble"] === 'boolean') curFrag.get("part_of_ensemble").setValue(fragmentData["part_of_ensemble"]);

                        // Check definition type
                        if (typeof fragmentData["uniprot_acc"] === 'string' && fragmentData["uniprot_acc"].length > 0) {
                            curFrag.get("definition_type").setValue("Uniprot ACC");

                            curFrag.get("uniprot_acc").setValue(fragmentData["uniprot_acc"]);
                            curFrag.get("uniprot_start_position").setValue(fragmentData["uniprot_start_position"]);
                            curFrag.get("uniprot_end_position").setValue(fragmentData["uniprot_end_position"]);
                        } else {
                            curFrag.get("definition_type").setValue("Sequence");

                            curFrag.get("sequence").setValue(fragmentData["sequence"]);
                        }
                    })
                }
            });
        }
    }

    private parseEnsembles(rawEnsembles: Array<object>):void{
        let ensembles = this.form.get('ensembles') as FormArray;
        if(Array.isArray(rawEnsembles)){
            rawEnsembles.forEach( ensembleData => {
                const currEnsembleCount = parseInt(ensembleData["ensemble_id"].substr(-3));
                if (currEnsembleCount > this.ensembleCount) {
                    this.ensembleCount = currEnsembleCount;
                }
                ensembles.push(this.fb.group({
                    ensemble_id: ensembleData["ensemble_id"] || null,
                    description: ensembleData["description"] || null,
                    conformations_filesize: ensembleData["conformations_filesize"] || 0,
                    weights_filesize: ensembleData["weights_filesize"] || 0,
                    conformations_file_strategy: ensembleData["conformations_file_strategy"] || "direct",
                    conformations_file_name: ensembleData["conformations_file_name"] || null,
                    conformations_file_loc: ensembleData["conformations_file_loc"] || null,
                    weights_file_strategy: ensembleData["weights_file_strategy"] || "direct",
                    weights_file_name: ensembleData["weights_file_name"] || null,
                    weights_file_loc: ensembleData["weights_file_loc"] || null
                }), {emitEvent: false});
            });
        }
    }

    public parseForm(rawMetadata: object): void {
        this.initForm();

        // Parse description
        let curForm = this.form as FormGroup;
        curForm.get("title").setValue(rawMetadata["title"]);
        curForm.get("publication_status").setValue(rawMetadata["publication_status"]);
        curForm.get("publication_source").setValue(rawMetadata["publication_source"]);
        curForm.get("publication_identifier").setValue(rawMetadata["publication_identifier"]);
        curForm.get("publication_html").setValue(rawMetadata["publication_html"]);

        curForm.get("expression_organism").setValue(rawMetadata["expression_organism"]);
        curForm.get("expression_organism_name").setValue(rawMetadata["expression_organism_name"]);

        curForm.get("experimental_procedure").setValue(rawMetadata["experimental_procedure"]);
        curForm.get("structural_ensembles_calculation").setValue(rawMetadata["structural_ensembles_calculation"]);
        curForm.get("md_calculation").setValue(rawMetadata["md_calculation"]);
        this.findTerms();

        if(Array.isArray(rawMetadata["authors"])){
            let authors = curForm.get("authors") as FormArray
            rawMetadata["authors"].forEach( authorData => {
                // Add default element
                this.addFormArrayElement('authors');

                let curAuthorIdx: number = authors.length - 1;
                let curAuthor: AbstractControl = authors.controls[curAuthorIdx];

                curAuthor.get("name").setValue(authorData["name"])
                curAuthor.get("orcid_id").setValue(authorData["orcid_id"])
                curAuthor.get("role").setValue(authorData["role"])
                curAuthor.get("email").setValue(authorData["email"])
                curAuthor.get("corresponding_author").setValue(authorData["corresponding_author"])
            })
        }

        if(Array.isArray(rawMetadata["entry_cross_reference"])){
            let entryXRefs = curForm.get("entry_cross_reference") as FormArray
            rawMetadata["entry_cross_reference"].forEach( xRefData => {
                // Add default element
                this.addFormArrayElement('entry_cross_reference');

                let curXRefIdx: number = entryXRefs.length - 1;
                let curXref: AbstractControl = entryXRefs.controls[curXRefIdx];

                curXref.get("db").setValue(xRefData["db"])
                curXref.get("id").setValue(xRefData["id"])
            })
        }

        if(Array.isArray(rawMetadata["experimental_cross_reference"])){
            let experXRefs = curForm.get("experimental_cross_reference") as FormArray
            rawMetadata["experimental_cross_reference"].forEach( xRefData => {
                // Add default element
                this.addFormArrayElement('experimental_cross_reference');

                let curXRefIdx: number = experXRefs.length - 1;
                let curXref: AbstractControl = experXRefs.controls[curXRefIdx];

                curXref.get("db").setValue(xRefData["db"])
                curXref.get("id").setValue(xRefData["id"])
            })
        }
        
        // Parse constructs
        this.parseConstructs(rawMetadata["constructs"]);

        // Parse ensembles
        this.parseEnsembles(rawMetadata["ensembles"]);
    }


    public submission(): void {
        let blob = new Blob([JSON.stringify(this.form.value)], { type: 'text/plain' });
        this.formData.append('metadata', blob, 'metadata.json');

        let  optionsBlob = new Blob([JSON.stringify(this.options)], { type: 'text/plain' });
        this.formData.append('options', optionsBlob, 'options.json' )
        
        this.internalService.sendTask(this.formData).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
                case HttpEventType.Sent:
                    console.log('Request has been made!');
                    break;
                case HttpEventType.ResponseHeader:
                    console.log('Response header has been received!');
                    break;
                case HttpEventType.UploadProgress:
                    this.progress = Math.round(event.loaded / event.total * 100);
                    console.log(`Uploaded! ${this.progress}%`);
                    break;
                case HttpEventType.Response:
                    console.log('User successfully created!', event.body);
                    setTimeout(() => {
                        let url = '';
                        if (event.body.job_id) {
                            url = 'job/' + event.body.job_id;
                        }
                        this.initForm();
                        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                            this.router.navigate([url]);
                        });
                    }, 500);
            }
        });
    }

    public getInputMetadata(): string {
        return JSON.stringify(this.form.value)
    }

    public async findTerms() {
        const _testCorpus = (reg: RegExp): boolean => {
            return reg.test(this.form.get('experimental_procedure').value) || reg.test(this.form.get('structural_ensembles_calculation').value) || reg.test(this.form.get('md_calculation').value);
        }

        // Wait for ontology
        if (!this.method_ontology) {
            this.method_ontology = await this.internalService.getOntology().toPromise();
        }

        let terms = {
            'term_experimental_procedure': [],
            'term_structural_ensembles_calculation': [],
            'term_md_calculation': []
        }
        this.method_ontology.forEach(curr_term => {
            let regex = '(^|-|,|\\s|\\()' + curr_term['name'].toLowerCase() + '(\\)|\\s|-|\\.|,|$|\\d$)';
            let reg = new RegExp(regex, 'i');
            if (curr_term['name'] === 'ENSEMBLE') {
                regex = '(^|-|,|\\s|\\()' + curr_term['name'] + '(\\)|\\s|-|\\.|,|$|\\d$)';
                reg = new RegExp(regex);
            }
            let term_is_found = _testCorpus(reg);
            if (curr_term.hasOwnProperty('alias')) {
                curr_term['alias'].forEach(curr_alias => {
                    regex = '(^|-|,|\\s|\\()' + curr_alias.toLowerCase() + '(\\)|\\s|-|\\.|,|$|\\d$)';
                    reg = new RegExp(regex, 'i');
                    term_is_found = term_is_found || _testCorpus(reg);
                });
            }
            if (term_is_found) {
                if (curr_term['namespace'] === 'Measurement method') {
                    terms["term_experimental_procedure"].push(curr_term)
                } else if (curr_term['namespace'] === 'Ensemble generation method') {
                    terms["term_structural_ensembles_calculation"].push(curr_term)
                } else if (curr_term['namespace'] === 'Molecular dynamics') {
                    terms["term_md_calculation"].push(curr_term)
                }
            }
        })
        this.form.get('term_experimental_procedure').setValue(terms["term_experimental_procedure"]);
        this.form.get('term_structural_ensembles_calculation').setValue(terms["term_structural_ensembles_calculation"]);
        this.form.get('term_md_calculation').setValue(terms["term_md_calculation"]);

    }

}
