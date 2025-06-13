import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from bs4 import BeautifulSoup

def get_latest_html():
    html_dir = Path("html-mails")
    html_files = sorted(html_dir.glob("*.html"), key=lambda f: f.stat().st_mtime, reverse=True)
    return html_files[0] if html_files else None

def get_subject(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    return soup.title.string if soup.title else "No Subject"

def send_email():
    sender = os.environ["GMAIL_USER"]
    password = os.environ["GMAIL_PASS"]
    recipients = os.environ["TO_EMAILS"].split(",")

    html_file = get_latest_html()
    if not html_file:
        print("❌ No HTML file found.")
        return

    with open(html_file, "r", encoding="utf-8") as file:
        html_content = file.read()

    subject = get_subject(html_content)

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = ", ".join(recipients)
    msg['Subject'] = subject
    msg.attach(MIMEText(html_content, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender, password)
            server.sendmail(sender, recipients, msg.as_string())
        print(f"✅ Email sent to: {', '.join(recipients)} with subject: {subject}")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

if __name__ == "__main__":
    send_email()
