from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import json
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# Load environment variables from .env file
load_dotenv()

# Get the JSON credentials from environment variable
json_credentials = os.getenv('FIREBASE_CREDENTIALS')
parsed_credentials = json.loads(json_credentials)

# Use the credentials to initialize Firebase
cred = credentials.Certificate(parsed_credentials)
firebase_admin.initialize_app(cred)

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
    try:
        # Retrieve the user ID from the query parameters
        user_id = request.args.get('user_id')
        if not user_id:
            raise ValueError('User ID is required')

        # Get the user's document from Firestore
        user_doc_ref = db.collection(ACTIVITY_COLLECTION).document(user_id)
        user_doc = user_doc_ref.get()

        # Initialize the actions list
        if user_doc.exists:
            actions = user_doc.to_dict().get('actions', [])
        else:
            actions = []

        # Calculate the summary of user actions
        summary = {
            'total_actions': len(actions),
            'color_changes': sum(1 for action in actions if action['type'] == 'color_change'),
            'hints_requested': sum(1 for action in actions if action['type'] == 'hint_request')
        }

        return jsonify({'status': 'success', 'summary': summary}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
