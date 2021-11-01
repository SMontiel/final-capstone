output "app_url" {
  value = aws_lb.main.dns_name
}

output "aws_alb_target_group" {
  value = aws_alb_target_group.main
}

output "aws_alb_target_group_arn" {
  value = aws_alb_target_group.main.arn
}
