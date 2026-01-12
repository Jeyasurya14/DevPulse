
from rest_framework.views import APIView
from rest_framework.response import Response
from .services import AICodeAnalyzer

class CodeAnalysisView(APIView):
    def post(self, request):
        code = request.data.get('code', '')
        language = request.data.get('language', 'python')
        
        analyzer = AICodeAnalyzer()
        result = analyzer.analyze_snippet(code, language)
        
        return Response(result)
