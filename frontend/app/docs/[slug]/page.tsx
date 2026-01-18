'use client';

import React from 'react';
import { docContent } from '../doc-data';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function DocContentPage() {
    const params = useParams();
    const slug = params?.slug as string;

    // Safety check
    if (!slug) return null;

    const content = docContent[slug];

    if (!content) {
        return (
            <div className="py-12 text-center">
                <h1 className="text-3xl font-bold mb-4">404 - Not Found</h1>
                <p className="text-neutral-500">The documentation page you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-8 border-b border-neutral-100 pb-8">
                <h1 className="text-4xl font-bold text-neutral-900">{content.title}</h1>
            </div>

            <div
                className="prose prose-neutral max-w-none prose-headings:font-bold prose-h3:text-xl prose-a:text-devpulse-blue-600"
                dangerouslySetInnerHTML={{ __html: content.content }}
            />
        </div>
    );
}
