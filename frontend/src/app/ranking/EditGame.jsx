import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {editGame, getTeams} from '@/lib/actions';
import {Input} from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';

import {useEffect, useState} from 'react';
import { toast } from 'sonner';

export default function EditGame (data) {
  const [teams, setTeams] = useState ([]);
  const [team1Name, setTeam1Name] = useState (data.data.team1.name);
  const [team1Score, setTeam1Score] = useState (data.data.team1_score);
  const [team2Name, setTeam2Name] = useState (data.data.team2.name);
  const [team2Score, setTeam2Score] = useState (data.data.team2_score);
  useEffect (() => {
    const fetchData = async () => {
      await getTeams ().then (teamsData => {
        console.log ('teamsData', teamsData);
        setTeams (teamsData);
      });
    };
    fetchData ();
    console.log ('data:', data);
  }, []);
  const handleEdit = async e => {
    e.preventDefault ();
    const formattedData = {
      id: data.data.id,
      team1: {
        name: team1Name || '',
        points: team1Score,
      },
      team2: {
        name: team2Name || '',
        points: team2Score,
      },
    };
    try {
      const response = await editGame (formattedData);
      if (response.id) {
        console.log ('Game edited successfully:', response);
        toast ('Game edited successfully');
        window.location.reload()
      } else {
        toast (response.error);
        console.error ('Error editing game:', response.error);
      }
    } catch (error) {
      console.error ('Error editing game:', error);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>

        <Button variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Game</DialogTitle>
          <DialogDescription>
            Enter the details for the game you want to edit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEdit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="team-name-1">Team Name</Label>
              <Select
                id="team-name-1"
                onValueChange={value => {
                  setTeam1Name(value);
                }}
                defaultValue={team1Name}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team name" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-points-1">Team Points</Label>
              <Input
                id="team-points-1"
                placeholder="Enter team points"
                type="number"
                value={team1Score}
                onChange={e => setTeam1Score(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-name-2">Team Name</Label>
              <Select
                id="team-name-2"
                onValueChange={value => {
                  setTeam2Name(value);
                }}
                defaultValue={team2Name}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team name" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(team => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-points-2">Team Points</Label>
              <Input
                id="team-points-2"
                placeholder="Enter team points"
                type="number"
                value={team2Score}
                onChange={e => setTeam2Score(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
