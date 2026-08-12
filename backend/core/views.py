from rest_framework.response import Response
from rest_framework.views import APIView


class HealthCheckView(APIView):
    """
    Simple API endpoint to verify that the backend is running.
    """

    def get(self, request):
        return Response(
            {
                "status": "success",
                "message": "Secret Chat API is running!",
            }
        )