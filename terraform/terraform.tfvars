name                  = "smontiel-capstone"
environment           = "production"
aws-region            = "us-east-2"
availability_zones    = ["us-east-2a", "us-east-2b", "us-east-2c"]
cidr                  = "10.0.0.0/16"
private_subnets       = ["10.0.0.0/20", "10.0.32.0/20", "10.0.64.0/20"]
public_subnets        = ["10.0.16.0/20", "10.0.48.0/20", "10.0.80.0/20"]
container_image       = "smontiel-capstone-container-production"
container_port        = 80
container_cpu         = 256
container_memory      = 512
service_desired_count = 2
health_check_path     = "/health"

# rds_private_subnet  = "10.0.96.0/20"
# tsl_certificate_arn = "mycertificatearn"
