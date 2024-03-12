function square(number) {
    alert(number*number);
}
  
function login() {
    let oauthEndpoint = "https://keycloak.app.adapa.me/realms/calorie-tracker/protocol/openid-connect/auth"
    let loginForm = document.createElement("form")
    loginForm.setAttribute("method","GET")
    loginForm.setAttribute("action",oauthEndpoint)

    let oauthParameters = {
        "client_id" : "calorie-tracker-app",
        "redirect_uri" : "https://calorie-tracker.pages.dev/callback",
        "state" : "pass-through-value",
        "response_type" : "code",
        "scope" : "calorie-user"
    }

    for (var p in oauthParameters) {
        let input = document.createElement("input")
        input.setAttribute("type","hidden")
        input.setAttribute("value",oauthParameters[p])
        input.setAttribute("name",p)
        loginForm.appendChild(input)
    }
    document.body.appendChild(loginForm)

    loginForm.submit()
}
