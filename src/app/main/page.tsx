'use client';

import { Suspense } from 'react'
import WorkspaceList from './WorkspaceList'

export default function MainMenu() {
    return (
        <Suspense fallback={<div className="text-green-700">Loading...</div>}>
          <WorkspaceList apiKey="works"/>
        </Suspense>
    )
}
