output "aws_ecs_cluster" {
    value = aws_ecs_cluster.main.name
}

output "aws_ecs_service" {
    value = aws_ecs_service.main.name
}

output "publisher_access_key" {
  value       = aws_iam_access_key.publisher.id
  description = "AWS_ACCESS_KEY to publish to ECR"
}

output "publisher_secret_key" {
  value       = aws_iam_access_key.publisher.secret
  description = "AWS_SECRET_ACCESS_KEY to upload to the ECR"
  sensitive   = true
}
