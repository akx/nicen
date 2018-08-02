nicen ops
=========

This playbook was used to set up https://nicen.pw .

There are still some manual steps, namely

* `acmetool quickstart` and `acmetool want nicen.pw`, followed by an Nginx restart

upgrading nicen
---------------

```
ansible-playbook -i inventory.txt playbook.yml --start-at-task "clone nicen"
```