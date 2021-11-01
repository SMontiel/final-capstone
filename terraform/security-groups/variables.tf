variable "name" {
  description = "the name of your stack, e.g. \"demo\""
}

variable "environment" {
  description = "the name of your environment, e.g. \"prod\""
}

variable "vpc_id" {
  description = "The VPC ID"
}

variable "cidr" {
  description = "The CIDR block for the VPC."
  #default     = "10.0.0.0/16"
}

variable "container_port" {
  description = "Ingres and egress port of the container"
}
