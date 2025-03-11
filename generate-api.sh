#!/bin/bash

# Define variables
API_URL="https://localhost:7263/swagger/v1/swagger.json"  # Update the port if needed
OUTPUT_FILE="openapi.json"
GENERATOR_OUTPUT_DIR="src/app/api"

# Download OpenAPI JSON
echo "Cleaning up previous API client..."
rm -rf $GENERATOR_OUTPUT_DIR
echo "Downloading OpenAPI JSON..."
curl -s -o $OUTPUT_FILE $API_URL

if [ $? -ne 0 ]; then
  echo "Failed to download OpenAPI JSON"
  exit 1
fi

echo "Generating Angular API client..."
npx @openapitools/openapi-generator-cli generate -i $OUTPUT_FILE -g typescript-angular -o $GENERATOR_OUTPUT_DIR --additional-properties=apiModulePrefix=Api

echo "API client generated successfully in $GENERATOR_OUTPUT_DIR"
