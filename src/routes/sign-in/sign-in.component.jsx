import {
  signInWithGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGoogle();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h2>Sign In page</h2>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
