import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormArray} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  form: FormGroup;

  formData = new FormData();

  ensembleCount = 0;

  constructor(private fb: FormBuilder) { }

  FormParser(entrtyData: object): void {
    this.form = this.fb.group({
      protein_chains: this.fb.array([]),
      ensembles: this.fb.array([]),
      captcha: new FormControl()

    });

    if (Array.isArray(entrtyData['protein_chains'])) {
      const rows = this.form.get('protein_chains') as FormArray;
      entrtyData['protein_chains'].forEach(currChain => {
      });
    } else {
      this.addFormArrayElement('protein_chains', false);
    }
    // if (Array.isArray(entrtyData['ensembles'])) {
    //   const rows = this.form.get('ensembles') as FormArray;
    //   entrtyData['ensembles'].forEach(currChain => {
    //   });
    // } else {
      this.addFormArrayElement('ensembles', false);
    // }


  }

  addFormArrayElement(field, emitEvent: boolean): void {
    const rows = this.form.get(field) as FormArray;
    if (field === 'protein_chains') {
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
      rows.push(this.fb.group({
        ensemble_id: this.ensembleCount.toString(),
        description: '',
        conformations_path: '',
        weights_path: '',
        status: 'new_ensemble',
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

}
