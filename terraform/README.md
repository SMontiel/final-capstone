# Terraform

terraform init
terraform apply -auto-approve

gh secret set AWS_ACCESS_KEY_ID -b $(terraform output -raw publisher_access_key)
gh secret set AWS_SECRET_ACCESS_KEY -b $(terraform output -raw publisher_secret_key)
gh secret set AWS_REGION -b $(terraform output -raw aws_region)
gh secret set ECR_REPOSITORY_NAME -b $(terraform output -raw ecr_repository_name)
gh secret set ECS_CLUSTER -b $(terraform output -raw ecs_cluster)
gh secret set ECS_SERVICE -b $(terraform output -raw ecs_service)
