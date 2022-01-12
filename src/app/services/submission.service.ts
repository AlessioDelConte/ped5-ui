import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormArray} from '@angular/forms';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {InternalService} from './internal.service';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SubmissionService {

    entry_id = ''
    progress = 0;
    form: FormGroup;
    formData = new FormData();
    ensembleCount = 0;

    constructor(private fb: FormBuilder,
                private internalService: InternalService,
                private router: Router) {
    }

    FormParser(entrtyData: object): void {
        this.form = this.fb.group({
            submission_id: entrtyData['submission_id'] ? entrtyData['submission_id'] : null,
            entry_id: entrtyData['entry_id'] ? entrtyData['entry_id'] : null,
            construct: this.fb.array([]),
            ensembles: this.fb.array([]),
            captcha: new FormControl()
        });
        this.entry_id =  entrtyData['entry_id'] || '';


        console.log('entrtyData', entrtyData);

        if (Array.isArray(entrtyData['construct'])) {
            const rows = this.form.get('construct') as FormArray;
            entrtyData['construct'].forEach(currChain => {
                const currChainObj = {
                    chain_name: typeof currChain.chain_name === 'string' ? currChain.chain_name : null,
                    description: typeof currChain.description === 'string' ? currChain.description : null,
                    is_fixed: null,
                    is_disordered: null,
                    fragments: this.fb.array([])
                };

                const arrayOfFragments = this.fb.array([]);

                if (Array.isArray(currChain.fragments) && currChain.fragments.length > 0) {
                    currChain.fragments.forEach(currFragment => {
                        arrayOfFragments.push(
                            this.fb.group({
                                description: typeof currFragment.description === 'string' ? currFragment.description : null,
                                uniprot_acc: typeof currFragment.uniprot_acc === 'string' ? currFragment.uniprot_acc : null,
                                uniprot_start_position: typeof currFragment.uniprot_start_position === 'number' ? currFragment.uniprot_start_position : null,
                                uniprot_end_position: typeof currFragment.uniprot_end_position === 'number' ? currFragment.uniprot_end_position : null,
                                sequence: typeof currFragment.sequence === 'string' ? currFragment.sequence : null,
                                part_of_ensemble: null
                            })
                        );
                    });
                }
                if (arrayOfFragments.length === 0) {
                    arrayOfFragments.push(
                        this.fb.group({
                            description: null,
                            uniprot_acc: null,
                            uniprot_start_position: null,
                            uniprot_end_position: null,
                            sequence: null
                        })
                    );
                }
                currChainObj['fragments'] = arrayOfFragments;
                rows.push(this.fb.group(currChainObj));
            });
        } else {
            this.addFormArrayElement('construct', false);
        }

        if (Array.isArray(entrtyData['ensembles'])) {
            const rows = this.form.get('ensembles') as FormArray;
            entrtyData['ensembles'].forEach(currEnsemble => {
                const currEnsembleCount = parseInt(currEnsemble.ensemble_id.substr(-3));
                if (currEnsembleCount > this.ensembleCount) {
                    this.ensembleCount = currEnsembleCount;
                }
                const currEnsembleObj = {
                    ensemble_id: currEnsemble.ensemble_id || '',
                    description: currEnsemble.description || '',
                    conformations_filesize: currEnsemble.conformations_filesize || 0,
                    weights_filesize: currEnsemble.weights_filesize || 0,
                    conformations_path: '',
                    weights_path: '',
                    status: currEnsemble.status || '',
                };

                rows.push(this.fb.group(currEnsembleObj));
            });
        } else {

            this.addFormArrayElement('ensembles', false);
        }
    }

    addFormArrayElement(field, emitEvent: boolean): void {
        const rows = this.form.get(field) as FormArray;
        if (field === 'construct') {
            rows.push(this.fb.group({
                description: '',
                chain_name: '',
                is_fixed: false,
                id_disordered: false,
                construct: this.fb.array([
                    this.fb.group({
                        sequence: '',
                        description: '',
                        uniprot_acc: '',
                        organism_name: '',
                        organism_taxon: '',
                        uniprot_start_position: '',
                        uniprot_end_position: '',
                        part_of_ensemble: true,
                    })
                ]),
            }, {
                emitEvent: emitEvent
            }));
        } else if (field === 'ensembles') {
            this.ensembleCount += 1;
            const currEnsembleID = this.entry_id + 'e' + ('000' + this.ensembleCount.toString()).substr(-3);;
            rows.push(this.fb.group({
                ensemble_id: currEnsembleID,
                description: '',
                conformations_path: '',
                weights_path: '',
                status: 'new_ensemble',
                conformations_filesize: 0,
                weights_filesize: 0,
            }, {
                emitEvent: emitEvent
            }));
        }
    }

    removeFormArrayElement(field, index, emitEvent: boolean): void {
        const rows = this.form.get(field) as FormArray;
        rows.removeAt(index, {
            emitEvent: emitEvent
        });
        if (rows.length === 0) {
            this.addFormArrayElement(field, false);
        }
    }

    addFormArrayElement_nested(field, index, nestedField, emitEvent: boolean): void {
        const rows = this.form.get(field)['controls'][index].get(nestedField) as FormArray;
        if (nestedField === 'mutations') {
            rows.push(this.fb.group({
                wildtype_residue: null,
                position: null,
                mutated_residue: null,
            }), {
                emitEvent: emitEvent
            });
        } else if (nestedField === 'ptms') {
            rows.push(this.fb.group({
                unmodified_residue_code: null,
                position: null,
                modified_residue_code: null,
            }), {
                emitEvent: emitEvent
            });
        } else if (nestedField === 'nonensemble_regions') {
            rows.push(this.fb.group({
                start_position: null,
                end_position: null,
                note: null,
            }));
        } else if (nestedField === 'construct') {
            rows.push(this.fb.group({
                sequence: null,
                description: null,
                uniprot_acc: null,
                uniprot_start_position: null,
                uniprot_end_position: null,
                disprot_region: true,
                part_of_ensemble: true,
            }), {
                emitEvent: emitEvent
            });
        }
    }

    removeFormArrayElement_nested(field, index, nestedField, nestedIndex, emitEvent: boolean): void {
        const rows = this.form.get(field)['controls'][index].get(nestedField) as FormArray;
        rows.removeAt(nestedIndex, {
            emitEvent: emitEvent
        });
        if (rows.length === 0) {
            this.addFormArrayElement_nested(field, index, nestedField, false);
        }
    }

    submission(): void {
        this.formData.append('form', JSON.stringify(this.form.value));
        this.internalService.postSubmission(this.formData).subscribe((event: HttpEvent<any>) => {
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
                        if (event.body.submission_id) {
                            url = 'results/' + event.body.submission_id;
                        }
                        this.reset();
                        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                            this.router.navigate([url]);
                        });
                    }, 500);
            }
        });
    }

    reset(): void {
        this.form = null;
        this.formData = new FormData();
        this.progress = 0;
        this.ensembleCount = 0;
    }


}
