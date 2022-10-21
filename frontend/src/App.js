import React from 'react';

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import ThirdPartyEmailPassword, { Github, Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "WarsawJS Workshop 65",
    apiDomain: "http://localhost:3000",
    websiteDomain: "http://localhost:4200",
    apiBasePath: "/auth",
    websiteBasePath: "/auth"
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
        ]
      }
    }),
    Session.init()
  ]
});


/* Your App */
class App extends React.Component {
  render() {
    if (SuperTokens.canHandleRoute()) {
      // This renders the login UI on the /auth route
      return SuperTokens.getRoutingComponent()
    }

    return (
      <SuperTokensWrapper>
        {/*Your app components*/}
      </SuperTokensWrapper>
    );
  }
}

export default App;
