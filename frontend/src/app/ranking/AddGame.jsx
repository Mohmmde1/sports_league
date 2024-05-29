'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/r8LPCNqu0TW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function AddGame({data}) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="outline">Add Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
          <DialogDescription>Enter the details for the game you want to add.</DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="team-name-1">Team Name</Label>
              <Select id="team-name-1">
                <SelectTrigger>
                  <SelectValue placeholder="Select team name" />
                </SelectTrigger>
                <SelectContent>
                  {data.map((team) => (<SelectItem key={team.id}  value={team.name}>{team.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-points-1">Team Points</Label>
              <Input id="team-points-1" placeholder="Enter team points" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-name-2">Team Name</Label>
              <Select id="team-name-2">
                <SelectTrigger>
                  <SelectValue placeholder="Select team name" />
                </SelectTrigger>
                <SelectContent>
                {data.map((team) => (<SelectItem key={team.id}  value={team.name}>{team.name}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-points-2">Team Points</Label>
              <Input id="team-points-2" placeholder="Enter team points" type="number" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}