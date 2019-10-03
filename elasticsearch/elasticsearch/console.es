GET _search
{
  "query": {
    "match_all": {}
  }
}


PUT /catalog/product/
{
  "sku": "SP000001",
  "title": "Elasticsearch for Hadoop",
  "description": "Elasticsearch for Hadoop",
  "author": "Vishal Shukla",
  "ISBN": "1785288997",
  "price": 26.99
}


PUT /catalog/product/2
{
  "sku": "SP000002",
  "title": "Google Pixel Phone 32GB - 5 inch display",
  "description": "Google Pixel Phone 32GB - 5 inch display (Factory Unlocked US Version)",
  "price": 400,
  "resolution": "1440 x 2560 pixels",
  "os": "Android 7.1"
}

HEAD /catalog/_mapping/product

GET /catalog/_mapping


POST /catalog/product
{
  "sku": "SP000003",
  "title": "Mastering Elasticsearch",
  "description": "Mastering Elasticsearch",
  "author": "Bharvi Dixit",
  "price": 54.99
}

GET /catalog
GET /catalog/product/_search
GET /catalog/product/KejORWwB0Y4MK221WiEV

POST /catalog/product/1/_update
{
  "doc": {
    "price": "28.59"
  }
}

POST /catalog/product/5/_update
{
  "doc": {
    "author": "Albert Paro",
    "title": "Elasticsearch 5.0 Cookbook",
    "description": "Elasticsearch 5.0 Cookbook Third Edition",
    "price": "54.99"
  },
  "doc_as_upsert": true
}

POST /catalog/product/KejORWwB0Y4MK221WiEV/_update
{
  "script": {
    "inline": "ctx._source.price += params.increment",
    "lang": "painless",
    "params": {
      "increment": 2
    }
  }
}


DELETE /catalog/product/KujORWwB0Y4MK221XCHF

PUT /catalog
{
  "settings": {
    "index": {
      "number_of_shards": 5,
      "number_of_replicas": 2
    }
  }
}

PUT /catalog/_mapping
{
  "properties": {
    "name": {
      "type": "text"
    }
  }
}


#DELETE  /cataloge
#PUT /cataloge
#{
#  "mappings": {
#    "properties": {
#      "name": {
#        "type": "text"
#      }
#    }
#  }
#}
#
#PUT twitter 
#{}
#PUT twitter/_mapping/_doc 
#{
#  "properties": {
#    "email": {
#      "type": "keyword"
#    }
#  }
#}
PUT /cataloge/_mapping
{
  "properties": {
    "name": {
      "type": "text"
    }
  }
}


POST /cataloge/category
{
  "name": "books"
}
POST /cataloge/category
{
  "name": "phones"
}

POST /cataloge/category
{
  "name": "music",
  "description": "On-demand streaming music"
}
GET /cataloge
GET /cataloge/category/_search


PUT /cataloge/_mapping
{
  "properties": {
    "code": {
      "type": "keyword"
    }
  }
}

POST /cataloge/category
{
"name": "sports",
"code": "C004",
"description": "Sports equipment"
}




GET /_search
GET /catalog,notindex/_search
GET /catalog,cataloge/_search
GET /_all/product/_search



################################
# CHAPTER 3
################################



POST _analyze
{
"tokenizer": "standard",
"text": "Tokenizer breaks characters into tokens!"
}


PUT /index_standard_analyzer
{
  "settings": {
    "analysis": {
      "analyzer": {
        "std": {
          "type": "standard"
        }
      }
    }
  },
  "mappings": {
      "properties": {
        "my_text": {
          "type": "text",
          "analyzer": "std"
        }
      }
  }
}

POST index_standard_analyzer/_analyze
{
  "field": "my_text",
  "text": "The Standard Analyzer works this way."
}

PUT index_standard_analyzer_english_stopwords
{
  "settings": {
    "analysis": {
      "analyzer": {
        "std": {
          "type": "standard",
          "stopwords": "_english_"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "my_text": {
        "type": "text",
        "analyzer": "std"
      }
    }
  }
}

POST index_standard_analyzer_english_stopwords/_analyze
{
  "field": "my_text",
  "text": "The Standard Analyzer works this way."
}

GET /_analyze
{
  "text": "Learning Elastic Stack 6",
  "analyzer": "standard"
}

PUT /custom_analyzer_index
{
  "settings": {
    "index": {
      "analysis": {
        "analyzer": {
          "custom_analyzer": {
            "type": "custom",
            "tokenizer": "standard",
            "filter": [
              "lowercase",
              "custom_edge_ngram"
            ]
          }
        },
        "filter": {
          "custom_edge_ngram": {
            "type": "edge_ngram",
            "min_gram": 2,
            "max_gram": 10
          }
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "product": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "search_analyzer": "standard"
      }
    }
  }
}

POST /custom_analyzer_index/_doc
{
"product": "Learning Elastic Stack 6"
}
POST /custom_analyzer_index/_doc
{
"product": "Mastering Elasticsearch"
}

GET /custom_analyzer_index/_search
{
  "query": {
    "match": {
      "product": "el"
    }
  }
}

############

PUT /amazon_products
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0,
    "analysis": {
      "analyzer": {}
    }
  },
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "title": {
        "type": "text"
      },
      "description": {
        "type": "text"
      },
      "manufacturer": {
        "type": "text",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      "price": {
        "type": "scaled_float",
        "scaling_factor": 100
      }
    }
  }
}

