import { Workspace } from '@prisma/client';
import React from 'react'
import { useQuery } from 'react-query';

const getWorkspaces = async ( apiKey: string ) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workspace`, {
            method: 'GET',
            headers: {
                'Authorization': apiKey
            }
        });
        const workspaces: Workspace[] = await response.json();
        return workspaces;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default function WorkspaceList( {apiKey} : { apiKey: string } ) {
    const query = useQuery(["workspaces", apiKey], () => getWorkspaces(apiKey));
    
    if(query.isLoading) return <div>Loading...</div>

    return (
        <>
            {query.data!.map( (workspace) => (
                <div>{workspace.name}</div>
            ) )}
        </>
    )
}
