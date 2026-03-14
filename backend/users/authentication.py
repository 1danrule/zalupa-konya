from typing import Optional, Tuple, Any

from rest_framework import authentication
from rest_framework import exceptions


class KeycloakAuthentication(authentication.BaseAuthentication):
    """
    Placeholder for future Keycloak bearer token authentication.

    TODO:
    - Parse Authorization: Bearer <token> header
    - Verify token against Keycloak public key / introspection endpoint
    - Map token claims to a local AppUser (create if needed)
    """

    def authenticate(self, request) -> Optional[Tuple[Any, None]]:
        auth_header = authentication.get_authorization_header(request).decode()
        if not auth_header:
            return None

        # Example of header: "Bearer <access_token>"
        if not auth_header.lower().startswith("bearer "):
            return None

        token = auth_header.split(" ", 1)[1].strip()

        # TODO: verify 'token' with Keycloak and return user
        raise exceptions.AuthenticationFailed(
            "Keycloak authentication is not implemented yet."
        )