# Bcrypt Hash Tool

A Chrome Manifest V3 extension for generating bcrypt hashes and verifying text against existing bcrypt hashes.

## Load in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select this folder: `bcrypt-encrypt`.

## Note

Bcrypt is intentionally one-way. It can create a hash and verify whether text matches that hash, but it cannot decrypt a hash back into the original text.
