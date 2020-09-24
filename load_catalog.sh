curl -H 'Content-Type: application/x-ndjson' \
     -XPOST 'localhost:9500/product_assembly_catalog/_bulk?pretty&refresh' \
     --data-binary @"westelm_catalog.json"