GET /amazon_products/_search

GET /amazon_products/_search
{
  "query": {
    "match_all": {}
  }
}

GET /amazon_products/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 10,
        "lte": 20
      }
    }
  }
}

GET /amazon_products/_search
{
  "from": 0,
  "size": 10,
  "query": {
    "range": {
      "price": {
        "gte": 10,
        "lte": 20,
        "boost": 2.2
      }
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "exists": {
      "field": "description"
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "term": {
      "manufacturer.raw": "victory multimedia"
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "manufacturer.raw": "victory multimedia"
        }
      }
    }
  }
}
GET /amazon_products/_search
{
    "query": {
        "match": {
            "manufacturer.raw": "victory multimedia"
        }
    }
}
GET /amazon_products/_search
{
  "query": {
    "match": {
      "manufacturer": "victory multimedia"
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "match": {
      "manufacturer": {
        "query": "victory multimedia",
        "operator": "and"
      }
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "match": {
      "manufacturer": {
        "query": "victory multimedia",
        "minimum_should_match": 2
      }
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "match": {
      "manufacturer": {
        "query": "victor multimedia",
        "fuzziness": 1
      }
    }
  }
}
GET /amazon_products/_search
{
  "query": {
    "match": {
      "manufacturer": {
        "query": "victer multimedia",
        "fuzziness": 2
      }
    }
  }
}


GET /amazon_products/_search
{
  "query": {
    "match_phrase": {
      "description": {
        "query": "real video saltware aquarium"
      }
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "match_phrase": {
      "description": {
        "query": "real video aquarium",
        "slop": 1
      }
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "multi_match": {
      "query": "monitor aquarium",
      "fields": [
        "title",
        "description"
      ]
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "multi_match": {
      "query": "monitor aquarium",
      "fields": [
        "title^3",
        "description"
      ]
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "manufacturer.raw": "victory multimedia"
        }
      }
    }
  }
}

GET /amazon_products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "manufacturer.raw": "victory multimedia"
        }
      },
      "boost": 1.2
    }
  }
}

#################

GET /amazon_products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "bool": {
          "should": [
            {
              "range": {
                "price": {
                  "gte": 10,
                  "lte": 13
                }
              }
            },
            {
              "term": {
                "manufacturer.raw": {
                  "value": "valuesoft"
                }
              }
            }
          ]
        }
      }
    }
  }
}
GET /amazon_products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "bool": {
          "must": [
            {
              "range": {
                "price": {
                  "gte": 10,
                  "lte": 30
                }
              }
            }
          ],
          "should": [
            {
              "term": {
                "manufacturer.raw": {
                  "value": "valuesoft"
                }
              }
            },
            {
              "term": {
                "manufacturer.raw": {
                  "value": "pinnacle"
                }
              }
            }
          ]
        }
      }
    }
  }
}

GET /amazon_products/products/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "bool": {
          "must": [
            {
              "range": {
                "price": {
                  "gte": 10,
                  "lte": 20
                }
              }
            }
          ],
          "must_not": [
            {
              "term": {
                "manufacturer.raw": "encore"
              }
            }
          ]
        }
      }
    }
  }
}

GET /amazon_products/_search
{
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




########################################
#  CHAPTER 4
########################################

PUT /bigginsight
{
  "settings": {
    "index": {
      "number_of_replicas": "1",
      "number_of_shards": "5"
    }
  },
  "mappings": {
      "properties": {
        "accessPointId": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "application": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "band": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "bandwidth": {
          "type": "double"
        },
        "category": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "customer": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "department": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "downloadCurrent": {
          "type": "double"
        },
        "downloadTotal": {
          "type": "integer"
        },
        "inactiveMs": {
          "type": "integer"
        },
        "location": {
          "type": "geo_point"
        },
        "mac": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "networkId": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "signalStrength": {
          "type": "integer"
        },
        "time": {
          "type": "date",
          "format": "strict_date_optional_time||epoch_millis"
        },
        "uploadCurrent": {
          "type": "double"
        },
        "uploadTotal": {
          "type": "integer"
        },
        "usage": {
          "type": "double"
        },
        "username": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        }
      }
    }
  }
}

