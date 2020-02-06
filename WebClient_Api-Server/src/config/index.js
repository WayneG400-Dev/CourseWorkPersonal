export default {
  // MYSQL DEFAULTS - Local Instance //
  MYSQL_HOST: 'localhost', // Change to LOCAL MYSQL Details
  MYSQL_PORT: 3306, // Change to LOCAL MYSQL Details
  MYSQL_USER: 'user', // Change to LOCAL MYSQL Details
  MYSQL_PASSWORD: 'password', // Change to LOCAL MYSQL Details
  MYSQL_DATABASE: 'TEST_APP', // Location of the Application Files
  MYSQL_SCHEMA: 'TEST_METADB', // Location of the META Details
  MYSQL_MULTI: false, // Use only if Required
  MYSQL_DEBUG: false, // Use only if Required
  // Server Configs //
  SRV_PORT: 5000, // Port on which the API-Server should listen
  SRV_BASE: '/api', // Base URI Route for all Requests
  BODY_LIMIT: '1mb', // Default Max size of Request Body
  // DEBUGGING + LOGGING OVERRIDE //
  DEBUG_ALL: false, // Sets all Debugs to :true
  DEBUG_LOG: false, // Creates Request and Response Log Entries
  // LOGGING DEFAULTS //
  LOG_DIR: './log',
  AUTO_LOG: true, // Creates Access  Log Entries
  AUTO_LOG_ROTATION_INTERVAL: '1d', // rotate daily:ALTERNATIVES - '5s':rotates every X seconds- '5m':rotates every X minutes- '5h':rotates every X hours
  AUTO_LOG_ROTATION_SIZE: '10M', // Rotate Log when > Size :ALTERNATIVES 'B': Bites -'K': KiloBites - 'M': MegaBytes - 'G': GigaBytes
  // APP DEFAULTS //
  VALID_NAMES: ['CUSTOMERL'],
  VALID_REL_ID: [0],
  RESP_OBJ_TITLE: false
}
