import React from "react";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./auth/Authcontext";

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;
