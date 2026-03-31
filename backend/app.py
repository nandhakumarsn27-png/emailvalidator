from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

EMAIL_REGEX = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w+$'

def is_valid_email(email):
    return re.match(EMAIL_REGEX, email) is not None

# 👉 Serve frontend
@app.route("/")
def home():
    return render_template("index.html")

# 👉 API
@app.route("/bulk-validate", methods=["POST"])
def bulk_validate():
    data = request.json
    emails = data.get("emails", [])

    results = []
    for email in emails:
        results.append({
            "email": email,
            "valid": is_valid_email(email)
        })

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)