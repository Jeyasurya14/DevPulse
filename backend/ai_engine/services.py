
import re

class AICodeAnalyzer:
    def __init__(self):
        pass

    def analyze_snippet(self, code_snippet, language="python"):
        """
        Analyze a code snippet using heuristic rules to simulate AI.
        Returns score (0-100) and list of issues.
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
