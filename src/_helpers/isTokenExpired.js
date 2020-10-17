import decode from "jwt-decode";

export default function isTokenExpired(token) {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired.
            return true;
        } else return false;
    } catch (err) {
        console.log("expired check failed! Line 42: AuthService.js");
        return false;
    }
}
