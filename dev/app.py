from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///mapcoloring.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)

class PuzzleState(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    puzzle_data = db.Column(db.JSON, nullable=False)

# Routes
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/register', methods=['POST'])
def register_user():
    data = request.json
    new_user = User(username=data['username'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully', 'user_id': new_user.id}), 201

@app.route('/submit_solution', methods=['POST'])
def submit_solution():
    # Simplified; in a real application, you'd check the solution here
    data = request.json
    return jsonify({'message': 'Solution submitted', 'data': data})

@app.route('/get_puzzle', methods=['GET'])
def get_puzzle():
    # Placeholder; you'd fetch and return a puzzle here
    return jsonify({'message': 'Puzzle fetched', 'puzzle': {}})

# Initialize Database
@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
