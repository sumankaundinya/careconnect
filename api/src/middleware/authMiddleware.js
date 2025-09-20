// @ts-check
import { jwtVerify } from "jose";

export async function authenticateJwt(req, res, next) {
  try {
    // Make sure cookies are available (requires cookie-parser middleware)
    const token = req.cookies?.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Access token is required" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ success: false, error: "JWT_SECRET is missing" });
    }

    // Verify the token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    // Extract user ID from payload
    const userId = payload.userId ?? payload.sub;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid token payload" });
    }

    // Attach user info to request
    req.user = {
      userId: userId.toString(),
      email: String(payload.email ?? ""),
      role: String(payload.role ?? ""),
    };

    next();
  } catch (err) {
    console.error("JWT authentication error:", err);
    res
      .status(403)
      .json({ success: false, error: "Invalid or expired access token" });
  }
}
