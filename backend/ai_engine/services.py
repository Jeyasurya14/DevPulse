
import re
import os
import json
import logging

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

logger = logging.getLogger(__name__)

class AICodeAnalyzer:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key) if self.api_key and OpenAI else None

    def analyze_snippet(self, code_snippet, language="python"):
        """
        Analyze a code snippet. Tries to use GPT-4o if available, otherwise falls back to heuristics.
        Returns score (0-100) and list of issues.
        """
        if self.client:
            try:
                return self._analyze_with_gpt4o(code_snippet, language)
            except Exception as e:
                logger.error(f"GPT-4o analysis failed: {e}")
                # Fallback to heuristics on error
        
        return self._analyze_heuristically(code_snippet)

    def _analyze_with_gpt4o(self, code_snippet, language):
        prompt = f"""
        Analyze this {language} code snippet for quality, security, and best practices.
        Return a JSON object with:
        - "score": integer 0-100
        - "summary": string (brief summary of quality)
        - "issues": list of objects {{ "type": "critical"|"warning"|"info", "message": "...", "line": int (line number or 0) }}
        
        Code:
        {code_snippet}
        """

        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a senior software engineer and code quality expert. Output strict JSON only."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        return json.loads(content)

    def _analyze_heuristically(self, code_snippet):
        """
        Fallback: Analyze a code snippet using heuristic rules.
        """
        issues = []
        score = 100
        
        # 1. Check for print statements (Debug leftovers)
        if "print(" in code_snippet:
            issues.append({
                "type": "warning", 
                "message": "Found 'print()' statements. Use logging instead for production code.",
                "line": code_snippet.find("print(")
            })
            score -= 10

        # ... (rest of heuristic logic maintained for fallback) ...
        # 2. Check for broad exceptions
        if "except Exception:" in code_snippet or "except:" in code_snippet:
            issues.append({
                "type": "critical",
                "message": "Broad exception catching detected. Catch specific errors.",
                "line": code_snippet.find("except")
            })
            score -= 15
            
        # 3. Check for TODOs
        if "TODO" in code_snippet:
            issues.append({
                "type": "info",
                "message": "Unresolved TODO found.",
                "line": code_snippet.find("TODO")
            })
            score -= 5

        # 4. Long function detection (simple heuristic)
        lines = code_snippet.split('\n')
        if len(lines) > 50:
             issues.append({
                "type": "warning",
                "message": "Snippet is very long (>50 lines). Consider breaking it down.",
                "line": 0
            })
             score -= 10

        # 5. Secret Key detection
        if "SECRET_KEY" in code_snippet and "=" in code_snippet and "os.getenv" not in code_snippet:
             issues.append({
                "type": "security",
                "message": "Hardcoded SECRET_KEY detected. Use environment variables.",
                "line": code_snippet.find("SECRET_KEY")
            })
             score -= 25

        return {
            "score": max(0, score),
            "issues": issues,
            "summary": self._generate_summary(score, len(issues))
        }

    def _generate_summary(self, score, issue_count):
        if score > 90: return "Excellent code quality! Ready for production."
        if score > 70: return f"Good code, but found {issue_count} potential improvements."
        return "Needs refactoring. Several critical issues found."

    def generate_recommendations(self, user_context):
        return ["Refactor legacy modules", "Implement CI/CD pipelines", "Increase test coverage"]
