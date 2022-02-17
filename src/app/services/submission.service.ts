import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { InternalService } from './internal.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {

    public form;
    public method_ontology;

    entry_id = '';
    progress = 0;
    // form: FormGroup;
    formData = new FormData();
    ensembleCount = 0;

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
        return this.form;
    }

    public getInputMetadata(): string {
        return JSON.stringify(this.form.value)
    }

    public async findTerms() {
        const _testCorpus = (reg: RegExp): boolean => {
            return reg.test(this.form.get('experimental_procedure').value) || reg.test(this.form.get('structural_ensembles_calculation').value) || reg.test(this.form.get('md_calculation').value);
        }

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

    FormParser(entrtyData: object): void {
        // this.form = this.fb.group({
        //     submission_id: entrtyData['submission_id'] ? entrtyData['submission_id'] : null,
        //     entry_id: entrtyData['entry_id'] ? entrtyData['entry_id'] : null,
        //     construct: this.fb.array([]),
        //     ensembles: this.fb.array([]),
        //     captcha: new FormControl()
        // });
        // this.entry_id =  entrtyData['entry_id'] || '';



        // if (Array.isArray(entrtyData['construct'])) {
        //     const rows = this.form.get('construct') as FormArray;
        //     entrtyData['construct'].forEach(currChain => {
        //         const currChainObj = {
        //             chain_name: typeof currChain.chain_name === 'string' ? currChain.chain_name : null,
        //             description: typeof currChain.description === 'string' ? currChain.description : null,
        //             is_fixed: null,
        //             is_disordered: null,
        //             fragments: this.fb.array([])
        //         };

        //         const arrayOfFragments = this.fb.array([]);

        //         if (Array.isArray(currChain.fragments) && currChain.fragments.length > 0) {
        //             currChain.fragments.forEach(currFragment => {
        //                 arrayOfFragments.push(
        //                     this.fb.group({
        //                         description: typeof currFragment.description === 'string' ? currFragment.description : null,
        //                         uniprot_acc: typeof currFragment.uniprot_acc === 'string' ? currFragment.uniprot_acc : null,
        //                         uniprot_start_position: typeof currFragment.uniprot_start_position === 'number' ? currFragment.uniprot_start_position : null,
        //                         uniprot_end_position: typeof currFragment.uniprot_end_position === 'number' ? currFragment.uniprot_end_position : null,
        //                         sequence: typeof currFragment.sequence === 'string' ? currFragment.sequence : null,
        //                         part_of_ensemble: null
        //                     })
        //                 );
        //             });
        //         }
        //         if (arrayOfFragments.length === 0) {
        //             arrayOfFragments.push(
        //                 this.fb.group({
        //                     description: null,
        //                     uniprot_acc: null,
        //                     uniprot_start_position: null,
        //                     uniprot_end_position: null,
        //                     sequence: null
        //                 })
        //             );
        //         }
        //         currChainObj['fragments'] = arrayOfFragments;
        //         rows.push(this.fb.group(currChainObj));
        //     });
        // } else {
        //     this.addFormArrayElement('construct', false);
        // }

        // if (Array.isArray(entrtyData['ensembles'])) {
        //     const rows = this.form.get('ensembles') as FormArray;
        //     entrtyData['ensembles'].forEach(currEnsemble => {
        //         const currEnsembleCount = parseInt(currEnsemble.ensemble_id.substr(-3));
        //         if (currEnsembleCount > this.ensembleCount) {
        //             this.ensembleCount = currEnsembleCount;
        //         }
        //         const currEnsembleObj = {
        //             ensemble_id: currEnsemble.ensemble_id || '',
        //             description: currEnsemble.description || '',
        //             conformations_filesize: currEnsemble.conformations_filesize || 0,
        //             weights_filesize: currEnsemble.weights_filesize || 0,
        //             conformations_path: '',
        //             weights_path: '',
        //             status: currEnsemble.status || '',
        //         };

        //         rows.push(this.fb.group(currEnsembleObj));
        //     });
        // } else {

        //     this.addFormArrayElement('ensembles', false);
        // }
    }

    public addFormArrayElement(field, emitEvent: boolean): void {
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
            const currEnsembleID = this.entry_id + 'e' + ('000' + this.ensembleCount.toString()).substr(-3);;
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

    public removeFormArrayElement(field, index, emitEvent: boolean): void {
        const rows = this.form.get(field) as FormArray;
        rows.removeAt(index, {
            emitEvent: emitEvent
        });
        // if (rows.length === 0) {
        //     this.addFormArrayElement(field, false);
        // }
    }

    public addFormArrayElement_nested(field, index, nestedField, emitEvent: boolean): void {
        const rows = this.form.get(field)['controls'][index].get(nestedField) as FormArray;
        if (field === 'constructs' && nestedField === 'fragments') {
            rows.push(this.fb.group({
                description: null,
                part_of_ensemble: true,
                sequence: null,
                uniprot_acc: null,
                uniprot_start_position: null,
                uniprot_end_position: null,
                definition_type: "Uniprot ACC"
            }), { emitEvent: emitEvent });
        }
    }

    public removeFormArrayElement_nested(field, index, nestedField, nestedIndex, emitEvent: boolean): void {
        const rows = this.form.get(field)['controls'][index].get(nestedField) as FormArray;
        rows.removeAt(nestedIndex, {
            emitEvent: emitEvent
        });
        // if (rows.length === 0) {
        //     this.addFormArrayElement_nested(field, index, nestedField, false);
        // }
    }

    // submission(): void {
    //     const blob = new Blob([JSON.stringify(this.form.value)], {type : 'text/plain'});
    //     this.formData.append('form', blob, 'form.txt');
    //     this.internalService.postSubmission(this.formData).subscribe((event: HttpEvent<any>) => {
    //         switch (event.type) {
    //             case HttpEventType.Sent:
    //                 console.log('Request has been made!');
    //                 break;
    //             case HttpEventType.ResponseHeader:
    //                 console.log('Response header has been received!');
    //                 break;
    //             case HttpEventType.UploadProgress:
    //                 this.progress = Math.round(event.loaded / event.total * 100);
    //                 console.log(`Uploaded! ${this.progress}%`);
    //                 break;
    //             case HttpEventType.Response:
    //                 console.log('User successfully created!', event.body);
    //                 setTimeout(() => {
    //                     let url = '';
    //                     if (event.body.submission_id) {
    //                         url = 'results/' + event.body.submission_id;
    //                     }
    //                     this.reset();
    //                     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //                         this.router.navigate([url]);
    //                     });
    //                 }, 500);
    //         }
    //     });
    // }
    submission(): void {
        const blob = new Blob([JSON.stringify(this.form.value)], { type: 'text/plain' });
        this.formData.append('task_name', 'ped');
        this.formData.append('metadata', blob, 'metadata.json');
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
                            url = 'results/' + event.body.job_id;
                        }
                        this.reset();
                        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                            this.router.navigate([url]);
                        });
                    }, 500);
            }
        });
    }

    reset(): void {
        // this.form = null;
        this.formData = new FormData();
        this.progress = 0;
        this.ensembleCount = 0;
    }


}
