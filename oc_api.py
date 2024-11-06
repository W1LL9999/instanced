from flask import Blueprint, jsonify, request, session
from random import * 
from flask_cors import CORS
from CTFd.utils.decorators import admins_only, authed_only
from CTFd.utils.user import get_current_user
from CTFd.models import *

oc_api = Blueprint('oc_api', __name__)
CORS(oc_api, supports_credentials=True)


@oc_api.route('/create', methods=['PUT'])
@authed_only
def create_oc_instance():
    # Get current user
    user = get_current_user()
    print(f"USERNAME: {user.name}")
    
    # Get the request data containing challenge_id
    data = request.get_json()
    challenge_id = data.get('challenge_id')
    
    if not challenge_id:
        return jsonify({
            'success': False,
            'message': 'No challenge_id provided'
        }), 400
        
    try:
        # MAKE IT HERE


        # For example: create_new_instance(challenge_id, user.id)
        instance_url = "https://www.google.com:443"
        
        return jsonify({
            'success': True,
            'message': 'Instance creation initiated',
            'data': {
                'challenge_id': challenge_id,
                'user': user.name,
                'status': 'creating',
                'url' : instance_url
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error creating instance: {str(e)}'
        }), 500


@oc_api.route('/delete', methods=['POST'])
@authed_only
def delete_oc_instance():
    if not request.is_json:
        return jsonify({'success': False, 'message': 'Invalid content type, JSON required'}), 400
    try:
        data = request.get_json()
        challenge_id = data.get('challenge_id')
        # DELETE LOGIC


        return jsonify({'success': True, 'message': 'Deleted Container App'}), 200
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

