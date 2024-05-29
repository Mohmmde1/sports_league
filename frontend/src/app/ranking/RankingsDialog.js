// RankingsDialog.js
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RankingsDialog({ isOpen, onClose, rankings }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Rankings</DialogTitle>
          <DialogDescription>
            Each team is ranked based on their performance in the league. The ranking system assigns 3 points for a win, 0 points for a loss, and 1 point for a settlement.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((rank, index) => (
                <TableRow key={rank.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{rank.name}</TableCell>
                  <TableCell>{rank.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
