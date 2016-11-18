# RowsterTowster
For details on who Rowan is and why this project exists, please visit the [website](https://thoughtarray.github.io/RowsterTowster/).  This code repository is simply the public information website.  There is a swath of technology supporting the actual management of the Minecraft server.

## How it works
RowsterTowster gives Rowan something special to anticipate and enjoy each day.  Authorized players can login to the game server from 3–6 UTC.  Because it would be wasteful to leave the server up all day, the server is created and destroyed every day.  Because the server is ephemeral, the management of the server was designed to be completely automated.

### Automation timeline
* 2:45 UTC: a command and control server launches and provisions a server instance
  * [Terraform](https://www.terraform.io) is used to provision the infrastructure
  * [Chef](https://www.chef.io/chef/) is used to provision the OS and applications
* 2:50 UTC: the instance installs Rowan's specific Minecraft world
* 2:55 UTC: the instance runs the Minecraft server daemon
* 3:00 UTC: the instance opens the firewall for Minecraft traffic


* 6:00 UTC: the instance closes the firewall to Minecraft traffic
* 6:02 UTC: the instance saves Rowan's world and stops the Minecraft daemon
* 6:05 UTC: the instance backs up Rowan's world to detachable block storage
* 6:15 UTC: the command and control server destroys the instance
  * The block storage is detached
  * Terraform destroys the instance and DNS entry
  * The instance is deregistered from Chef Server

## Other projects
Unfortunately, I am not proud enough with the quality of the associated Chef cookbooks to publish them publicly.  I might make them respectable enough for public consumption in the future :)
