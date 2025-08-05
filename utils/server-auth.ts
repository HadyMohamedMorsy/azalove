import { NextRequest, NextResponse } from "next/server";
import { authCookies, userCookies } from "./cookies";

export interface AuthenticatedRequest extends NextRequest {
  user?: any;
}

export const serverAuth = {
  // Check if user is authenticated on server-side
  isAuthenticated: async (): Promise<boolean> => {
    const token = await authCookies.getToken();
    const user = await userCookies.getUser();
    return !!(token && user);
  },

  // Get current user from cookies
  getCurrentUser: async () => {
    return await userCookies.getUser();
  },

  // Get auth token from cookies
  getAuthToken: async () => {
    return await authCookies.getToken();
  },

  // Middleware function for API routes
  withAuth: (handler: (req: AuthenticatedRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      const token = await authCookies.getToken();
      const user = await userCookies.getUser();

      if (!token || !user) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      // Add user to request object
      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = user;

      return handler(authenticatedReq);
    };
  },

  // Optional auth middleware (doesn't require authentication)
  withOptionalAuth: (
    handler: (req: AuthenticatedRequest) => Promise<NextResponse>
  ) => {
    return async (req: NextRequest) => {
      const token = await authCookies.getToken();
      const user = await userCookies.getUser();

      // Add user to request object if available
      const authenticatedReq = req as AuthenticatedRequest;
      if (token && user) {
        authenticatedReq.user = user;
      }

      return handler(authenticatedReq);
    };
  },
};

// Helper function to create protected API routes
export const createProtectedRoute = (
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) => {
  return serverAuth.withAuth(handler);
};

// Helper function to create optional auth API routes
export const createOptionalAuthRoute = (
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) => {
  return serverAuth.withOptionalAuth(handler);
};
