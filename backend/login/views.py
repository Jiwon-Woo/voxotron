from django.shortcuts import render, redirect

import os
import requests


def GetCode(request):
    authorize_api = os.environ.get("AUTHORIZE_URL")
    client_id = os.environ.get("CLIENT_ID")
    redirect_uri = os.environ.get("REDIRECT_URI")
    return redirect(f'{authorize_api}?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code')


def LoginApi(request):
    code = request.get_full_path().replace('/?code=', '')
    if code == '':
        context = {
            'id': None,
            'login': None,
            'email': None,
            'staff': None,
        }
        return render(request, 'login/login.html', context)
    data = {
        'grant_type': 'authorization_code',
        'client_id': os.environ.get("CLIENT_ID"),
        'client_secret': os.environ.get("CLIENT_SECRET"),
        'code': code,
        'redirect_uri': os.environ.get("REDIRECT_URI")
    }

    token = requests.post(os.environ.get('TOKEN_URL'), data=data)
    token_to_json = token.json()
    access_token = token_to_json.get("access_token")
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    info = requests.get(os.environ.get('ME_URL'), headers=headers)
    info_to_json = info.json()
    user_data = {
        'id': info_to_json.get("id"),
        'login': info_to_json.get("login"),
        'email': info_to_json.get("email"),
        'staff': info_to_json.get("staff?"),
        'image_url': info_to_json.get("image_url"),
    }
    return render(request, 'login/login.html', user_data)
