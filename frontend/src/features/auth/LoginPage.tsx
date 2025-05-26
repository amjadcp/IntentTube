import React from "react";
import { LoginForm } from "./LoginForm";

const LoginPage: React.FC = () => {

  return (
    // <div className="flex size-full grow flex-col items-center justify-center min-h-screen">
    //   <h1 className="text-2xl font-bold mb-4">Sign in to IntentTube 📺</h1>
    //   {/* TODO: Replace with Shadcn UI Button if available */}
    //   <button
    //     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    //     onClick={handleSignIn}
    //   >
    //     Sign in with Google
    //   </button>
    // </div>
    <main className="flex w-full items-center justify-center h-screen">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
