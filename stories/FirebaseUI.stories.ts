import 'firebaseui/dist/firebaseui.css';

export default {
  title: 'FirebaseUI',
};

export const SignIn = () => ({
  template: `
    <div id="firebaseui-auth-container" lang="en">
      <div class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in">
        <div class="firebaseui-card-content">
          <ul class="firebaseui-idp-list">
            <li class="firebaseui-list-item">
              <button class="firebaseui-idp-button mdl-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button" style="background-color:#ffffff">
                <span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></span>
                <span class="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span>
                <span class="firebaseui-idp-text firebaseui-idp-text-short">Google</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
});
