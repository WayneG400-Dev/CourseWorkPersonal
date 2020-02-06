var express = require('express')
var mysql = require('mysql')
var math = require('mathjs')
var async = require('async')


var TopRowCounter, LevelTwoCounter, linesUpToLvl2, maxLevelSet
var temp = [], topEnts = [], RelationshipArray = [], reltnArray = [], entIDArray = [], dgOArray = [], distinctEnts = [], dgArray = []

var DiagrammedEntities = []
var OrigRelations = []
var temp = []
var connectingLinesArray = []


var pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'sql123',
  database: 'ptype_rEngg_test',
  debug: false
})


pool.getConnection(function (err, connection){
  if (err) {
      res.json({'code': 100, 'status': 'Error in connection database'})
      return;
    }

  console.log('connected as id ' + connection.threadId)

    dgEntArray(connection)

    connection.on('error', function(err) {      
          res.json({"code" : 100, "status" : "Error in connection database"});
              
    })
})


dgEntArray = function (connection){
  var query
        var table
        var len



        async.series([

          function (callback) {
          query = 'SELECT distinct par FROM relationships where par not in (select chld from relationships)';
          table = '';
          query = mysql.format(query, table)
                connection.query(query, function (err, rows)                {
                  if (err)
                      {console.log("error topEnts");}
                  else                    {
                      TopRowCounter = rows.length
                        topEnts = rows
                        console.log('topEnts populated', TopRowCounter)
                    }
                  callback(null, 'one')
                })
                },

          function (callback) {
          var i, j
                var objRln

                query = 'SELECT par, chld FROM relationships';
          table = '';
          query = mysql.format(query, table)
                connection.query(query, function (err, rows)                {
                  if (err)
                      {console.log("error RelationshipArray");}
                  else
                    {
                      RelationshipArray = rows
                        console.log('RelationshipArray populated')

                        for (i = 0; i < RelationshipArray.length; i++)                        {
                          objRln = {}
                            objRln.par = RelationshipArray[i].par
                            objRln.chld = RelationshipArray[i].chld
                            objRln.dchld = TopRowCounter + i + 1
                            objRln.dpar = 0
                            reltnArray[i] = objRln
                        }
                      for (i = 0; i < RelationshipArray.length; i++)                        {
                          for (j = 0; j < topEnts.length; j++)                            {
                              if (reltnArray[i].par == topEnts[j].par)
                                  {reltnArray[i].dpar = j+1;}
                            }
                        }
                    }
                  callback(null, 'two')              
                  })
                },

          function (callback) {
                  query = 'drop table if exists DiagEnt';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                        {console.log("error in diagent table dropping");}
                        else                      {
                        console.log('diagent table dropped')
                      }
                        callback(null, 'four')              
                  })
                },

          function (callback) {
                  query = 'CREATE TABLE DiagEnt(dgeID int, entID int, pid int, dpid int, entTP varchar(2), entNM varchar(50), dgO int, level int, xLFTP int, yLFTP int)';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                        {console.log("error in diagent table creation");}
                        else {
                        console.log('diagent table created')
                          }
                        callback(null, 'five')              
                      })
                },

          function (callback) {
                      /// /////////////////////////entIDs updated
                  query = 'INSERT into DiagEnt(entID) SELECT distinct relationships.par FROM relationships where relationships.par not in (select relationships.chld from relationships)';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                        {console.log("error in inserting Top EntIds");}
                        else {
                        console.log('top entIDs populated')
                          }
                        callback(null, 'six')              
                      })
                },
          function (callback) {
                      /// /////////////////////////entIDs updated
                  query = 'INSERT into DiagEnt(entID) SELECT relationships.chld FROM relationships';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                        {console.log("error in inserting rest EntId");}
                        else {
                        console.log('rest entIDs populated')
                          }
                        callback(null, 'seven')              
                      })
                },

          function (callback) {
                    /// ///////////////////////////entNM updated
                  query = 'update diagent A, entities B set A.entnm=B.entnm where A.entid=B.entid';
                  table = '';
                  query = mysql.format(query, table)
                    connection.query(query, function (err, rows)                    {
                      if (err)
                      {console.log("error while updating entNM");}
                      else {
                      console.log('entNM updated')
                         }
                      callback(null, 'eight')              
                      })
                },

          function (callback) {
                    /// //////////////////////////////dgO, level, entTP
                  query = "update diagent set dgO =1, level =0, entTP ='P'"
                    table = '';
                  query = mysql.format(query, table)
                    connection.query(query, function (err, rows)                    {
                      if (err)
                      {console.log("error in dgO, level TP setting");}
                      else {
                      console.log('dgO, levels, TP initialized')
                        }
                      callback(null, 'nine')              
                    })
                },

          function (callback) {
                      /// ////////////////////////////dgeIds in sequence
                  query = 'alter table diagent drop dgeid';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                        {console.log("error dgid.");}
                        else {
                        console.log('dgeid.')
                          }
                        callback(null, 'ten')              
                    })
                },
          function (callback) {
                      /// ////////////////////////////dgeIds in sequence
                  query = 'alter table diagent add dgeid1 int unsigned not null auto_increment primary key, auto_increment = 1';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                        {console.log("error while setting up dgid..");}
                        else {
                        console.log('dgeid setting in progress..')
                          }
                        callback(null, 'eleven')              
                    })
                },
          function (callback) {
                      /// ////////////////////////////dgeIds in sequence
                  query = 'alter table diagent change dgeid1 dgeid int';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                        {console.log("error while setting up dgid...");}
                        else {
                        console.log('dgeid setting... done')
                          }
                        callback(null, 'twelve')              
                    })
                },

          function (callback) {
                      /// ////////////////////////////// dgOs
                  var j, k, l

                      query = 'SELECT entID FROM diagent';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                          {console.log("error while selecting entIDs");}
                        else
                        {
                          entIDArray = rows
                            
                            for (j = 0; j < entIDArray.length; j++)
                              {dgOArray[j] = 1;}

                          for (j = 0; j < entIDArray.length; j++)
                            {
                              l = entIDArray[j].entID
                              for (k = 0; k < entIDArray.length; k++)
                              {
                                if (l == entIDArray[k].entID)                                  {
                                    if (k != j)
                                      {
                                        if (k > j)                                          {
                                            dgOArray[k]++
                                          }
                                      }
                                  }
                              }
                            }
                        }
                        callback(null, 'thirteen')              
                    })
                },

          function (callback) {
                  var j

                      for (j = 0; j < entIDArray.length; j++)
                      {
                        query = 'update diagent set dgO=? where dgeId=?';
                        table = [dgOArray[j], j + 1]
                        query = mysql.format(query, table)
                        connection.query(query, function (err, rows)                        {
                          if (err)
                              {throw err;}
                          else
                              if (j == entIDArray.length - 1)                              {
                                console.log("dgO's set")
                              }
                        })
                      }
                  callback(null, 'fourteen')              
                },

          function (callback) {
                      /// ////////////////////////////// levels
                  query = 'Update diagent set level=1 where entID in (SELECT distinct par FROM relationships where par not in (select chld from relationships))';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                        {console.log("error while setting level1");}
                        else
                          {console.log("level 1 set");}
                        callback(null, 'fifteen')              
                    })
                },
          function (callback) {
                  query = 'Select chld from relationships where par in (SELECT distinct par FROM relationships where par not in (select chld from relationships))';
                  table = '';
                  query = mysql.format(query, table)
                    connection.query(query, function (err, rows)                    {
                      if (err)
                        {console.log("error while setting levet 2");}
                      else                      {
                        LevelTwoCounter = rows.length   
                        len = TopRowCounter + LevelTwoCounter + 1  
                        console.log('len from sixteen ', +len)  
                      }
                      callback(null, 'sixteen')              
                    })
                },
          function (callback) {
                  query = 'Update diagent set level=2 where entID in (select chld from relationships where par in (SELECT distinct par FROM relationships where par not in (select chld from relationships))) AND dgeID < ?';
                  table = [len]
                  query = mysql.format(query, table)
                  connection.query(query, function (err, rows)                  {
                    if (err)
                        {throw err;}
                    else
                        {console.log("level 2 set...");}

                    callback(null, 'seventeen')              
                    })
                },

          function (callback) {
                  var lastlevel = 2
                    var x, y, z, l
                    var curEnID, curEnPrnt

                    query = 'SELECT entID, pid, dgeid, dpid, dgO, level, xLFTP, yLFTP FROM diagent';
                  table = '';
                  query = mysql.format(query, table)
                    connection.query(query, function (err, rows)                    {
                      if (err)
                        {console.log("error while setting rest levels");}
                      else
                      {
                        dgArray = rows
                          len = TopRowCounter + LevelTwoCounter
                          console.log('len from level function ', +len)  


                          for (x = len; x < dgArray.length; x++)
                          {
                            curEnID = dgArray[x].entID
                              l = dgArray[x].dgO
                              m = 0

                              for (y = 0; y < RelationshipArray.length; y++)
                              {
                                if (curEnID == RelationshipArray[y].chld)                                  {
                                    curEnPrnt = RelationshipArray[y].par

                                      if (dgArray[x].dgO == 1)
                                      {
                                        for (z = 0; z < x; z++)
                                          {
                                            if (curEnPrnt == dgArray[z].entID)                                              {
                                                dgArray[x].level = dgArray[z].level + 1
                                                  if (lastlevel < dgArray[x].level)
                                                    {lastlevel = dgArray[x].level;}
                                                z = x  
                                                  y = RelationshipArray.length
                                              }
                                          }
                                      }

                                    if (l > 0)                                      {
                                        if (dgArray[x].dgO > 1)
                                        {
                                          for (z = m; z < x; z++)
                                            {
                                              if (curEnPrnt == dgArray[z].entID)                                                {
                                                  dgArray[x].level = dgArray[z].level + 1
                                                    m = z + 1
                                                    if (lastlevel < dgArray[x].level)
                                                      {lastlevel = dgArray[x].level;}
                                                  z = x
                                                }
                                            }
                                          l--
                                        }
                                      }
                                  }
                              }
                          }
                      }
                      console.log('levels calculated ')
                      callback(null, 'eighteen')              
                    })
                },

          function (callback) {
                  var x
                    for (x = 0; x < dgArray.length; x++)
                    {
                      query = 'update diagent set level=? where dgeId=?';
                      table = [dgArray[x].level, x + 1]
                        query = mysql.format(query, table)
                        connection.query(query, function (err, rows)                        {
                          if (err)
                            {throw err;}
                          else
                              ;
                        })
                    }
                  console.log('levels beyond 2 set')
                    callback(null, 'ninteen')
                },

          function (callback) {
                  var i
                  
                      query = 'SELECT * FROM diagent WHERE level<3';
                  table = '';
                  query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                          {console.log("error while setting rest levels");}
                        else
                            {linesUpToLvl2 = rows.length;}
                        callback(null, 'thirtyone')              
                  })
                },

          function (callback) {
                    /// /////////////// Calculate dpids

                  var dpidCounter = -1000
                    var i, j, k, l, m
                    var curEnID, curEnPrnt

                    for (i = 0; i < topEnts.length; i++)                    {
                      if (dgArray[i].dgeid == i + 1)                        {
                          dgArray[i].dpid = dpidCounter
                            dpidCounter++
                        }
                    }

                  for (i = topEnts.length; i < dgArray.length; i++)                    {
                      curEnID = dgArray[i].entID
                        l = dgArray[i].dgO
                        m = 0
                        for (j = 0; j < RelationshipArray.length; j++)
                        {
                          if (curEnID == RelationshipArray[j].chld)                            {
                              curEnPrnt = RelationshipArray[j].par

                                if (dgArray[i].dgO == 1)
                                {
                                  for (k = 0; k < i; k++)
                                    {
                                      if (curEnPrnt == dgArray[k].entID)                                        {
                                          dgArray[i].dpid = dgArray[k].dgeid
                                            k = i
                                            j = RelationshipArray.length
                                        }
                                    }
                                }

                              if (l > 0)                                {
                                  if (dgArray[i].dgO > 1)
                                    {
                                      for (k = m; k < i; k++)
                                        {
                                          if (curEnPrnt == dgArray[k].entID)                                            {
                                              dgArray[i].dpid = dgArray[k].dgeid
                                                m = k + 1
                                                k = i
                                            }
                                        }
                                      l--
                                    }
                                }
                            }
                        }
                    }

                  for (i = 0; i < topEnts.length; i++)                    {
                      dgArray[i].pid = dgArray[i].dpid
                    }

                  k = 0
                    for (i = topEnts.length; i < dgArray.length; i++)                    {
                      dgArray[i].pid = RelationshipArray[k].par
                      k++
                    }

                  callback(null, 'thirtytwo') 
                },

          function (callback) {
                  var i, j, k

                    ///////// update telationship copy array with parent and child DIDs
                    j = topEnts.length
                    for (i = 0; i < RelationshipArray.length; i++)                    {
                      reltnArray[i].dpar = dgArray[j].dpid
                        reltnArray[i].dchld = dgArray[j].dgeid
                        j++
                    }

                  callback(null, 'thirtythree')              
                },

          function (callback) {
                var i

                    //////// Update pids & dpids
                    for (i = 0; i < dgArray.length; i++)
                    {
                      query = 'Update diagent set pid=?, dpid=? where dgeid = ?';
                      table = [dgArray[i].pid, dgArray[i].dpid, dgArray[i].dgeid]
                      query = mysql.format(query, table)
                      connection.query(query, function (err, rows)                      {
                        if (err)
                            {throw err;}
                        else
                              ;
                      })
                    }
                console.log('pids & dpids set...')

                    callback(null, 'thirtyfour')              
                }

        ], function (error, results) { // <---  main callback
              	console.log('Diagrammed Array ready')

                fetchArrays(connection)

              })


	       }

