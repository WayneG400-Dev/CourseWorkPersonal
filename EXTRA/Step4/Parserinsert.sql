--// Debugging with inspector protocol because Node.js v8.9.4 was detected.
--// node --inspect-brk=18283 Step3/index.js 
--// Debugger listening on ws://127.0.0.1:18283/abb2cdb2-7764-4233-915e-f41c21ef0229
--Debugger attached.
--Parsed successfully!
[
  {
    "stnNum": 1,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000100171115     H DEBUG DATEDIT(*YMD) DFTACTGRP(*NO)",
    "opCode": "CT",
    "sVar1": "DEBUG",
    "sVar2": "DATEDIT",
    "sVar3": "DFTACTGRP"
  },
  {
    "stnNum": 2,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000200171115     H OPTION(*SRCSTMT:*NODEBUGIO)",
    "opCode": "CT",
    "sVar1": "OPTION"
  },
  {
    "stnNum": 3,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000300171115     FCONTRACT  UF   E           K DISK",
    "opCode": "FD",
    "mVar": "CONTRACT"
  },
  {
    "stnNum": 4,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000400171115     FCUSTOMER  UF   E           K DISK",
    "opCode": "FD",
    "mVar": "CUSTOMER"
  },
  {
    "stnNum": 5,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000500171115     D                sds",
    "opCode": "FL"
  },
  {
    "stnNum": 6,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000501171115     D@@DAT                  191    198",
    "opCode": "FL",
    "mVar": "@@DAT"
  },
  {
    "stnNum": 7,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000502171115     D@@USR                  254    263",
    "opCode": "FL",
    "mVar": "@@USR"
  },
  {
    "stnNum": 8,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000503171115     D@@TIM                  270    275",
    "opCode": "FL",
    "mVar": "@@TIM"
  },
  {
    "stnNum": 9,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000504171115     d@@PGM                  334    343",
    "opCode": "FL",
    "mVar": "@@PGM"
  },
  {
    "stnNum": 10,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000505171115     dTEXT1            C                   'Expiry Date Reached'",
    "opCode": "FL",
    "mVar": "TEXT1",
    "sVar1": "'Expiry Date Reached'"
  },
  {
    "stnNum": 11,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000506171115     dTEXT2            C                   'Contract ID:'",
    "opCode": "FL",
    "mVar": "TEXT2",
    "sVar1": "'Contract ID:'"
  },
  {
    "stnNum": 12,
    "stnDate": "2017-11-15",
    "stntyp": "D",
    "stn": "000507171115     dcurdate          S                   like(COEXPIRE)",
    "opCode": "FL",
    "mVar": "curdate",
    "sVar1": "COEXPIRE"
  },
  {
    "stnNum": 13,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "001200171115     C     *ENTRY        PLIST",
    "opCode": "PLIST",
    "sVar1": "*ENTRY"
  },
  {
    "stnNum": 14,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "001300171115     C                   PARM                    @@RTN             1",
    "opCode": "PARM",
    "mVar": "@@RTN"
  },
  {
    "stnNum": 15,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "001601171115     C     *loval        SETLL     CONTRACT",
    "opCode": "SETLL",
    "sVar1": "*loval",
    "sVar2": "CONTRACT"
  },
  {
    "stnNum": 16,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "001700171115     C                   READ      CONTRACT                             4444",
    "opCode": "READ",
    "sVar1": "CONTRACT"
  },
  {
    "stnNum": 17,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "001701171115     C     *IN44         DOWEQ     '0'                                      ",
    "opCode": "DOWEQ",
    "sVar1": "*IN44",
    "sVar2": "'0'"
  },
  {
    "stnNum": 18,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "002001171115     C                   EVAL      CURDATE = %date()",
    "opCode": "ASS",
    "mVar": "CURDATE"
  },
  {
    "stnNum": 19,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "002200171115     C     CURDATE       IFGT      COEXPIRE",
    "opCode": "IFGT",
    "sVar1": "CURDATE",
    "sVar2": "COEXPIRE"
  },
  {
    "stnNum": 20,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "002500171115     C                   EVAL      COSTS = ' E'",
    "opCode": "ASS",
    "mVar": "COSTS",
    "sVar1": "' E'"
  },
  {
    "stnNum": 21,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "002501171115     c     CONOTE        CAT       TEXT1         CONOTE",
    "opCode": "CAT",
    "mVar": "CONOTE",
    "sVar1": "CONOTE",
    "sVar2": "TEXT1"
  },
  {
    "stnNum": 22,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "002502171115     C                   MOVE      @@USR         COAUUUSR",
    "opCode": "MOVE",
    "mVar": "COAUUUSR",
    "sVar1": "@@USR"
  },
  {
    "stnNum": 23,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "002600171115     C                   eval      COAUUSTP = %timestamp()",
    "opCode": "ASS",
    "mVar": "COAUUSTP"
  },
  {
    "stnNum": 24,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "002800171115     C                   UPDATE    CONTRACTF",
    "opCode": "UPDATE",
    "sVar1": "CONTRACTF"
  },
  {
    "stnNum": 25,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "003100171115     C                   EXSR      $UPCUS",
    "opCode": "EXSR",
    "sVar1": "$UPCUS"
  },
  {
    "stnNum": 26,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "003400171115     C                   ENDIF",
    "opCode": "ENDIF"
  },
  {
    "stnNum": 27,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "003500171115     C                   READ      CONTRACT                                 ",
    "opCode": "READ",
    "sVar1": "CONTRACT"
  },
  {
    "stnNum": 28,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "003800171115     C                   ENDDO",
    "opCode": "ENDDO"
  },
  {
    "stnNum": 29,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "004100171115     C                   SETON                                        LR",
    "opCode": "SETON"
  },
  {
    "stnNum": 30,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "004200171115     C                   RETURN",
    "opCode": "RETURN"
  },
  {
    "stnNum": 31,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "004600171115     C     $UPCUS        BEGSR",
    "opCode": "BEGSR",
    "sVar1": "$UPCUS"
  },
  {
    "stnNum": 32,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005100171115     C     COCUID        CHAIN     CUSTOMER                             5",
    "opCode": "CHAIN",
    "sVar1": "COCUID",
    "sVar2": "CUSTOMER"
  },
  {
    "stnNum": 33,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005200171115     C     *IN50         IFEQ      '1'",
    "opCode": "IFEQ",
    "sVar1": "*IN50",
    "sVar2": "'1'"
  },
  {
    "stnNum": 34,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005201171115     C                   MOVE      COCOID        WCHARID          10",
    "opCode": "MOVE",
    "mVar": "WCHARID",
    "sVar1": "COCOID"
  },
  {
    "stnNum": 35,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005202171115     c     TEXT2         CAT       WCHARID       CUNOTE",
    "opCode": "CAT",
    "mVar": "CUNOTE",
    "sVar1": "TEXT2",
    "sVar2": "WCHARID"
  },
  {
    "stnNum": 36,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005203171115     c     CUNOTE        CAT       TEXT1         CUNOTE",
    "opCode": "CAT",
    "mVar": "CUNOTE",
    "sVar1": "CUNOTE",
    "sVar2": "TEXT1"
  },
  {
    "stnNum": 37,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005204171115     C                   EVAL      CUSTS  = COSTS",
    "opCode": "ASS",
    "mVar": "CUSTS",
    "sVar1": "COSTS"
  },
  {
    "stnNum": 38,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005300171115     C                   EVAL      CUUUSR = COAUUUSR",
    "opCode": "ASS",
    "mVar": "CUUUSR",
    "sVar1": "COAUUUSR"
  },
  {
    "stnNum": 39,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005400171115     C                   EVAL      CUUDAT = *DATE",
    "opCode": "ASS",
    "mVar": "CUUDAT",
    "sVar1": "*DATE"
  },
  {
    "stnNum": 40,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005500171115     C                   TIME                    CUUTIM",
    "opCode": "TIME",
    "mVar": "CUUTIM"
  },
  {
    "stnNum": 41,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005600171115     C                   UPDATE    CUSTF",
    "opCode": "UPDATE",
    "sVar1": "CUSTF"
  },
  {
    "stnNum": 42,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005700171115     C                   ENDIF",
    "opCode": "ENDIF"
  },
  {
    "stnNum": 43,
    "stnDate": "2017-11-15",
    "stnTyp": "C",
    "stn": "005900171115     C                   ENDSR",
    "opCode": "ENDSR"
  }
]
