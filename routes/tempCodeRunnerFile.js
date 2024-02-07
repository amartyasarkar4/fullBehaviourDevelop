Todo.aggregate([
        {
            "$search":{
                // "compound":{
                //     "must":{
                //         "equals":{
                //             "path":"behav",
                //             "value":{behavName}
                //         }
                //     }
                // }
                "queryString": {
                    "defaultPath": "behav",
                    "query": `${behavName}`
                }
            }
        }
    ])