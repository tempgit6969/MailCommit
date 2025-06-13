# 📧 MailCommit

Easily send beautiful HTML emails from your Gmail account by just pushing an HTML file to this repo.

## 🚀 Getting Started

1. **Fork this repo**
2. **Go to Settings > Secrets > Actions** and add the following secrets:

   - `GMAIL_USER` = your Gmail address (e.g. `you@gmail.com`)
   - `GMAIL_PASS` = App Password (from Google account)
   - `TO_EMAILS` = comma-separated list of recipients (e.g. `a@example.com,b@example.com`)

3. **Create HTML mails**
   - Add your email content to `html-mails/` folder
   - Push the file — and the mail gets sent!

## ✨ Features

- Sends email to multiple recipients
- Uses the `<title>` of the HTML as the subject
- Secure: Gmail credentials are stored as secrets
- Easy for non-tech users (no code editing)

## 🛡️ Gmail Setup

Create a Google App Password:  
https://support.google.com/accounts/answer/185833

Make sure:
- 2-Step Verification is enabled
- You create an App Password for "Mail"

## 💡 Example

```bash
git clone https://github.com/yourname/MailCommit.git
cd MailCommit/html-mails
nano welcome.html
git add .
git commit -m "Welcome email"
git push
```
## 📨 Email gets sent to all users!

## 🧠 Future Enhancements
- Markdown to HTML conversion
- Preview email before sending (via GitHub Pages)
- Mail sending logs stored in issues or files
- Multi-template support using filenames as subject fallback
