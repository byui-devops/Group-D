   variable "region" {
     description = "AWS region"
     type        = string
     default     = "us-east-1"
   }

   variable "ami_id" {
     description = "AMI ID for the EC2 instance"
     type        = string
     default     = "ami-0039a65b96d31e173" 
   }

   variable "key_pair_name" {
     description = "SSH key pair name"
     type        = string
     default     = "vockey" 
   }
   
