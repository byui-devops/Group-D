provider "aws" {
  region = var.region
}

# Fetch the default VPC
data "aws_vpc" "default" {
  default = true
}

# Fetch a subnet from the default VPC
data "aws_subnet" "default" {
  filter {
    name   = "default-for-az"
    values = ["true"]
  }
  availability_zone = "us-east-1" # AWS Academy default AZ
}

resource "aws_instance" "app_server" {
  ami           = var.ami_id
  instance_type = "t2.micro"
  key_name      = var.key_pair_name
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  subnet_id     = data.aws_subnet.default.id

  tags = {
    Name = "TaskManagementAPI"
  }
}

resource "aws_security_group" "app_sg" {
  name_prefix = "task-api-sg-"
  description = "Allow HTTP and SSH"
  vpc_id      = data.aws_vpc.default.id

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
