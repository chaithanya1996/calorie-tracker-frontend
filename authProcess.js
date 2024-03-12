function getParameterByName(name, qs)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(qs);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}



function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  } 
  alert('Query Variable ' + variable + ' not found');
}


const client = new OAuth2Client({

    // The base URI of your OAuth2 server
    server: 'https://keycloak.app.adapa.me/realms/calorie-tracker/',
  
    // OAuth2 client id
    clientId: 'calorie-tracker-app',
  
    // OAuth2 client secret. Only required for 'client_credentials', 'password'
    // flows. Don't specify this in insecure contexts, such as a browser using
    // the authorization_code flow.
    clientSecret: '...',
  
  
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
  const oauth2Token = await client.authorizationCode.getTokenFromCodeRedirect(
    document.location,
    {
      /**
       * The redirect URI is not actually used for any redirects, but MUST be the
       * same as what you passed earlier to "authorizationCode"
       */
      redirectUri: 'https://calorie-tracker.pages.dev/callback',
  
      /**
       * This is optional, but if it's passed then it also MUST be the same as
       * what you passed in the first step.
       *
       * If set, it will verify that the server sent the exact same state back.
       */
      state: 'some-string',
  
      codeVerifier,
  
    }
  );