fetchArrays = function (connection)        {
          async.series([


            function (callback) {
              query = 'Select * from relationships';
              table = '';
              query = mysql.format(query, table)
                connection.query(query, function (err, rows)                {
                  if (err)
                    {console.log("error while fetching original relation");}
                  else
                    {OrigRelations = rows;}
                  callback(null, 'fetchTwo')              
                })
            },

            function (callback) {
              query = 'Select * from diagent';
              table = '';
              query = mysql.format(query, table)
                connection.query(query, function (err, rows)                {
                  if (err)
                    {console.log("error while fetching original entities");}
                  else
                    {DiagrammedEntities = rows;}
                  callback(null, 'fetchThree')              
                })
            }

          ], function (error, results) { // <--- main callback
            console.log('All Entities array fetched')
            
             
              dolater(connection)            //do calculations now
          })



        }

dolater = function (connection)                                        // data structure getting ready for the calculation of coordinates - entities and lines
        {
          async.series([


          function (callback) {
            /// ///////////////////////////////////////////////////////////////// update temp
            var i, j, k, l, m, n, o, p
            var xxx, yyy
            var xxx1, xxx2, xxx3
            
            var len1 = DiagrammedEntities.length                               //amended diagent
            var len2 = OrigRelations.length                                    //amended relationcopy
            var len5
            
            var curlvl, lastlevel, populate = 0, countOccur
            var curEnID
            var startpid

            var obj
            var objents
            var objcords
            var ents = []
            var cords = []

            var span = []
            var maxSpan = []

            var TopElements = []                                               //topents

            for (i = 0; i < topEnts.length; i++)            {
              TopElements[i] = topEnts[i].par
            }

            len5 = TopElements.length
            len1 = DiagrammedEntities.length
            lastlevel = DiagrammedEntities[len1 - 1].level

            for (i = 0; i < lastlevel; i++)            {
              curlvl = i + 1
                xxx1 = 0                                                         //i - counter for temp, xxx1 - counter for ents, cords

                ents = []
                cords = []

                span = []
                for (xxx = 0; xxx < len5; xxx++)
                  {span[xxx] = 0;}

              obj = {}
                obj.level = curlvl                    
                obj.count = 0
                obj.ents = ents
                obj.cords = cords
                obj.span = span            

                for (j = 0; j < len1; j++)                                         // traverse dgarray
                {
                  if (DiagrammedEntities[j].level == curlvl)                    {
                      curEnID = DiagrammedEntities[j].entID
          
                        obj.count++                                                //object to hold entity details

                        objents = {}                                               //ents gets populated
                        objents.id = curEnID
                        objents.pid = DiagrammedEntities[j].pid
                        objents.did = DiagrammedEntities[j].dgeid
                        objents.dpid = DiagrammedEntities[j].dpid
                        objents.selfSpan = 1                                       //how many children below
                        objents.lshift = 0                                         //how much pushed from left side towards right
                        objents.section = 0
                        for (xxx = 0; xxx < len5; xxx++)
                        {
                          if (curEnID == TopElements[xxx])                            {
                              objents.section = xxx                                //Is a top entity; set the section
                                xxx = len5
                            }
                        }
                      ents[xxx1] = objents

                        objcords = {}
                        objcords.x = 0
                        objcords.y = 0
                        cords[xxx1] = objcords

                        xxx1++
                    }
                }
              obj.ents = ents
                obj.cords = cords
                temp[i] = obj

          }                                                                           // temp populated with basic details


          /// ////////////////////////////////////////////////////////////////////////// derive further parameters based on temp

          /// ///////////////////////// selfSpan
            for ((i = lastlevel - 2); i >= 0; i--)
          {
            j = temp[i].count
              k = temp[i + 1].count
                
              l = 0
              while (j > l)              {
                m = 0
                n = 0
                while (k > m)                {
                  if (temp[i].ents[l].did == temp[i + 1].ents[m].dpid)                  {
                    n = n + temp[i + 1].ents[m].selfSpan
                      temp[i].ents[l].selfSpan = n
                  }
                  m++     
                }
                l++
              }
          }
          /// /////////////////////////////  reset selfSpan as 0 for all childless entities by traversing the tree again
            for ((i = lastlevel - 2); i >= 0; i--)          {
            j = temp[i].count
              k = temp[i + 1].count
                
              l = 0
              while (j > l)              {
                n = 0
                m = 0
                while (k > m)                {
                  if (temp[i].ents[l].did == temp[i + 1].ents[m].dpid)
                  {
                    n = 99999999999999 
                  }
                  m++
                  
                }

                if ((m == k) && (n == 0))
                {
                  temp[i].ents[l].selfSpan = 0
                }

                l++
              }
          }
          /// /////////////////////////////  reset selfSpan as 0 for all bottom most entities at the bottom most level
            for (i = (lastlevel - 1); i > (lastlevel - 2); i--)          {
            j = temp[i].count
              l = 0

              while (j > l)              {
                temp[i].ents[l].selfSpan = 0
                l++
              }
          }

          /// /////////////////////////////                                        set sections
            for (i = 1; i < lastlevel; i++)                                            /// // levels beyond 1st
          {
            xxx = temp[i].count                        
              yyy = 0

              while (xxx > yyy)              {

                curEnID = temp[i].ents[yyy].dpid                               //dpid of the entity for which section is to be set

                  xxx1 = temp[i - 1].count                                         //entity count of upper level
                  xxx2 = 0

                  while (xxx1 > xxx2)                                              // search at the upper level
                  {
                    if (curEnID == temp[i - 1].ents[xxx2].did)                     // did of entity above is equal to dpid of entity being compared
                      {
                        temp[i].ents[yyy].section = temp[i - 1].ents[xxx2].section
                          xxx2 = xxx1
                      }
                    xxx2++
                  }
                yyy++
              }
          }

          /// ///////////////////////////////////////////////////////              span
            for (i = 0; i < lastlevel; i++)          {
            xxx = temp[i].count                        
              yyy = 0

              while (xxx > yyy)              {
                k = temp[i].ents[yyy].section
                  temp[i].span[k]++                            
                  yyy++
              }
          }

          /// ////////////////////////////////////////////////////////             max span in a column
            for (j = 0; j < len5; j++)
          {
            for (i = 0; i < lastlevel; i++)            {
              xxx = temp[i].span[j]
                if (maxSpan[j] < xxx)
                  {maxSpan[j] = xxx;}
            }
          }

          /// ////////////////////////////////////////////////////////             shift inside a section

            var inSectionShiftOnRightEnd = []                                      //gap left from right end inside a section
          for (xxx = 0; xxx < len5; xxx++)
            {inSectionShiftOnRightEnd[xxx] = 0;}

            yyy = 0
          xxx2 = 0
          
          for (i = 1; i < lastlevel; i++)          {

            for (j = 0; j < TopElements.length; j++)            {
              xxx = yyy + temp[i - 1].span[j]                        
              xxx1 = xxx2 + temp[i].span[j]                        

              n = 0 
              l = 0

              if (j == (TopElements.length - 1))              {
                xxx = temp[i - 1].count                        
                xxx1 = temp[i].count
              }

              while (xxx > yyy)              {

                if (temp[i - 1].ents[yyy].selfSpan == 0)                  {
                    n++  
    
                      if (yyy == (xxx - 1))
                        {inSectionShiftOnRightEnd[j] = inSectionShiftOnRightEnd[j] + 1;}        // gap left from right end inside a section
                  }                  else                  {
                    if (n > 0)                    {
                      while (xxx1 > xxx2)                      {
                        if (temp[i - 1].ents[yyy].did == temp[i].ents[xxx2].dpid)                          {
                            temp[i].ents[xxx2].lshift = n                                    //push towards right ftom left side inside a section
                              xxx2 = xxx1
                          }
                        xxx2++
                      }
                    }
                  }

                yyy++
              }

              yyy = xxx                        
              xxx2 = xxx1

            }

            yyy = 0
            xxx2 = 0

          }
          /// ///////////////////////////////////////////////////////////////                  final accumalted push towards right ftom left side inside a section
            var sectionshift = []
          for (xxx = 0; xxx < len5; xxx++)
            {sectionshift[xxx] = 0;}

            for (j = 0; j < TopElements.length; j++)          {
            for (i = 0; i < lastlevel; i++)              {

                xxx = temp[i].count 
                  yyy = 0      
                                    
                  while (xxx > yyy)                  {
                    if (temp[i].ents[yyy].section == j)
                        {sectionshift[j] = sectionshift[j] + temp[i].ents[yyy].lshift;}         //  sectionshift
                    yyy++
                  }
              }
          }

/*
          for(xxx=0; xxx<len5; xxx++)
              console.log("sectionshift[xxx]  " + sectionshift[xxx]);

          for(xxx=0; xxx<len5; xxx++)
              console.log("inSectionShiftOnRightEnd[xxx]  " + inSectionShiftOnRightEnd[xxx]);

          for(i=0; i < lastlevel; i++)
              console.log(temp[i]);

          for(i=0; i < lastlevel; i++)
              for(j=0; j < temp[i].count; j++)
                  console.log(temp[i].ents[j].id, temp[i].ents[j].selfSpan, temp[i].ents[j].lshift);

*/

          /// //////////////////////////////////////////////////////////////////////////////// calculate coordinates now

            var elementWidth = 130     //400;
            var elementHeight = 130    //500;
            var elementVGap = 170      //300;
            var longGap = 150          //200;
            var shortGap = 150         //200;        
            var interSectionGap = 300

            var id, did, pid
            var x, y, x1, x2, q, r
            var level, dist, nextlevel, nextcount, parent, lastWasParent, lastWasParent
            var farleft, farleftFlag, farright, farrightFlag, onleft, onright, shiftItLeft, countLastLvl
            var count, reversecount, childCount, browseLower = 0, browseThis = 0, loop, kk, ll, mm
            var preSection, sectionDiff, leftMost
           

            for ((i = lastlevel - 1); i >= 0; i--)            {
              level = i + 1                                //current level
                count = temp[i].count                      //count at this level
                reversecount = 0                           //counter to traverse temp.ents array

                parent = 0 
                onleft = 0
                onright = 0
                lastWasParent = 0
                lastCoordForRight = 0

                while (count)                {
                  id = temp[i].ents[reversecount].did                                        //browse level wise, from botttom to top, left to right inside ents array
                    y = 100 + (elementHeight + elementVGap) * (level - 1)                          //y gets calculated based on level, element height and elementVgap
                    
                    //first most element
                    if ((i == (lastlevel - 1)) && (reversecount == 0))                               // coordinates of left most element at the last level
                    {                                                                           // dgeid shud have unique ids. 1st occurence - 1, 2nd -2, 3rd -3
                    //    x = 4000;
                      x = 3000
                    
                        for (j = 0; j < len1; j++)
                        {
                          if (DiagrammedEntities[j].dgeid == id)
                            {
                              DiagrammedEntities[j].xLFTP = x
                                DiagrammedEntities[j].yLFTP = y
                                temp[i].cords[reversecount].x = x
                                temp[i].cords[reversecount].y = y 
                                j = len1
                            }
                        }
                    }

                    // rest of the entities at last level. All entities at last level are childless
                  if ((i == (lastlevel - 1)) && (reversecount != 0))
                    {

                      xxx = temp[i].ents[reversecount].section
                        xxx2 = temp[i].ents[reversecount - 1].section

                        sectionDiff = temp[i].ents[reversecount].section - temp[i].ents[reversecount - 1].section

                        x = (temp[i].cords[reversecount - 1].x + elementWidth + longGap) + (inSectionShiftOnRightEnd[xxx - 1] * (elementWidth + longGap)) + (sectionDiff * interSectionGap) + (sectionshift[xxx] * (elementWidth + longGap))
 
                        for (j = 0; j < len1; j++)
                        {
                          if (DiagrammedEntities[j].dgeid == id)
                            {
                              DiagrammedEntities[j].xLFTP = x
                                DiagrammedEntities[j].yLFTP = y
                                temp[i].cords[reversecount].x = x
                                temp[i].cords[reversecount].y = y 
                                j = len1
                            }
                        }
                    }

                    // rest levels and entities - have parent entities or childless entities
                  if (i < (lastlevel - 1))
                    {
                      farleftFlag = 0                                                          //look for parent entities who have children at a lower level
                        farrightFlag = 0
                        childCount = 0
                        browseLower = 0
                        loop = temp[i + 1].count                                                   //loop thru ents of lower level to check for children if any

                        while (loop)                                                               // loop start
                        {
                          if (temp[i].ents[reversecount].did == temp[i + 1].ents[browseLower].dpid)                            {
                              parent = 1
                                childCount++

                                if (farleftFlag == 0)                                              // capture "x" of first child of this entity
                                {
                                  farleft = temp[i + 1].cords[browseLower].x
                                    farleftFlag = 1
                                }
                              farright = temp[i + 1].cords[browseLower].x + elementWidth

                                browseThis = reversecount
                                lastWasParent = 1
                                
                            }                            else                            {
                              if ((browseLower == (temp[i + 1].count - 1)) && (parent == 0))       // entities at this level that don't have children, starting from left side
                                  {onleft++;}

                              if ((browseLower == (temp[i + 1].count - 1)) && (parent == 1))       // entities at this level that don't have children, are on right to a parent or non-parent
                                  {onright++;}
                            }
                          browseLower++
                            loop--
                        }

                        // loop thru to identify parent, left or right
                        /// ///////////////////////////////////////                                drawing       - parent - first or next to lefties
                      if (childCount > 0)                                                          /// /////    if on left or parent
                        {
                          x1 = (farright - farleft) / 2                                          ////////    parent entity at this level
                            x2 = farleft + x1 - elementWidth / 2
                            x = x2

                            for (j = 0; j < len1; j++)
                            {
                              if (DiagrammedEntities[j].dgeid == id)                                {
                                  DiagrammedEntities[j].xLFTP = x
                                    DiagrammedEntities[j].yLFTP = y
                                    temp[i].cords[reversecount].x = x
                                    temp[i].cords[reversecount].y = y 
                                    j = len1
                                }
                            }

                            /// ///////////////////drawing       - lefparent
                          if (onleft > 0)
                            {
                              kk = 1
                                ll = reversecount
                                mm = farleft

                                while (onleft)                                                   // childless entities left to the parent entity
                                {
                                  for (j = 0; j < len1; j++)
                                    {
                                      if (DiagrammedEntities[j].dgeid == temp[i].ents[reversecount - kk].did)                                        {
                                          if (temp[i].ents[reversecount - kk].dpid == temp[i].ents[ll].dpid)                                           {
                                             x = mm - (elementWidth + shortGap)

                                                DiagrammedEntities[j].xLFTP = x
                                                DiagrammedEntities[j].yLFTP = y
                                                temp[i].cords[reversecount - kk].x = x
                                                temp[i].cords[reversecount - kk].y = y
                                                kk++
                                                ll--
                                                mm = x
                                                j = len1
                                            }                                            else                                            {
                                             if (temp[i].ents[reversecount - kk].section == temp[i].ents[ll].section)
                                                  {x = mm - (elementWidth + longGap);}
                                             else
                                                  {x = mm - (interSectionGap + elementWidth + longGap);}

                                             DiagrammedEntities[j].xLFTP = x
                                                DiagrammedEntities[j].yLFTP = y
                                                temp[i].cords[reversecount - kk].x = x
                                                temp[i].cords[reversecount - kk].y = y
                                                kk++
                                                ll--
                                                mm = x
                                                j = len1
                                            }
                                        }
                                    }
                                  onleft-- 
                                }
                            }
                          childCount = 0
                            onleft = 0
                            onright = 0

                        }                                                                       // Is parent or is onleft

                        /// ////////////////////////drawing        - right to a non-parent or parent entity
                      if (onright > 0)
                        {
                          if (lastWasParent == 1)                            {
                              if (temp[i].ents[reversecount].dpid == temp[i].ents[reversecount - 1].dpid)
                                  {lastCoordForRight = farright + shortGap;}
                              else                                    {
                                  if (temp[i].ents[reversecount].section == temp[i].ents[reversecount - 1].section)
                                          {lastCoordForRight = farright + longGap;}
                                  else
                                          {lastCoordForRight = farright + interSectionGap + longGap;}
                                }
                              x = lastCoordForRight
                            }                            else                            {
                              if (temp[i].ents[reversecount].dpid == temp[i].ents[reversecount - 1].dpid)
                                  {x = temp[i].cords[reversecount-1].x + elementWidth + shortGap;}
                              else                                    {
                                  if (temp[i].ents[reversecount].section == temp[i].ents[reversecount - 1].section)
                                          {x = temp[i].cords[reversecount-1].x + elementWidth + longGap;}
                                  else
                                            {x = temp[i].cords[reversecount-1].x + interSectionGap + elementWidth + longGap;}
                                }
                            }

                          for (j = 0; j < len1; j++)
                            {
                              if (DiagrammedEntities[j].dgeid == id)                                {
                                  DiagrammedEntities[j].xLFTP = x
                                    DiagrammedEntities[j].yLFTP = y
                                    temp[i].cords[reversecount].x = x
                                    temp[i].cords[reversecount].y = y 
                                    j = len1
                                }
                            }
                          childCount = 0
                            onleft = 0
                            onright = 0
                            lastWasParent = 0
                            lastCoordForRight = 0
                        }                                                                     // Is on right
                    }                                                                         // rest levels

                  reversecount++
                    count--
                }                                                                             // while loop
            }                                                                                 // for loop

            /*
            for(j=0; j<len1; j++)
                console.log(DiagrammedEntities[j]);
            */

            /// ////////////// connectingLinesArray formed from relationships for calculations as temp is formed from diagrammedentiies
            len1 = DiagrammedEntities.length

            var xPar, yPar, xChld, yChld
            var connectingLines
            

            for (i = 0; i < OrigRelations.length; i++)            {
                    /// ////////////////connect based on did of entities

              for (j = 0; j < len1; j++)                    {
                      if (OrigRelations[i].par == DiagrammedEntities[j].entID)                        {
                          xPar = DiagrammedEntities[j].xLFTP
                            yPar = DiagrammedEntities[j].yLFTP
                            j = len1
                        }
                    }

              for (j = 0; j < len1; j++)                    {
                      if (OrigRelations[i].chld == DiagrammedEntities[j].entID)                        {
                          xChld = DiagrammedEntities[j].xLFTP
                            yChld = DiagrammedEntities[j].yLFTP
                            j = len1
                        }
                    }

              connectingLines = {}
                    connectingLines.rlnID = OrigRelations[i].rlnID
                    connectingLines.rlnTP = OrigRelations[i].rlnTP
                    connectingLines.par = OrigRelations[i].par
                    connectingLines.chld = OrigRelations[i].chld

                    //connectingLines.dpid = OrigRelations[i].par;
                    //connectingLines.did = OrigRelations[i].chld;
                    
                    connectingLines.count = 1
                    connectingLines.x1 = xPar + elementWidth / 2
                    connectingLines.y1 = yPar + elementHeight
                    connectingLines.x2 = connectingLines.x1
                    connectingLines.y2 = connectingLines.y1 + elementVGap / 2
                    connectingLines.x3 = xChld + elementWidth / 2
                    connectingLines.y3 = connectingLines.y2
                    connectingLines.x4 = connectingLines.x3
                    connectingLines.y4 = yChld

                    connectingLinesArray[i] = connectingLines
          
            }
            for (i = 0; i < connectingLinesArray.length; i++)            {
              for (j = 0; j < connectingLinesArray.length; j++)                {
                  if (connectingLinesArray[i].chld == connectingLinesArray[j].chld)                     {
                       if (j != i)                        {
                          if (j > i)
                             {connectingLinesArray[j].count++;}
                        }
                     }
                }
            }

            console.log('i m done')
                  callback(null, 'fromdolater')
                  }

        ], function (error, results) { // <--- this is the main callback
          updateDGArrays(connection)
         
             })


        }

