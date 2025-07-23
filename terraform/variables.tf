variable "region" {
  default = "us-west-2" # Updated to your region
}

variable "ami_id" {
  default = "ami-05b7ee685cf469e87" # Your AMI ID
}

variable "key_pair_name" {
  default = "db_workstation" # Your key pair name
}

variable "vpc_id" {
  default = "vpc-0215cbdc36ca4c8e6" # Your VPC ID
}

variable "subnet_id" {
  default = "subnet-09a62cafde9d0b2ed" # Your Subnet ID
}