provider "aws" {
  region     = var.aws-region
  # version    = "~> 2.0"
}

terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.0"
    }
  }
  backend "s3" {
    bucket  = "smontiel-final-capstone-tf-state-backend"
    encrypt = true
    key     = "terraform.tfstate"
    region  = "us-east-2"
    # dynamodb_table = "terraform-state-lock-dynamo" - uncomment this line once the terraform-state-lock-dynamo has been terraformed
  }
}

module "vpc" {
  source             = "./vpc"
  name               = var.name
  cidr               = var.cidr
  private_subnets    = var.private_subnets
  public_subnets     = var.public_subnets
  availability_zones = var.availability_zones
  environment        = var.environment
}

module "security_groups" {
  source         = "./security-groups"
  name           = var.name
  vpc_id         = module.vpc.id
  cidr           = var.cidr
  environment    = var.environment
  container_port = var.container_port
}

module "alb" {
  source              = "./alb"
  name                = var.name
  vpc_id              = module.vpc.id
  subnets             = module.vpc.public_subnets
  environment         = var.environment
  alb_security_groups = [module.security_groups.alb]
  #alb_tls_cert_arn    = var.tsl_certificate_arn
  health_check_path   = var.health_check_path
}

module "ecr" {
  source      = "./ecr"
  name        = var.name
  environment = var.environment
}

module "ecs" {
  source                      = "./ecs"
  name                        = var.name
  environment                 = var.environment
  region                      = var.aws-region
  subnets                     = module.vpc.private_subnets
  aws_alb_target_group        = module.alb.aws_alb_target_group
  aws_alb_target_group_arn    = module.alb.aws_alb_target_group_arn
  ecs_service_security_groups = [module.security_groups.ecs_tasks]
  container_port              = var.container_port
  container_cpu               = var.container_cpu
  container_memory            = var.container_memory
  service_desired_count       = var.service_desired_count
  container_environment = [
    { name = "LOG_LEVEL",
    value = "DEBUG" },
    { name = "PORT",
    value = var.container_port }
  ]
  container_image = var.container_image
}

output "app_url" {
  value       = module.alb.app_url
  description = "The public ALB DNS"
}

output "aws_region" {
  value       = var.aws-region
  description = "The AWS region"
}

output "aws_ecr_repository_name" {
    value = module.ecr.aws_ecr_repository_name
}

output "aws_ecr_repository_url" {
    value = module.ecr.aws_ecr_repository_url
}

output "aws_ecs_cluster" {
    value = module.ecs.aws_ecs_cluster
}

output "aws_ecs_service" {
    value = module.ecs.aws_ecs_service
}

output "publisher_access_key" {
    value = module.ecs.publisher_access_key
    description = "AWS_ACCESS_KEY to publish to ECR"
}

output "publisher_secret_key" {
    value = module.ecs.publisher_secret_key
    description = "AWS_SECRET_ACCESS_KEY to upload to the ECR"
    sensitive   = true
}
