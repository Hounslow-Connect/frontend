#!/usr/bin/env bash

# Requires the following environment variables:
# $ENVIRONMENT = The environment (production/release/staging).
# $AWS_ACCESS_KEY_ID = The AWS access key.
# $AWS_SECRET_ACCESS_KEY = The AWS secret access key.
# $AWS_DEFAULT_REGION = The AWS region.
# $S3_BUCKET_NAME = The S3 bucket to deploy to.
# $DISTRIBUTION_ID = The CloudFront distribution to invalidate.

# Bail out on first error.
set -e

# Declare the configuration variables for the deployment.
echo "Setting deployment configuration for ${ENVIRONMENT}..."
ENV_SECRET_ID=".env.frontend.${ENVIRONMENT}"

# Get the .env file.
echo "Downloading .env file..."
rm -f .env
aws secretsmanager get-secret-value \
    --secret-id ${ENV_SECRET_ID} | \
    python -c "import json,sys;obj=json.load(sys.stdin);print(obj['SecretString']);" > .env
# Build.
echo "Building..."
npm run build

# Deploy to S3.
echo "Deploying..."
aws s3 sync build/ "s3://${S3_BUCKET_NAME}" --acl public-read --delete
aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "/*"