GSTPUT /bigginsight
{
  "settings": {
    "index": {
      "number_of_replicas": "1",
      "number_of_shards": "5"
    }
  },
  "mappings": {
      "properties": {
        "accessPointId": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "application": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "band": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "bandwidth": {
          "type": "double"
        },
        "category": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "customer": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "department": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "downloadCurrent": {
          "type": "double"
        },
        "downloadTotal": {
          "type": "integer"
        },
        "inactiveMs": {
          "type": "integer"
        },
        "location": {
          "type": "geo_point"
        },
        "mac": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "networkId": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "signalStrength": {
          "type": "integer"
        },
        "time": {
          "type": "date",
          "format": "strict_date_optional_time||epoch_millis"
        },
        "uploadCurrent": {
          "type": "double"
        },
        "uploadTotal": {
          "type": "integer"
        },
        "usage": {
          "type": "double"
        },
        "username": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        }
      }
    }
  }
}PUT /bigginsight
{
  "settings": {
    "index": {
      "number_of_replicas": "1",
      "number_of_shards": "5"
    }
  },
  "mappings": {
      "properties": {
        "accessPointId": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "application": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "band": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "bandwidth": {
          "type": "double"
        },
        "category": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "customer": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "department": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "downloadCurrent": {
          "type": "double"
        },
        "downloadTotal": {
          "type": "integer"
        },
        "inactiveMs": {
          "type": "integer"
        },
        "location": {
          "type": "geo_point"
        },
        "mac": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "networkId": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        },
        "signalStrength": {
          "type": "integer"
        },
        "time": {
          "type": "date",
          "format": "strict_date_optional_time||epoch_millis"
        },
        "uploadCurrent": {
          "type": "double"
        },
        "uploadTotal": {
          "type": "integer"
        },
        "usage": {
          "type": "double"
        },
        "username": {
          "type": "keyword",
          "fields": {
            "analyzed": {
              "type": "text"
            }
          }
        }
      }
    }
  }
}



GET /bigginsight/_search

GET bigginsight/_search
{
  "aggregations": {
    "download_sum": {
      "sum": {
        "field": "downloadTotal"
      }
    }
  },
  "size": 0
}

GET bigginsight/_search
{
  "aggregations": {
    "download_average": {
      "avg": {
        "field": "downloadTotal"
      }
    }
  },
  "size": 0
}

GET bigginsight/_search
{
  "aggregations": {
    "download_min": {
      "min": {
        "field": "downloadTotal"
      }
    }
  },
  "size": 0
}

GET bigginsight/_search
{
  "aggregations": {
    "download_max": {
      "max": {
        "field": "downloadTotal"
      }
    }
  },
  "size": 0
}

GET bigginsight/_search
{
  "aggregations": {
    "download_stats": {
      "stats": {
        "field": "downloadTotal"
      }
    }
  },
  "size": 0
}

GET bigginsight/_search
{
  "aggregations": {
    "download_estats": {
      "extended_stats": {
        "field": "downloadTotal"
      }
    }
  },
  "size": 0
}

GET bigginsight/_search
{
  "aggregations": {
    "download_estats": {
      "extended_stats": {
        "field": "downloadTotal"
      }
    }
  },
  "size": 0
}

GET bigginsight/_search
{
  "aggregations": {
    "unique_visitors": {
      "cardinality": {
        "field": "username"
      }
    }
  },
  "size": 0
}

GET /bigginsight/_search
{
  "aggs": {
    "byCategory": {
      "terms": {
        "field": "category"
      }
    }
  },
  "size": 0
}

