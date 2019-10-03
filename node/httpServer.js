var spawn   = require('child_process').spawn;
var express = require('express');
var app     = express();
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

async function myquery(){
  try {
    const response = await client.search({
        index: "amazon_products",
        body: {
          "query": {
            "bool": {
              "must_not": {
                "range": {
                  "price": {
                    "gte": 10,
                    "lte": 20
                  }
                }
              }
            }
          }
        }
    });
    console.log(response.hits.hits)
  } catch (error) {
    console.trace(error.message)
  }
}
myquery()


app.use(express.static(__dirname));

app.get('/colorsRequest', function(req, res) {
  var command = spawn(__dirname + '/run.sh', [ req.query.color || '' ]);
  var output  = [];
  console.log('aas');
  
  command.stdout.on('data', function(chunk) {
    output.push(chunk); 
  }); 



  command.on('close', function(code) {
    if (code === 0)
      {console.log('aa');
      res.send(Buffer.concat(output));}
    else
      { console.log('bb');
      res.send(500); // when the script fails, generate a Server Error HTTP response
      }
  });
});

app.listen(3000);



// legacy version elasticsearch for node js // //
// https://www.npmjs.com/package/elasticsearch // //
// var elasticsearch = require('elasticsearch');
// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });

// client.ping({
//   // ping usually has a 3000ms timeout
//   requestTimeout: 1000
// }, function (error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// try {
//   const response = client.search({
//       method: "GET",
//       index: "bigginsight",
//       "query": {
//         "bool": {
//           "must": [
//             {
//               "term": {
//                 "customer": "Linkedin"
//               }
//             },
//             {
//               "range": {
//                 "time": {
//                   "gte": 1506257800000,
//                   "lte": 1506314200000
//                 }
//               }
//             }
//           ]
//         }
//       },
//       "aggs": {
//         "by_users": {
//           "terms": {
//             "field": "username"
//           },
//           "aggs": {
//             "total_usage": {
//               "sum": {
//                 "field": "usage"
//               }
//             }
//           }
//         }
//       }
    
//   });
//   console.log(response)
// } catch (error) {
//   console.trace(error.message)
// }

// const response = client.search({
//   index: 'biginsight',
//   type: 'tweets',
//   body: {
//     query: {
//       match: {
//         body: 'elasticsearch'
//       }
//     }
//   }
// })

// const { Client: Client7 } = require('es7')
 
// const client = new Client7({ node: 'http://localhost:9200' })
// // // promise API
// client.ping()


// async function makeQuery(q) {
//   try {
//     const result = await client.search({
//         index: 'my-index',
//         body: { foo: 'bar' }
//     });
//     console.log(result)
//   }catch (err) {
//     console.error(err)
//   }
// }

// makeQuery('pants')
// // callback API
// // client.search({
// //   index: 'my-index',
// //   body: { foo: 'bar' }
// // }, (err, result) => {
// //   if (err) console.log(err)
// // })


// // async function makeQuery(q) {
// //   try {
// //     const response = await client.search({q: pants})
// //     console.log(response.hits)
// //   } catch (err) {
// //     console.error(err)
// //   }
// // }