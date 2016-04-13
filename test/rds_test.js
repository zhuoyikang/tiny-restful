Rds = require('../rds');

Rds.RAdd("r1", 1, 'a', {"name":"a"});
Rds.RAdd("r1", 2, 'b', {"name":"b"});
Rds.RAdd("r1", 2, 'c', {"name":"c"});
Rds.RAdd("r1", 3, 'd', {"name":"d"});
Rds.RAdd("r1", 4, 'e', {"name":"e"});
Rds.RAdd("r1", 5, 'f', {"name":"f"});
Rds.RAdd("r1", 6, 'g', {"name":"g"});
Rds.RAdd("r1", 6, 'h', {"name":"h"});

// Rds.HMGet("r1_hash", [ 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a' ], function(err, response) {
//      console.log(response)
// })

Rds.RRange("r1", 0, -1, function(err, response) {
    console.log("response", response)
})



//Rds.Quit();
