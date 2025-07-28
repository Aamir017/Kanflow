variable "aws_region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "ami_id" {
  description = "Amazon Machine Image ID for Ubuntu"
  default     = "ami-0557a15b87f6559cf" # Update if needed for your region
}

variable "key_name" {
  description = "Name of the SSH key pair"
  default = "kanflow-key"
}
variable "aws_access_key" {
  description = "AWS Access Key"
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
  type        = string
  sensitive   = true
}
