provider "aws" {
  region = var.region
}

resource "aws_instance" "app_server" {
  ami           = var.ami_id
  instance_type = "r6a.large" # Match your instance type
  key_name      = var.key_pair_name
  security_groups = [aws_security_group.app_sg.name]
  vpc_id        = var.vpc_id        # Add VPC ID
  subnet_id     = var.subnet_id     # Add Subnet ID

  tags = {
    Name = "TaskManagementAPI"
  }
}

resource "aws_security_group" "app_sg" {
  name        = "task-api-sg"
  description = "Allow HTTP and SSH"
  vpc_id      = var.vpc_id # Associate with VPC

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "instance_public_ip" {
  value = aws_instance.app_server.public_ip
}