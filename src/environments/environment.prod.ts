export const environment = {
  production: true,
  ws: window.location.protocol + '//' + window.location.hostname + '/api/',
  submission_server: 'https://scheduler.biocomputingup.it/',
  pmcURL: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?resultType=core&cursorMark=*&pageSize=25&format=json&query=',
  enaTaxonomy: 'https://www.ebi.ac.uk/ena/taxonomy/rest/tax-id/'
};
