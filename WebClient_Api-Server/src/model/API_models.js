/* //Full-Template for Req Structure
{
  'name': 'VALID_SCHEMA',     //String
  'relationshipID': $[0/2],   //Int 1-99 ***
  *'platform':' ',            //String
  'paging': {
    'pgNumber': $[0/2],   //Int 1-99
    'pgSize': $[0/2]      //Int 1-99
  },
  **'sort': {},           //PHASE 2
  **'filter': {},         //PHASE 2
  'stateObj': {} ,
  'schema':  {}
}
// * Optional Attibute that invoke Responsive layout
// ** NOT CURRENT AVAILABLE
// *** Future Change: 'relationshipID': ' ',      //String

//Required Universally - (App Initalization)
{
  'name': 'VALID_SCHEMA',
  'relationshipID': 0,
  'paging': {},
  'stateObj': {}
}

//Required Call 2 - (SORTS,PAGING,SEARCH,FILTER)
{
  'name': '${VALID_SCHEMA}',
  'relationshipID': ${VALID_REL_ID},
  'paging': {
    'pgNumber': $[0/2],
    'pgSize': $[0/2]
  },
  'stateObj': {'${APPLICATION_ACTIVE_STATE}'},
  'schema': {'${DATA_COMPONENT_SHEMA}' }
}

// Required Call ViewDetail.Next() - (movng accross the App Data Sates)
{
  'name': '${VALID_SCHEMA}',
  'relationshipID': ${VALID_REL_ID},
  'paging': {},
  'stateObj': {'${APPLICATION_ACTIVE_STATE}'}
}

// ++++ API-RESPONSE-OBJECT ++++//
//Full-Template for Res Structure
{
  'paging': {
    'pgNumber': $[0/2],         //Int 1-99
    'pgSize': $[0/2],           //Int 1-99 or '*ALL'
    'pgMore': false || true ,   //Boolean
  },
  'schema':  {'${DATA_COMPONENT_SHEMA}' },
  'data':  {'${REQ_DATA_RESULTS}' },
  'links': {'${UI_HATEOAS}' }
}
 */
