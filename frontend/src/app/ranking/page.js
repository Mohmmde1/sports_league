import {getGames, getTeams} from '@/lib/actions'
import DataTableDemo from './RankTable';
import {Card, CardContent, CardDescription, CardTitle} from '@/components/ui/card';

export default async function Layout({ children}) {

    const games = await getGames();

    const ranking = await getTeams();
      
    return(

        <div className="container m-11">
            <Card className="m-11 space-x-5 space-y-5 ">
            <CardTitle className="m-4" >Ranking</CardTitle>
            <CardDescription >View the current ranking of teams in the league</CardDescription>
            <CardContent>

            <DataTableDemo  games={games} rankings={ranking}/>
            </CardContent>
            {children}
            </Card>
        </div>
    )}