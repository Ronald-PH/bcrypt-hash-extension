# Bcrypt Hash Tool

A Chrome Manifest V3 extension for generating bcrypt hashes and verifying text against existing bcrypt hashes.

## Installation

### Option 1: Download ZIP

1. Go to `https://github.com/Ronald-PH/bcrypt-hash-extension`.
2. Click **Code**.
3. Click **Download ZIP**.
4. Extract the ZIP file.
5. Open the extracted `bcrypt-hash-extension` folder.

### Option 2: Clone with Git

Clone the repository:

```bash
git clone https://github.com/Ronald-PH/bcrypt-hash-extension.git
```

Open the project folder:

```bash
cd bcrypt-hash-extension
```

## Load in Google Chrome

Load it in Google Chrome:

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select the extracted or cloned `bcrypt-hash-extension` folder.

The extension should now appear in your Chrome extensions list.

## Note

Bcrypt is intentionally one-way. It can create a hash and verify whether text matches that hash, but it cannot decrypt a hash back into the original text.