GET /bigginsight/_search?size=0
{
  "aggs": {
    "byApplication": {
      "terms": {
        "field": "application"
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "aggs": {
    "byApplication": {
      "terms": {
        "field": "application",
        "size": 15
      }
    }
  }
}


##############  NOT YET LEARNED
###### Bucketing on numeric data

POST /bigginsight/_search?size=0
{
  "aggs": {
    "by_usage": {
      "histogram": {
        "field": "usage",
        "interval": 1000
      }
    }
  }
}

POST /bigginsight/_search?size=0
{
  "aggs": {
    "by_usage": {
      "range": {
        "field": "usage",
        "ranges": [
          {
            "to": 1024
          },
          {
            "from": 1024,
            "to": 102400
          },
          {
            "from": 102400
          }
        ]
      }
    }
  }
}

POST /bigginsight/_search?size=0
{
  "aggs": {
    "by_usage": {
      "range": {
        "field": "usage",
        "ranges": [
          {
            "key": "Upto 1 kb",
            "to": 1024
          },
          {
            "key": "1 kb to 100 kb",
            "from": 1024,
            "to": 102400
          },
          {
            "key": "100 kb and more",
            "from": 102400
          }
        ]
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "query": {
    "term": {
      "customer": "Linkedin"
    }
  },
  "aggs": {
    "byCategory": {
      "terms": {
        "field": "category"
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "customer": "Linkedin"
          }
        },
        {
          "range": {
            "time": {
              "gte": 1506277800000,
              "lte": 1506294200000
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "byCategory": {
      "terms": {
        "field": "category"
      }
    }
  }
}

GET /bigginsight/_search

GET /bigginsight/_search?size=0
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "customer": "Linkedin"
          }
        },
        {
          "range": {
            "time": {
              "gte": 1506257800000,
              "lte": 1506314200000
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "by_users": {
      "terms": {
        "field": "username"
      },
      "aggs": {
        "total_usage": {
          "sum": {
            "field": "usage"
          }
        }
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "customer": "Linkedin"
          }
        },
        {
          "range": {
            "time": {
              "gte": 1506257800000,
              "lte": 1506314200000
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "by_users": {
      "terms": {
        "field": "username",
        "order": {
          "total_usage": "desc"
        }
      },
      "aggs": {
        "total_usage": {
          "sum": {
            "field": "usage"
          }
        }
      }
    }
  }
}




GET /bigginsight/_search?size=0
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "customer": "Linkedin"
          }
        },
        {
          "range": {
            "time": {
              "gte": 1506257800000,
              "lte": 1506314200000
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "by_departments": {
      "terms": {
        "field": "department"
      },
      "aggs": {
        "by_users": {
          "terms": {
            "field": "username",
            "size": 2,
            "order": {
              "total_usage": "desc"
            }
          },
          "aggs": {
            "total_usage": {
              "sum": {
                "field": "usage"
              }
            }
          }
        }
      }
    }
  }
}


POST /bigginsight/_search?size=0
{
  "aggs": {
    "chat": {
      "filter": {
        "term": {
          "category": "Chat"
        }
      }
    }
  }
}


GET bigginsight/_search?size=0
{
  "aggs": {
    "messages": {
      "filters": {
        "filters": {
          "chat": {
            "match": {
              "category": "Chat"
            }
          },
          "skype": {
            "match": {
              "application": "Skype"
            }
          },
          "other_than_skype": {
            "bool": {
              "must": {
                "match": {
                  "category": "Chat"
                }
              },
              "must_not": {
                "match": {
                  "application": "Skype"
                }
              }
            }
          }
        }
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "aggs": {
    "counts_over_time": {
      "date_histogram": {
        "field": "time",
        "interval": "1d"
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "aggs": {
    "counts_over_time": {
      "date_histogram": {
        "field": "time",
        "interval": "1d",
        "time_zone": "+05:30"
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "query": {
    "term": {
      "customer": "Linkedin"
    }
  },
  "aggs": {
    "counts_over_time": {
      "date_histogram": {
        "field": "time",
        "interval": "1d",
        "time_zone": "+05:30"
      },
      "aggs": {
        "total_bandwidth": {
          "sum": {
            "field": "usage"
          }
        }
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "customer": "Linkedin"
          }
        },
        {
          "range": {
            "time": {
              "gte": 1506277800000
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "counts_over_time": {
      "date_histogram": {
        "field": "time",
        "interval": "1h",
        "time_zone": "+05:30"
      },
      "aggs": {
        "hourly_usage": {
          "sum": {
            "field": "usage"
          }
        }
      }
    }
  }
}

GET bigginsight/_search?size=0
{
  "aggs": {
    "within_radius": {
      "geo_distance": {
        "field": "location",
        "origin": {
          "lat": 23.102869,
          "lon": 72.595692
        },
        "ranges": [
          {
            "to": 5
          }
        ]
      }
    }
  }
}

GET bigginsight/_search?size=0
{
  "aggs": {
    "within_radius": {
      "geo_distance": {
        "field": "location",
        "origin": {
          "lat": 23.102869,
          "lon": 72.595692
        },
        "ranges": [
          {
            "from": 5,
            "to": 10
          }
        ]
      }
    }
  }
}

GET bigginsight/_search?size=0
{
  "aggs": {
    "geo_hash": {
      "geohash_grid": {
        "field": "location",
        "precision": 7
      }
    }
  }
}

GET /bigginsight/_search?size=0
{
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "customer": "Linkedin"
          }
        },
        {
          "range": {
            "time": {
              "gte": 1506277800000
            }
          }
        }
      ]
    }
  },
  "aggs": {
    "counts_over_time": {
      "date_histogram": {
        "field": "time",
        "interval": "1h",
        "time_zone": "+05:30"
      },
      "aggs": {
        "hourly_usage": {
          "sum": {
            "field": "usage"
          }
        },
        "cumulative_hourly_usage": {
          "cumulative_sum": {
            "buckets_path": "hourly_usage"
          }
        }
      }
    }
  }
}


####################










