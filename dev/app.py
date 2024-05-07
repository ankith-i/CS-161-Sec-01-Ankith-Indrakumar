from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Flask application
app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('C:/Users/ankit/Desktop/Software Engineering Project/Final/CS-161-Sec-01-Ankith-Indrakumar/dev/map-coloring-firebase-adminsdk-d3by0-35f24e89cf.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# A collection name for user activities in Firestore
ACTIVITY_COLLECTION = 'user_activities'

@app.route('/api/log-action', methods=['POST'])
def log_action():
    try:
        action = request.json
        user_id = action.get('user_id')
        if not user_id:
            raise ValueError('User ID is required')

        # Add action to Firestore under the specific user's document
        user_doc_ref = db.collection(ACTIVITY_COLLECTION).document(user_id)
        user_doc = user_doc_ref.get()

        if user_doc.exists:
            existing_actions = user_doc.to_dict().get('actions', [])
        else:
            existing_actions = []

        # Append the new action and update Firestore
        existing_actions.append(action)
        user_doc_ref.set({'actions': existing_actions})

        return jsonify({'status': 'success', 'message': 'Action logged successfully'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/get-summary', methods=['GET'])
def get_summary():
    try:
        user_id = request.args.get('user_id')
        if not user_id:
            raise ValueError('User ID is required')

        # Retrieve user actions from Firestore
        user_doc_ref = db.collection(ACTIVITY_COLLECTION).document(user_id)
        user_doc = user_doc_ref.get()

        if user_doc.exists:
            actions = user_doc.to_dict().get('actions', [])
        else:
            actions = []

        # Compute the summary based on the logged actions
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
