from flask import Flask, request, jsonify
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Email regex
EMAIL_REGEX = r'^[\w\.-]+@[\w\.-]+\.\w+$'

def validate_email(email):
    if re.match(EMAIL_REGEX, email):
        return "Valid"
    return "Invalid"

@app.route('/validate', methods=['POST'])
def validate():
    data = request.get_json()
    emails = data.get("emails", [])

    results = []
    for email in emails:
        status = validate_email(email.strip())
        results.append({
            "email": email,
            "status": status
        })

    return jsonify({"results": results})

if __name__ == "__main__":
    app.run(debug=True)