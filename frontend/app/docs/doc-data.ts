
export const docCategories = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Quick Start Guide', slug: 'quick-start' },
            { title: 'Installation', slug: 'installation' },
            { title: 'Project Setup', slug: 'project-setup' }
        ]
    },
    {
        title: 'Core Concepts',
        items: [
            { title: 'DORA Metrics Explained', slug: 'dora-metrics' },
            { title: 'Setting up Integrations', slug: 'integrations' },
            { title: 'User Management', slug: 'user-management' }
        ]
    },
    {
        title: 'Advanced Guides',
        items: [
            { title: 'Custom Webhooks', slug: 'webhooks' },
            { title: 'API Authentication', slug: 'api-auth' },
            { title: 'Role-Based Access Control', slug: 'rbac' }
        ]
    },
    {
        title: 'Troubleshooting',
        items: [
            { title: 'Common Errors', slug: 'common-errors' },
            { title: 'Status Codes', slug: 'status-codes' },
            { title: 'Contact Support', slug: 'contact-support' }
        ]
    },
];

export const docContent: Record<string, { title: string; content: string }> = {
    'quick-start': {
        title: 'Quick Start Guide',
        content: `
            <p class="mb-4">Get up and running with DevPulse in less than 5 minutes. This guide will walk you through the essential steps to connect your first repository and start seeing insights.</p>
            <h3 class="text-xl font-bold mt-6 mb-3">Prerequisites</h3>
            <ul class="list-disc pl-6 space-y-2 mb-6">
                <li>A GitHub or GitLab account</li>
                <li>Admin access to the repositories you want to track</li>
                <li>A DevPulse account</li>
            </ul>
            <h3 class="text-xl font-bold mt-6 mb-3">Step 1: Connect your VCS</h3>
            <p class="mb-4">Navigate to the Integrations page and click "Connect GitHub". Authorize the DevPulse app to access your repositories.</p>
        `
    },
    'installation': {
        title: 'Installation',
        content: `
            <p class="mb-4">DevPulse is primarily a SaaS platform, but we offer self-hosted agents for on-premise deployments.</p>
            <h3 class="text-xl font-bold mt-6 mb-3">Docker Installation</h3>
            <pre class="bg-neutral-900 text-white p-4 rounded-lg overflow-x-auto mb-6"><code>docker run -d --name devpulse-agent \\
  -e DEVPULSE_API_KEY=your_key \\
  devpulse/agent:latest</code></pre>
            <p class="mb-4">Verify the installation by checking the logs:</p>
            <pre class="bg-neutral-900 text-white p-4 rounded-lg overflow-x-auto mb-6"><code>docker logs devpulse-agent</code></pre>
        `
    },
    'project-setup': {
        title: 'Project Setup',
        content: `
            <p class="mb-4">Configuring your project settings correctly is crucial for accurate metrics.</p>
            <h3 class="text-xl font-bold mt-6 mb-3">Excluding Files</h3>
            <p class="mb-4">You can exclude generated files (like package-lock.json) from analysis by adding a <code>.devpulseignore</code> file to your root directory.</p>
        `
    },
    'dora-metrics': {
        title: 'DORA Metrics Explained',
        content: `
            <p class="mb-4">DevOps Research and Assessment (DORA) metrics are the industry standard for measuring software delivery performance.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div class="p-4 border border-neutral-200 rounded-lg">
                    <h4 class="font-bold mb-2">Deployment Frequency</h4>
                    <p class="text-sm">How often an organization successfully releases to production.</p>
                </div>
                <div class="p-4 border border-neutral-200 rounded-lg">
                    <h4 class="font-bold mb-2">Lead Time for Changes</h4>
                    <p class="text-sm">The amount of time it takes a commit to get into production.</p>
                </div>
                 <div class="p-4 border border-neutral-200 rounded-lg">
                    <h4 class="font-bold mb-2">Change Failure Rate</h4>
                    <p class="text-sm">The percentage of deployments causing a failure in production.</p>
                </div>
                 <div class="p-4 border border-neutral-200 rounded-lg">
                    <h4 class="font-bold mb-2">Time to Restore Service</h4>
                    <p class="text-sm">How long it takes an organization to recover from a failure in production.</p>
                </div>
            </div>
        `
    },
    'integrations': {
        title: 'Setting up Integrations',
        content: `
            <p class="mb-4">DevPulse integrates with your favorite tools to aggregate data across the entire SDLC.</p>
            <h3 class="text-xl font-bold mt-6 mb-3">Supported Tools</h3>
            <ul class="list-disc pl-6 space-y-2 mb-6">
                <li><strong>VCS:</strong> GitHub, GitLab, Bitbucket</li>
                <li><strong>CI/CD:</strong> Jenkins, CircleCI, GitHub Actions</li>
                <li><strong>Project Management:</strong> Jira, Linear, Trello</li>
                <li><strong>Communication:</strong> Slack, Microsoft Teams</li>
            </ul>
        `
    },
    'user-management': {
        title: 'User Management',
        content: `
            <p class="mb-4">Manage your team members and their access levels directly from the dashboard.</p>
            <p class="mb-4">Go to <strong>Settings > Team</strong> to invite new members via email.</p>
        `
    },
    'webhooks': {
        title: 'Custom Webhooks',
        content: `
            <p class="mb-4">Use webhooks to receive real-time notifications about events in DevPulse.</p>
            <h3 class="text-xl font-bold mt-6 mb-3">Event Types</h3>
            <ul class="list-disc pl-6 space-y-2 mb-6">
                <li><code>alert.triggered</code>: When a metric breaches a threshold.</li>
                <li><code>report.generated</code>: When a weekly report is ready.</li>
            </ul>
        `
    },
    'api-auth': {
        title: 'API Authentication',
        content: `
            <p class="mb-4">Learn how to securely authenticate your API requests.</p>
            <p class="mb-4">Include the <code>Authorization</code> header with your Bearer token in every request.</p>
             <pre class="bg-neutral-900 text-white p-4 rounded-lg overflow-x-auto mb-6"><code>Authorization: Bearer dp_live_xxxxxxxx</code></pre>
        `
    },
    'rbac': {
        title: 'Role-Based Access Control',
        content: `
            <p class="mb-4">Control what your users can see and do with RBAC.</p>
            <table class="w-full text-left border-collapse my-6">
                <thead>
                    <tr class="bg-neutral-100">
                        <th class="p-3 border">Role</th>
                        <th class="p-3 border">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="p-3 border">Admin</td>
                        <td class="p-3 border">Full access to settings, billing, and all data.</td>
                    </tr>
                    <tr>
                        <td class="p-3 border">Editor</td>
                        <td class="p-3 border">Can create reports and alerts, but cannot change billing.</td>
                    </tr>
                    <tr>
                        <td class="p-3 border">Viewer</td>
                        <td class="p-3 border">Read-only access to dashboards.</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    'common-errors': {
        title: 'Common Errors',
        content: `
            <p class="mb-4">Solutions to the most frequent issues encountered by users.</p>
            <h3 class="text-xl font-bold mt-6 mb-3">"Data not syncing"</h3>
            <p class="mb-4">Check if your personal access token has expired or if the webhook was deleted in your VCS provider.</p>
        `
    },
    'status-codes': {
        title: 'Status Codes',
        content: `
            <p class="mb-4">A reference for API response codes.</p>
            <ul class="list-disc pl-6 space-y-2 mb-6">
                <li><strong>200 OK:</strong> Success.</li>
                <li><strong>401 Unauthorized:</strong> Invalid API key.</li>
                <li><strong>429 Too Many Requests:</strong> You have hit the rate limit.</li>
                <li><strong>500 Internal Server Error:</strong> Something went wrong on our end.</li>
            </ul>
        `
    },
    'contact-support': {
        title: 'Contact Support',
        content: `
            <p class="mb-4">Need help? Our support team is here for you.</p>
            <p class="mb-4">Email us at <a href="mailto:support@devpulse.io" class="text-blue-600 hover:underline">support@devpulse.io</a> or join our community Discord.</p>
        `
    },
};
