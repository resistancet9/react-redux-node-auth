export default function(state = {}, { type, payload }) {
  switch (type) {
    case "AUTH_USER":
      return { authenticated: true };
    case "UNAUTH_USER":
      return { authenticated: false };
    case "AUTH_ERROR":
      return { ...state, error: payload };
    default:
      return state;
  }
}
