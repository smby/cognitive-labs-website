# AGENTS.md

## Git Identity For This Repo
- Repository: `smby/cognitive-labs-website`
- Required remote URL: `git@github-smby:smby/cognitive-labs-website.git`
- Required local git identity:
- `user.name=AlanXiao`
- `user.email=smby1985@gmail.com`

## Multi-Account SSH Convention
- `github-smby` -> `~/.ssh/id_ed25519_smby`
- `github-annship` -> `~/.ssh/id_ed25519_annship`
- Do not switch this repository back to HTTPS remote URLs.

## Agent Rules
- Before pushing, run:
- `git remote -v`
- `git config --local --get user.email`
- If this repo is not using `github-smby` or `smby1985@gmail.com`, fix it before commit/push.
- If push fails with `Permission denied (publickey)`, ask the user to add the public key
  `~/.ssh/id_ed25519_smby.pub` to GitHub account `smby` SSH keys.

## Switching To Other Account Repos
- For repos owned by `annship`, set remote like:
- `git remote set-url origin git@github-annship:<owner>/<repo>.git`
- Set matching local identity for that repo:
- `git config user.name "AlanXiao"`
- `git config user.email "<annship-account-email>"`
