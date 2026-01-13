


def get_recommendations(user):
    """
    Generates personalized recommendations based on user user profile and activity.
    In a real system, this would use ML models.
    """
    recommendations = []

    # Rule 1: Upgrade Nudge for Free Users
    if hasattr(user, 'profile') and user.profile.subscription_tier == 'free':
        recommendations.append({
            'id': 'upgrade_pro',
            'title': 'Unlock Pro Features',
            'description': 'You are hitting usage limits. Upgrade to Pro for unlimited access.',
            'action': '/pricing',
            'icon': 'Zap'
        })

    # Rule 2: GitHub Integration
    # (Mock check, assuming we'd check linked accounts)
    recommendations.append({
        'id': 'connect_github',
        'title': 'Connect GitHub',
        'description': 'Link your repository for automatic code reviews on push.',
        'action': '/dashboard/settings',
        'icon': 'Github'
    })



    return recommendations
