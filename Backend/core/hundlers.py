import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # If response is None, this means the exception is not handled by DRF's default handler
    if response is None:
        # Log the error details
        logger.error("Internal Server Error: %s", context["request"].path, exc_info=exc)
        
        # Return error details
        response_data = {
            "error": "server_error",
            "message": "An internal server error occurred. Please try again later.",
            "error_type": type(exc).__name__,
            "details": str(exc)
        }
        response = Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response
