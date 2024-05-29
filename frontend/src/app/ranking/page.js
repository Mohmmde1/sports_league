export const dynamic = 'force-dynamic';

import {getGames, getTeams} from '@/lib/actions'
import DataTable from './RankTable';
import {Card, CardContent, CardDescription, CardTitle} from '@/components/ui/card';

export default async function Layout({ children}) {

    const games = await getGames();

    const ranking = await getTeams();
      
    return(

        <div className="container m-11">
            <Card className="m-11 space-x-5 space-y-5 ">
            <CardTitle className="m-4" >Manage Games</CardTitle>
            <CardDescription >View the current games of teams in the league</CardDescription>
            <CardContent>

            {<DataTable  games={games} rankings={ranking}/>}
            </CardContent>
            {children}
            </Card>
        </div>
    )}