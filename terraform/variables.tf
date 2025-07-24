variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1" # Matches Account ID 164675867921
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  type        = string
  default     = "ami-0c55b159cbfafe1f0" #
}

variable "key_pair_name" {
  description = "SSH key pair name"
  type        = string
  default     = "your-key-name" 
}
