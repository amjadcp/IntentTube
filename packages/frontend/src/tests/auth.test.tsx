import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import { AuthProvider } from '../features/auth/AuthProvider';
import LoginPage from "../features/auth/LoginPage";
// import ProtectedRoute from '../features/auth/ProtectedRoute';
import * as AuthService from "../services/auth.service";

describe("Authentication UI", () => {
  it("should render Google Sign-In button", () => {
    render(<LoginPage />);
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });

  it("should trigger OAuth flow on button click", () => {
    const loginSpy = vi
      .spyOn(AuthService.AuthService, "loginWithGoogle")
      .mockImplementation(() => {});
    render(<LoginPage />);
    fireEvent.click(screen.getByText("Sign in with Google"));
    expect(loginSpy).toHaveBeenCalled();
    loginSpy.mockRestore();
  });

  it("should update UI on successful login", () => {
    // TODO: Mock login and assert UI update
  });

  it("should redirect unauthenticated users from protected routes", () => {
    // TODO: Render ProtectedRoute and assert redirect
  });

  it("should handle logout and clear state", () => {
    // TODO: Simulate logout and assert state clear
  });

  it("should display error messages on failure", () => {
    // TODO: Simulate error and assert error message
  });
});
