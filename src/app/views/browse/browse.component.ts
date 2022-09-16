import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  public resultData = [
    {
      "entry_id": "PED00001",
      "description": {
        "title": "Structural ensemble of pSic1 (1-90) with phosphorylations at Thr5, Thr33, Thr45, Ser69, Ser76, Ser80",
        "ontology_terms": [{ "name": "NMR", "namespace": "Measurement method"}]
      },
      "construct_chains": [{ "chain_name": "A", "fragments": [{ "description": "tag", "source_sequence": "GS", "start_position": 1, "end_position": 2 }, { "description": "Protein SIC1", "source_sequence": "MTPSTPPRSRGTRYLAQPSGNTSSSALMQGQKTPQKPSQNLVPVTPSTTKSFKNAPLLAPPNSNMGMTSPFNGLTSPQRSPFPKSSVKRTLFQFESHDNGTVREEQEPLGRVNRILFPTQQNVDIDAAEEEEEGEVLLPPSRPTSARQLHLSLERDEFDQTHRKKIIKDVPGTPSDKVITFELAKNWNNNSPKNDARSQESEDEEDIIINPVRVGKNPFASDELVTQEIRNERKRAMLRENPDIEDVITYVNKKGEVVEKRRLTDEEKRRFKPKALFQSRDQEH", "start_position": 1, "end_position": 90, "uniprot_acc": "P38634" }], "alignment": { "pdb_sequence": "GSMTPSTPPRSRGTRYLAQPSGNTSSSALMQGQKTPQKPSQNLVPVTPSTTKSFKNAPLLAPPNSNMGMTSPFNGLTSPQRSPFPKSSVKRT", "fragments_sequence": "GSMTPSTPPRSRGTRYLAQPSGNTSSSALMQGQKTPQKPSQNLVPVTPSTTKSFKNAPLLAPPNSNMGMTSPFNGLTSPQRSPFPKSSVKRT" }, "fragments_stats": [{ "sequence": "GS", "uniprot": null, "length_total_uniprot": 2, "length_total_pdb": 92, "length_frag_total_uniprot": 2, "start_position_alig": 0, "end_position_alig": 1, "start_position_pdb": -1, "end_position_pdb": 0, "length_frag_total_pdb": 2, "length_frag_nogaps_alig": 2, "cov_total_frag_pdb": 0.021739130434782608, "cov_nogaps_frag_pdb": 0.021739130434782608, "cov_total_frag_unip": 1, "cov_nogaps_frag_unip": 1 }, { "sequence": "MTPSTPPRSRGTRYLAQPSGNTSSSALMQGQKTPQKPSQNLVPVTPSTTKSFKNAPLLAPPNSNMGMTSPFNGLTSPQRSPFPKSSVKRT", "uniprot": "P38634", "length_total_uniprot": 284, "length_total_pdb": 92, "length_frag_total_uniprot": 90, "start_position_alig": 2, "end_position_alig": 91, "start_position_pdb": 1, "end_position_pdb": 90, "length_frag_total_pdb": 90, "length_frag_nogaps_alig": 90, "cov_total_frag_pdb": 0.9782608695652174, "cov_nogaps_frag_pdb": 0.9782608695652174, "cov_total_frag_unip": 0.31690140845070425, "cov_nogaps_frag_unip": 0.31690140845070425 }], "missings": [], "mutations": [], "modifications": [{ "chain": "A", "fragment": 2, "start_position_unip": 5, "uniprot": "P38634", "start_position_alig": 6, "start_position_pdb": 5, "aa": "T", "modification_code": "TPO" }, { "chain": "A", "fragment": 2, "start_position_unip": 33, "uniprot": "P38634", "start_position_alig": 34, "start_position_pdb": 33, "aa": "T", "modification_code": "TPO" }, { "chain": "A", "fragment": 2, "start_position_unip": 45, "uniprot": "P38634", "start_position_alig": 46, "start_position_pdb": 45, "aa": "T", "modification_code": "TPO" }, { "chain": "A", "fragment": 2, "start_position_unip": 69, "uniprot": "P38634", "start_position_alig": 70, "start_position_pdb": 69, "aa": "S", "modification_code": "SEP" }, { "chain": "A", "fragment": 2, "start_position_unip": 76, "uniprot": "P38634", "start_position_alig": 77, "start_position_pdb": 76, "aa": "S", "modification_code": "SEP" }, { "chain": "A", "fragment": 2, "start_position_unip": 80, "uniprot": "P38634", "start_position_alig": 81, "start_position_pdb": 80, "aa": "S", "modification_code": "SEP" }] }], 
      "ensembles": [{ "ensemble_id": "e001", "models": 11, "chains": [{ "chain_name": "A", "rg_mean": 26.7439005864, "entropy_dssp_mean": 0.4023964281, "relative_asa_mean": 0.6879983572 }] }, { "ensemble_id": "e002", "models": 10, "chains": [{ "chain_name": "A", "rg_mean": 26.714687005, "entropy_dssp_mean": 0.3969717634, "relative_asa_mean": 0.7016040011 }] }, { "ensemble_id": "e003", "models": 11, "chains": [{ "chain_name": "A", "rg_mean": 28.1516697297, "entropy_dssp_mean": 0.4419606019, "relative_asa_mean": 0.7005979796 }] }],
      "version": "v1"
    }
  ];
  dummy = 'PED00001'

  constructor(private titleService: Title, private internalService: InternalService,
    public route: ActivatedRoute,
    public router: Router) {
    this.titleService.setTitle("PED - Browse");
  }

  ngOnInit(): void {
    this.internalService.searchEntries({}).subscribe(data => {
      this.resultData = data;
    })
  }

}
