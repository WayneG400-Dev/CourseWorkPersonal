let linebreak ='###################################';
let w_com= '///////';
let currentLevel = 1;
let result;
let w_ID;
let w_dup=0;
let w_occur;
let w_index;
let w_name;
let RecordCount = 0;
let levelEntityIDs = [];
let newEntityIDs = [];
let levelEntity = {};
let levelEntityMap = [];
let default_rec = {};
let default_rec_array = [];
//
let OLD_Entities = [
  { entID: 1, entTX: "address", entOccur: 0 },
  { entID: 2, entTX: "contact", entOccur: 0 },
  { entID: 3, entTX: "country", entOccur: 0 },
  { entID: 4, entTX: "customer", entOccur: 0 },
  { entID: 5, entTX: "custype", entOccur: 0 },
  { entID: 6, entTX: "industry", entOccur: 0 },
  { entID: 7, entTX: "job", entOccur: 0 },
  { entID: 8, entTX: "resource", entOccur: 0 },
  { entID: 9, entTX: "status", entOccur: 0 },
  { entID: 10, entTX: "contract", entOccur: 0 }
];
let Entities = [
  { entID: 1, entTX: "address", entOccur: 0, entLvls: [] },
  { entID: 2, entTX: "contact", entOccur: 0, entLvls: [] },
  { entID: 3, entTX: "country", entOccur: 0, entLvls: [] },
  { entID: 4, entTX: "customer", entOccur: 0, entLvls: [] },
  { entID: 5, entTX: "custype", entOccur: 0, entLvls: [] },
  { entID: 6, entTX: "industry", entOccur: 0, entLvls: [] },
  { entID: 7, entTX: "job", entOccur: 0, entLvls: [] },
  { entID: 8, entTX: "resource", entOccur: 0, entLvls: [] },
  { entID: 9, entTX: "status", entOccur: 0, entLvls: [] },
  { entID: 10, entTX: "contract", entOccur: 0, entLvls: [] }
];
//
let Relationships = [
  { relID: 1, relTP: "OW", relPar: 3, relChd: 1 },
  { relID: 2, relTP: "OW", relPar: 3, relChd: 4 },
  { relID: 3, relTP: "OW", relPar: 5, relChd: 4 },
  { relID: 4, relTP: "OW", relPar: 6, relChd: 4 },
  { relID: 5, relTP: "OW", relPar: 8, relChd: 7 },
  { relID: 6, relTP: "OW", relPar: 4, relChd: 1 },
  { relID: 7, relTP: "OW", relPar: 4, relChd: 2 },
  { relID: 8, relTP: "OW", relPar: 4, relChd: 7 },
  { relID: 9, relTP: "OW", relPar: 4, relChd: 10 },
  { relID: 10, relTP: "OW", relPar: 10, relChd: 7 }
];

function findEntitiesName(entity) {
  return entity.entID >= w_ID;
}
function occurEntitiesName(index) {
  Entities[index].entOccur++;
}

function nextLevelLink(entity) {
  for (let i = 0; i < Relationships.length; i++) {
    if (Relationships[i].relPar === entity){
      if (!newEntityIDs.includes(Relationships[i].relChd)) newEntityIDs.push(Relationships[i].relChd)
        }
  }
}

function nextLevel() {
  newEntityIDs = [];
  levelEntity = { level: currentLevel, Entities: levelEntityIDs };
  levelEntityMap.push(levelEntity);
  levelEntityIDs.forEach(nextLevelLink);
  levelEntityIDs= newEntityIDs;
  currentLevel++;
  //levelEntityIDs.forEach(processEntity);
}

function processEntity(levelEntityID) {
  w_ID = levelEntityID;
  RecordCount++;
  //Create Record
  //Retrieve
  w_index = Entities.findIndex(findEntitiesName);
  result = Entities.find(findEntitiesName);
  w_name = result.entTX;
  w_occur = result.entOccur;
  w_occur++;//

  //result[levelEntityID].entOccur++;
  Entities[w_index].entOccur = result.entOccur + 1;
  Entities[w_index].entLvls.push(currentLevel);
  //Setup
  default_rec = {
    dgeID: RecordCount,
    entID: w_ID,
    entTP: "OW",
    entNM: w_name,
    dgO: w_occur,
    level: currentLevel,
    xLFTP: 0,
    yLFTP: 0
  };
  default_rec_array.push(default_rec);
  console.log(levelEntityID);
}
///////
////// LOGIC
/////// 


w_com +'initialise';

levelEntityIDs = [3, 5, 6, 8];
w_com+'start lvl 1';
levelEntityIDs.forEach(processEntity);
w_com+'ENTITY ID';
default_rec_array
w_com+'ENTITY MAP';
Entities
w_com+'Stage lvl 2 and save lvl 1';
nextLevel();
levelEntityMap;
w_com+'ENTITY ID on lvl';
levelEntityIDs;
w_com+'start lvl 2';
levelEntityIDs.forEach(processEntity);
w_com+'ENTITY ID';
default_rec_array
w_com+'ENTITY MAP';
Entities
w_com+'Stage lvl 3 and save lvl 2';
nextLevel();
levelEntityMap;
w_com+'ENTITY ID on lvl';
levelEntityIDs;
w_com+'start lvl 3';
levelEntityIDs.forEach(processEntity);
w_com+'ENTITY ID';
default_rec_array
w_com+'ENTITY MAP';
Entities
w_com+'Stage lvl 4 and save lvl 3';
nextLevel();
levelEntityMap;
w_com+'ENTITY ID on lvl';
levelEntityIDs;
w_com+'start lvl 4';
levelEntityIDs.forEach(processEntity);
w_com+'ENTITY ID';
default_rec_array
w_com+'ENTITY MAP';
Entities
w_com+'Stage lvl 5 and save lvl 4';
nextLevel();
levelEntityMap;
w_com+'ENTITY ID on lvl';
levelEntityIDs;

