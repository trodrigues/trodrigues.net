---
layout: note
title: Setting up FreeBSD on arm64 on hetzner
date: Last Modified
tags: ['tips', 'arm64', 'hetzner', 'freebsd']
---

Some quick and dirty instructions on how to install FreeBSD on Hetzner Cloud's CAX11.

- Get the latest raw image from [https://download.freebsd.org/releases/VM-IMAGES/](https://download.freebsd.org/releases/VM-IMAGES/)
- Uncompress with `unxz -T0`
- Install qemu
- Run it in qemu following the instructions here: [https://wiki.freebsd.org/arm64/QEMU](https://wiki.freebsd.org/arm64/QEMU)
- telnet into qemu image
- Inside image:
    - `sysrc sshd_enable=YES`
    - `mkdir -p /root/.ssh/`
    - `vi /root/.ssh/authorized_keys` (or whatever editor you prefer)
    - Paste your public key
    - `sed -i '' 's/.*PermitRootLogin.*/PermitRootLogin without-password/g' /etc/ssh/sshd_config`
    - Probably a good idea to remove root login once installed
- Stop qemu and compress the image again with `xz -T0 -9`
- Upload the image to a webserver
- Restart VPS in rescue mode and login to it
- `curl http://imageurl | unxz > /dev/sda`
- `file -sk /dev/sda* # check the file systems`
- `mount -tufs -oufstype=ufs2 /dev/sda3 /tmp/v1 # check the config`
- Reboot VPS

References:

- [https://gist.github.com/strfry/b9383f5f823bf508b7b3a858a6cb3168](https://gist.github.com/strfry/b9383f5f823bf508b7b3a858a6cb3168)
- [https://gist.github.com/pandrewhk/2d62664bfb74a504b7f4a894fc85eb97](https://gist.github.com/pandrewhk/2d62664bfb74a504b7f4a894fc85eb97)