updateDGArrays = function (connection)        {
          async.series([


              function (callback) {
                query = 'drop table if exists DiagrammedEntities';
                table = '';
                query = mysql.format(query, table)
                  connection.query(query, function (err, rows)                  {
                    if (err)
                    {console.log("error in DiagrammedEntities table dropping");}
                    else                  {
                    console.log('DiagrammedEntities table dropped')
                  }
                    callback(null, 'updateOne')              
                })
              },

              function (callback) {
                query = 'drop table if exists DiagrammedLines';
                table = '';
                query = mysql.format(query, table)
                  connection.query(query, function (err, rows)                  {
                    if (err)
                    {console.log("error in DiagrammedLines table dropping");}
                    else                  {
                    console.log('DiagrammedLines table dropped')
                  }
                    callback(null, 'updateTwo')              
              })
              },

              function (callback) {
                query = 'CREATE TABLE DiagrammedEntities(dgeID int, entID int, entTP varchar(2), entNM varchar(50), dgO int, level int, xLFTP int, yLFTP int)';
                table = '';
                query = mysql.format(query, table)
                    connection.query(query, function (err, rows)                    {
                      if (err)
                      {console.log("error in DiagrammedEntities table creation");}
                      else {
                      console.log('DiagrammedEntities created')
                        }
                      callback(null, 'updateThree')              
                    })
              },

              function (callback) {
                query = 'CREATE TABLE DiagrammedLines(rlnID int, rlnTP varchar(2), OWE int, CHL int, x1 int, y1 int, x2 int, y2 int, x3 int, y3 int, x4 int, y4 int)';
                table = '';
                query = mysql.format(query, table)
                    connection.query(query, function (err, rows)                    {
                      if (err)
                      {console.log("error in DiagrammedLines table creation");}
                      else {
                      console.log('DiagrammedLines table created')
                        }
                      callback(null, 'updateFour')              
                    })
              },

              function (callback) {
                for (i = 0; i < DiagrammedEntities.length; i++)                    {
                      query = 'INSERT into DiagrammedEntities(dgeID, entID, entTP, entNM, dgO, level, xLFTP, yLFTP) values (?, ?, ?, ?, ?, ?, ?, ?);'
                      table = [DiagrammedEntities[i].dgeid, DiagrammedEntities[i].entID, DiagrammedEntities[i].entTP, DiagrammedEntities[i].entNM, DiagrammedEntities[i].dgO, DiagrammedEntities[i].level, DiagrammedEntities[i].xLFTP, DiagrammedEntities[i].yLFTP]
                        query = mysql.format(query, table)
                        connection.query(query, function (err, rows)                        {
                          if (err)                        {
                          console.log('error in inserting values in DiagrammedEntities' + err)
                        }                        else {
                          console.log('values inserted in DiagrammedEntities')
                            }
                        })
                    }
                callback(null, 'updateFive')
              },

              function (callback) {
                for (i = 0; i < connectingLinesArray.length; i++)                    {
                      query = 'INSERT into DiagrammedLines(rlnID, rlnTP, OWE, CHL, x1, y1, x2, y2, x3, y3, x4, y4) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);'
                      table = [connectingLinesArray[i].rlnID, connectingLinesArray[i].rlnTP, connectingLinesArray[i].par, connectingLinesArray[i].chld, connectingLinesArray[i].x1, connectingLinesArray[i].y1, connectingLinesArray[i].x2, connectingLinesArray[i].y2, connectingLinesArray[i].x3, connectingLinesArray[i].y3, connectingLinesArray[i].x4, connectingLinesArray[i].y4]
                        query = mysql.format(query, table)
                        connection.query(query, function (err, rows)                        {
                          if (err)
                          {console.log("error in inserting values in DiagrammedLines");}
                          else {
                          console.log('values inserted in DiagrammedLines')
                            }
                        })
                      }
                callback(null, 'updateSix')
              }

            ], function (error, results) { // <--- main callback
              console.log('DiagrammedEntities & DiagrammedLines ready')
              connection.release()
    })


}
