function signIn(){
    let oauthEndpoint = "https://accounts.google.com/o/oauth2/v2/auth"
    let form = document.createElement('form')
    form.setAttribute('method', 'GET')
    form.setAttribute('action', oauthEndpoint)

    let params = {
        "client_id": "106882171421-ud1dkc5i4t3fbf5ve40prfi7e5dnl56t.apps.googleusercontent.com",
        "redirect_uri":"http://127.0.0.1:5501/frontend/userVerification.html",
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        "include_granted_scopes": 'true',
        'state': 'pass-through-value'
    }

    for(var p in params){
        let input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name',p)
        input.setAttribute('value', params[p])
        form.appendChild(input)
    }

    document.body.appendChild(form)

    form.submit()
}

