'use client';

import { Suspense } from 'react'
import WorkspaceList from './WorkspaceList'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MainMenu() {
	const router = useRouter()
    const { data: session, status } = useSession({ 
		required: true, 
		onUnauthenticated() {
		router.push('/login')
		}
    })

	if(status === "loading") return <div className="text-green-700">Loading...</div> 

    return (
		<>
			<Suspense fallback={<div className="text-green-700">Loading...</div>}>
				<WorkspaceList apiKey={session.apikey as string}/>
			</Suspense>
		</>
    )
}
