   variable "region" {
     description = "AWS region"
     type        = string
     default     = "us-east-1"
   }

   variable "ami_id" {
     description = "AMI ID for the EC2 instance"
     type        = string
     default     = "ami-0cbbe2c6a1bb2ad63" 
   }

   variable "key_pair_name" {
     description = "SSH key pair name"
     type        = string
     default     = "vockey" 
   }

output "instance_public_ip" {
  description = "The public IP of the EC2 instance"
  value       = aws_instance.web.public_ip
}
