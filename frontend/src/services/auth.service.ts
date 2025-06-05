export class AuthService {
  static loginWithGoogle() {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL || ''}/auth/google`;
  }

  static async handleGoogleCallback(code: string) {
    // Not needed: backend handles callback and sets cookies
  }

  static async refreshToken() {
    // Optionally call backend to refresh token
    await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  static async logout() {
    await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = '/login';
  }

  static async checkAuth() {
    // Optionally call a backend endpoint to check auth status
    // For now, assume presence of accessToken cookie means authenticated
    // You can implement a /auth/status endpoint in backend for a robust check
    return document.cookie.includes('accessToken');
  }
} 