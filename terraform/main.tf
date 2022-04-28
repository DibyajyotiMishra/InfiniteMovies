provider "aws" {
  region = "ap-south-1"
}

terraform {
  backend "s3" {
    bucket  = "infinite-mvies-terraform-bucket"
    key     = "infinite-mvies.tfstate"
    region  = "ap-south-1"
    encrypt = true
  }
}

locals {
  prefix = "${var.prefix}-${terraform.workspace}"
  common_tags = {
    Environment = terraform.workspace
    Project     = var.project
    ManageBy    = "Terraform"
    Owner       = "Dibyajyoti Mishra"
  }
}
