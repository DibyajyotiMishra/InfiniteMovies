###################################
###### Terraform S3 Module  #######
###################################

resource "aws_s3_bucket" "infinite-mvies-terraform-bucket" {
  bucket        = local.prefix
  acl           = "public-read"
  force_destroy = true

  # Inline policy

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "PublicReadGetObject",
          "Action": [
                  "s3:GetObject"
          ],
          "Effect": "Allow",
          "Resource": "arn:aws:s3:::${local.prefix}/*",
          "Principal": "*"
      }
  ]
}
EOF

  # ---------------------------------------------------------------------

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }

  tags = local.common_tags
}

# Seperate Resource

# resource "aws_s3_bucket_policy" "infinite-mvies-terraform-bucket-policy" {
#   bucket = aws_s3_bucket.infinite-movies-s3-bucket.id
#   policy = <<POLICY
#     {
#         "Version": "2012-10-17",
#           "Statement": [
#               {
#                   "Sid": "PublicReadGetObject",
#                   "Action": [
#                       "s3:GetObject"
#                   ],
#                   "Effect": "Allow",
#                   "Resource": "arn:aws:s3:::${local.prefix}/*"
#                   "Principal": "*"
#               }
#           ]
#     }
#     POLICY
# }
