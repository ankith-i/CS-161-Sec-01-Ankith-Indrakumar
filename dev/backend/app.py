from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

app = Flask(__name__)
# Properly setup CORS for all domains on all routes under /api/
CORS(app, resources={r"/api/*": {"origins": "*"}})

load_dotenv()

# Fetch the credentials from the environment variable
private_key_str = os.getenv('FIREBASE_PRIVATE_KEY')
if not private_key_str:
    raise ValueError("FIREBASE_PRIVATE_KEY is not set in the environment variables")

# Replace '\\n' with '\n' to format the private key correctly
private_key_str = private_key_str.replace('\\n', '\n')

# Prepare credentials dictionary
cred_dict = {
    "type": "service_account",
    "project_id": "map-coloring-18ff5",  # Replace with your project ID
    "private_key_id": "0b4b8fba947112d7a3259ba2dde173237b8cd189",  # Replace with your private key ID
    "private_key": private_key_str,
    "client_email": "firebase-adminsdk-ph9s8@map-coloring-18ff5.iam.gserviceaccount.com",
    "client_id": "118241003660103584798",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ph9s8%40map-coloring-18ff5.iam.gserviceaccount.com"
}

# Use the credentials to initialize Firebase
try:
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)
except ValueError as e:
    print(f"Error initializing Firebase Admin: {e}")
    raise

# Now you can use Firebase as needed, for example to access Firestore
db = firestore.client()

# Firestore collection name for user activities
ACTIVITY_COLLECTION = 'user_activities'

@app.route('/api/log-action', methods=['POST'])
def log_action():
    try:
        # Extract the action data from the request
        action = request.json
        user_id = action.get('user_id')

        if not user_id:
            raise ValueError('User ID is required')

        # Reference to the user's document in Firestore
        user_doc_ref = db.collection(ACTIVITY_COLLECTION).document(user_id)
        user_doc = user_doc_ref.get()

        if user_doc.exists:
            existing_actions = user_doc.to_dict().get('actions', [])
        else:
            existing_actions = []

        # Add the new action to the list and update Firestore
        existing_actions.append(action)
        user_doc_ref.set({'actions': existing_actions})

        return jsonify({'status': 'success', 'message': 'Action logged successfully'}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/get-summary', methods=['GET'])
def get_summary():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'status': 'error', 'message': 'User ID is required'}), 400

    user_doc_ref = db.collection(ACTIVITY_COLLECTION).document(user_id)
    user_doc = user_doc_ref.get()
    if user_doc.exists:
        actions = user_doc.to_dict().get('actions', [])
        summary = {
            'total_actions': len(actions),
            'color_changes': sum(1 for action in actions if action['type'] == 'color_change'),
            'hints_requested': sum(1 for action in actions if action['type'] == 'hint_request')
        }
        return jsonify({'status': 'success', 'summary': summary}), 200
    else:
        return jsonify({'status': 'error', 'message': 'No actions found for this user'}), 404

if __name__ == '__main__':
    app.run(host="0.0.0.0")
