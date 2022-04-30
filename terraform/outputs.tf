output "infinite-movies-bucket-name" {
  value = aws_s3_bucket.infinite-mvies-terraform-bucket.id
}

output "cloudfront-distribution-id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}
  
