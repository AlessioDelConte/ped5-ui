export const environment = {
  production: false,
  ws: 'https://127.0.0.1:8000/',
  submission_server: 'https://scheduler.biocomputingup.it/',
  pmcURL: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?resultType=core&cursorMark=*&pageSize=25&format=json&query=',
  enaTaxonomy: 'https://www.ebi.ac.uk/ena/taxonomy/rest/tax-id/'
};

console.log('Running default environment');
console.log('environment.ws: ' + environment.ws);
