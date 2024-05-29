'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/r8LPCNqu0TW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog';
import {Label} from '@/components/ui/label';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {addGame, getTeams} from '@/lib/actions'; // Adjust the import path accordingly
import {toast} from 'sonner';

export default function AddGame() {
  const [team1Id, setTeam1Id] = useState('');
  const [team2Id, setTeam2Id] = useState('');
  const [team1Score, setTeam1Score] = useState('');
  const [team2Score, setTeam2Score] = useState('');
  const [teams, setTeams] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    const formattedData = {
      team1: {
        name: team1Id || '',
        points: 0
      },
      team2: {
        name: team2Id || '',
        points: 0
      },
      team1_score: parseInt(team1Score, 10),
      team2_score: parseInt(team2Score, 10),
    };

    try {
      if (!formattedData.team1_score || !formattedData.team2_score) {
        toast('Please enter valid scores');
        return;
      }
      const response = await addGame(formattedData);
      if (response.id) {
        console.log('Game added successfully:', response);
        toast('Game added successfully');
        window.location.reload();
      } else {
        console.error('Error adding game:', response.error);
        toast(response.error);
      }
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      // Fetch teams data
      await getTeams().then(data => {
        setTeams(data);
      });
    };

    fetchTeams();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2">Add Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
          <DialogDescription>
            Enter the details for the game you want to add.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="team-name-1">Team Name</Label>
              <Select
                id="team-name-1"
                onValueChange={value => {
                  setTeam1Id(value);
                }}
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
                  setTeam2Id(value);
                }}
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
