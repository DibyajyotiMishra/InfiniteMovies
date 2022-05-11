###################################
###### Terraform S3 Module  #######
###################################

resource "aws_s3_bucket" "infinite-mvies-terraform-bucket" {
  bucket        = local.prefix
  force_destroy = true
  tags          = local.common_tags
}

resource "aws_s3_bucket_versioning" "infinite-mvies-terraform-bucket" {
  bucket = local.prefix
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "infinite-mvies-terraform-bucket" {
  bucket = local.prefix

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}


resource "aws_s3_bucket_acl" "infinite-mvies-terraform-bucket" {
  bucket = local.prefix
  acl    = "public-read"
}

# Seperate Resource

resource "aws_s3_bucket_policy" "infinite-mvies-terraform-bucket-policy" {
  bucket = local.prefix
  policy = <<POLICY
    {
        "Version": "2012-10-17",
          "Statement": [
              {
                  "Sid": "PublicReadGetObject",
                  "Action": [
                      "s3:GetObject"
                  ],
                  "Effect": "Allow",
                  "Resource": "arn:aws:s3:::${local.prefix}/*"
                  "Principal": "*"
              }
          ]
    }
    POLICY
}
