import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Block } from 'notiflix';
import { InternalService } from 'src/app/services/internal.service';
import dataRecord from '../../../assets/bioschemas/dataRecord.json';

@Component({
  selector : 'app-entry-view',
  templateUrl : './entry-view.component.html',
  styleUrls : ['./entry-view.component.scss'],
})
export class EntryViewComponent implements OnInit {

  public entryID;
  public entryData;
  public downloadAllLink;

  constructor(private titleService: Title,
              private internalService: InternalService,
              private route: ActivatedRoute) {
    this.entryID = this.route.snapshot.paramMap.get('identifier');
    this.titleService.setTitle('Entry ' + this.entryID + ' - PED');
    this.downloadAllLink = this.internalService.ws + 'entries/' + this.entryID + '/download-ensembles/';
  }

  ngOnInit(): void {
    Block.standard('#result-view');
    this.internalService.getPublicEntry(this.entryID).subscribe(data => {
      this.entryData = data;
      this.createBioschemas(data);
      Block.remove('#result-view');
    }, this.internalService.basicErrorHandler);
  }


  private createBioschemas(entryObj: any): void {
    if (document.getElementById('dataRecord')) {
      document.getElementById('dataRecord').remove();
    }

    const listFragments = [];
    let listTerms = [];
    if (Array.isArray(entryObj.description.ontology_terms)) {
      listTerms = listTerms.concat(entryObj.description.ontology_terms.map(term => {
        return {
          '@type' : 'PropertyValue',
          name : 'Term',
          value : {
            '@type' : 'DefinedTerm',
            '@id' : 'https://disprot.org/IDPO/IDPO:' + term.id,
            inDefinedTermSet : {
              '@type' : 'DefinedTermSet',
              '@id' : 'https://disprot.org/assets/data/IDPO_v0.3.0.owl',
              name : 'IDP ontology',
            },
            termCode : 'IDPO:' + term.id,
            name : term.name,
          },
        };
      }));
    }
    if (Array.isArray(entryObj.construct_chains)) {
      entryObj.construct_chains.forEach(currChain => {
        if (Array.isArray(currChain.fragments)) {
          currChain.fragments.forEach((currFragment, indexCurrFragment) => {
            if (currFragment.uniprot_acc?.length > 0) {
              listFragments.push(
                {
                  '@type' : 'Protein',
                  '@id' : 'https://proteinensemble.org/' + entryObj.entry_id + '#' + currFragment.uniprot_acc + '-' + currChain.chain_name + '-' + indexCurrFragment,
                  'http://purl.org/dc/terms/conformsTo' : {
                    '@id' : 'https://bioschemas.org/profiles/Protein/0.11-RELEASE',
                    '@type' : 'CreativeWork',
                  },
                  identifier : 'https://identifiers.org/uniprot:' + currFragment.uniprot_acc,
                  sameAs : 'http://purl.uniprot.org/isoforms/' + (currFragment.uniprot_acc.includes('-') ?
                            currFragment.uniprot_acc : currFragment.uniprot_acc + '-1'),
                  name : currFragment.description,
                  hasBioPolymerSequence : currFragment.source_sequence,
                  hasSequenceAnnotation : [
                    {
                      '@type' : 'SequenceAnnotation',
                      '@id' : 'https://proteinensemble.org/' + entryObj.entry_id + '#' + currFragment.uniprot_acc + '-' +
                        currChain.chain_name + '-' + indexCurrFragment + '_sequence-annotation',
                      'http://purl.org/dc/terms/conformsTo' : {
                        '@id' : 'https://bioschemas.org/profiles/SequenceAnnotation/0.7-DRAFT',
                        '@type' : 'CreativeWork',
                      },
                      sequenceLocation : {
                        '@type' : 'SequenceRange',
                        '@id' : 'https://proteinensemble.org/' + entryObj.entry_id + '#' + currFragment.uniprot_acc + '-' +
                          currChain.chain_name + '-' + indexCurrFragment + '_sequence-location.' + currFragment.start_position +
                          '_' + currFragment.end_position,
                        'http://purl.org/dc/terms/conformsTo' : {
                          '@id' : 'https://bioschemas.org/profiles/SequenceRange/0.2-DRAFT',
                          '@type' : 'CreativeWork',
                        },
                        rangeStart : currFragment.start_position,
                        rangeEnd : currFragment.end_position,
                      },
                      additionalProperty : listTerms,
                    },
                  ],
                },
              );
            }
          });
        }
      });
    }

    dataRecord['@id'] = 'https://proteinensemble.org/' + entryObj.entry_id;
    dataRecord.identifier = 'https://identifiers.org/ped:' + entryObj.entry_id;
    dataRecord.name = entryObj.description.title;
    if (entryObj.description.publication_source === 'pubmed') {
      dataRecord.citation['@id'] = 'https://identifiers.org/pubmed:' + entryObj.description.publication_identifier;
    } else if (entryObj.publication_source === 'doi') {
      dataRecord.citation['@id'] = 'https://doi.org/' + entryObj.publication_identifier;
    } else {
      delete dataRecord.citation;
    }
    dataRecord.mainEntity.numberOfItems = listFragments.length;
    dataRecord.mainEntity.itemListElement = listFragments;


    const scriptTag = document.createElement('script'); // creates the script tag
    scriptTag.text = JSON.stringify(dataRecord); // sets the source (insert url in between quotes)
    scriptTag.type = 'application/ld+json'; // set the script type
    scriptTag.id = 'dataRecord'; // set the script type

    scriptTag.async = true; // makes script run asynchronously
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }
}
