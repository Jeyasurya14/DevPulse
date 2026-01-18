// Sample data for DevPulse dashboard
// Used for development and demo purposes

export const mockUser = {
    name: "Alex Rivera",
    email: "alex@company.com",
    role: "Engineering Manager",
    avatar: "https://i.pravatar.cc/150?img=12",
    teamSize: 24,
    joinDate: "2023-06-15"
};

export const mockMetrics = {
    deploymentFrequency: {
        value: 12.4,
        unit: "per day",
        trend: 15,
        trendDirection: "up" as const,
        chartData: [8, 10, 12, 11, 13, 14, 12]
    },
    leadTime: {
        value: 2.3,
        unit: "hours",
        trend: -8,
        trendDirection: "down" as const,
        chartData: [3.2, 2.9, 2.7, 2.5, 2.4, 2.3, 2.3]
    },
    changeFailureRate: {
        value: 4.2,
        unit: "%",
        trend: -1.2,
        trendDirection: "down" as const,
        chartData: [6.5, 5.8, 5.2, 4.8, 4.5, 4.3, 4.2]
    },
    mttr: {
        value: 23,
        unit: "minutes",
        trend: -12,
        trendDirection: "down" as const,
        chartData: [45, 38, 32, 28, 25, 24, 23]
    }
};

export const mockRecentActivity = [
    {
        type: "deployment",
        icon: "🚀",
        message: "Backend API v2.3.1 deployed to production",
        timestamp: "23 min ago",
        status: "success"
    },
    {
        type: "security",
        icon: "✅",
        message: "Security scan completed - 0 critical issues found",
        timestamp: "1 hour ago",
        status: "success"
    },
    {
        type: "pr",
        icon: "👥",
        message: "Sarah Chen merged PR #342: Fix authentication bug",
        timestamp: "2 hours ago",
        status: "info"
    },
    {
        type: "alert",
        icon: "⚠️",
        message: "Alert: API response time increased by 15%",
        timestamp: "3 hours ago",
        status: "warning"
    },
    {
        type: "report",
        icon: "📊",
        message: "Weekly report generated",
        timestamp: "4 hours ago",
        status: "info"
    }
];

export const mockPullRequests = {
    open: 12,
    inReview: 8,
    approved: 5,
    merged: 15
};

export const mockTeamMembers = [
    { id: 1, name: "Sarah Chen", email: "sarah@company.com", role: "Admin", status: "active", activity: "high", avatar: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Mike Johnson", email: "mike@company.com", role: "Developer", status: "active", activity: "medium", avatar: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Emma Davis", email: "emma@company.com", role: "Developer", status: "away", activity: "low", avatar: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "James Wilson", email: "james@company.com", role: "Developer", status: "active", activity: "high", avatar: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Lisa Park", email: "lisa@company.com", role: "Viewer", status: "active", activity: "medium", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 6, name: "David Lee", email: "david@company.com", role: "Developer", status: "active", activity: "high", avatar: "https://i.pravatar.cc/150?img=6" },
];

export const mockSecurityIssues = [
    { severity: "high", description: "Hardcoded API key detected", file: "auth.js:42", detected: "2 hours ago", status: "open" },
    { severity: "medium", description: "Outdated dependency: lodash@3.2", file: "package.json", detected: "1 day ago", status: "in-progress" },
    { severity: "medium", description: "Missing input validation", file: "api/users.ts:78", detected: "2 days ago", status: "open" },
    { severity: "low", description: "Console.log statement in production code", file: "utils/helpers.js:15", detected: "3 days ago", status: "resolved" },
];

export const mockAlerts = [
    { id: 1, name: "Deployment Failure", type: "deployment", enabled: true, channels: ["slack", "email"], threshold: "any failure" },
    { id: 2, name: "High Error Rate", type: "performance", enabled: true, channels: ["slack"], threshold: "> 5%" },
    { id: 3, name: "Security Vulnerability", type: "security", enabled: true, channels: ["email", "slack"], threshold: "critical/high" },
    { id: 4, name: "PR Review Stale", type: "workflow", enabled: false, channels: ["slack"], threshold: "> 48 hours" },
    { id: 5, name: "Low Test Coverage", type: "quality", enabled: true, channels: ["email"], threshold: "< 80%" },
];

export const mockBenchmarks = {
    deploymentFrequency: { value: 12.4, industryAvg: 8.2, elite: 15, label: "Deployment Frequency" },
    leadTime: { value: 2.3, industryAvg: 4.5, elite: 1, label: "Lead Time (hours)" },
    changeFailureRate: { value: 4.2, industryAvg: 15, elite: 5, label: "Change Failure Rate (%)" },
    mttr: { value: 23, industryAvg: 60, elite: 15, label: "MTTR (minutes)" },
};
