provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "allow_ssh" {
  name        = "kanflow-ssh"
  description = "Allow SSH and Jenkins inbound traffic"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Jenkins UI"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami                    = "ami-020cba7c55df1f615" # Ubuntu 22.04 LTS (us-east-1)
  instance_type          = "t2.micro"
  key_name               = "kanflow-main"
  vpc_security_group_ids = [aws_security_group.allow_ssh.id]

  provisioner "remote-exec" {
    inline = [
      "echo Hello from remote server!"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("${path.module}/ssh/kanflow-main.pem")
      host        = self.public_ip
    }
  }

  tags = {
    Name = "Kanflow-App-Server"
  }
}
