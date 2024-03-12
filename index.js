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

const client = new OAuth2Client({

    // The base URI of your OAuth2 server
    server: 'https://keycloak.app.adapa.me/realms/calorie-tracker/',
  
    // OAuth2 client id
    clientId: 'calorie-tracker-app',
  
    // OAuth2 client secret. Only required for 'client_credentials', 'password'
    // flows. Don't specify this in insecure contexts, such as a browser using
    // the authorization_code flow.
    ///clientSecret: '...',
  
  
    // The following URIs are all optional. If they are not specified, we will
    // attempt to discover them using the oauth2 discovery document.
    // If your server doesn't have support this, you may need to specify these.
    // you may use relative URIs for any of these.
  
  
    // Token endpoint. Most flows need this.
    // If not specified we'll use the information for the discovery document
    // first, and otherwise default to /token
    tokenEndpoint: '/token',
  
    // Authorization endpoint.
    //
    // You only need this to generate URLs for authorization_code flows.
    // If not specified we'll use the information for the discovery document
    // first, and otherwise default to /authorize
    authorizationEndpoint: '/auth',
  
    // OAuth2 Metadata discovery endpoint.
    //
    // This document is used to determine various server features.
    // If not specified, we assume it's on /.well-known/oauth2-authorization-server
    discoveryEndpoint: '/.well-known/oauth2-authorization-server',
  
  });


  const codeVerifier = await generateCodeVerifier();

// In a browser this might work as follows:
document.location = await client.authorizationCode.getAuthorizeUri({

  // URL in the app that the user should get redirected to after authenticating
  redirectUri: 'https://calorie-tracker.pages.dev/callback',

  // Optional string that can be sent along to the auth server. This value will
  // be sent along with the redirect back to the app verbatim.
  state: 'some-string',

  codeVerifier,

  scope: ['calorie-user']

});
