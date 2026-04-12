import { Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function CreateRewardDrawer() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleCreateReward = (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsDrawerOpen(false);
    }, 2000);
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetTrigger
        render={
          <Button className="cursor-pointer">
            <Plus /> Add New Reward
          </Button>
        }
      />
      <SheetContent className="sm:max-w-md backdrop-blur-xl bg-background/80 border-l border-border/40">
        <SheetHeader>
          <SheetTitle>Create New Reward</SheetTitle>
          <SheetDescription>
            Design a new reward or achievement to recognize team efforts.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleCreateReward} className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="title">Reward Title</Label>
            <Input
              id="title"
              placeholder="e.g. Employee of the Month"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="points">Points Value</Label>
              <Input id="points" type="number" placeholder="500" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Reward Type</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>One-time</option>
                <option>Recurring</option>
                <option>Achievement Badge</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dept">Target Departments</Label>
            <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/20">
              <Badge variant="secondary" className="cursor-pointer">
                All
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                Engineering
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                Sales
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                Product
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input id="expiry" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              placeholder="Briefly describe why this reward is granted..."
            />
          </div>
          <div className="space-y-2">
            <Label>Reward Icon</Label>
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-xl border-2 border-dashed border-border/60 flex items-center justify-center bg-muted/10 cursor-pointer hover:bg-muted/20 transition-colors">
                <Plus className="size-6 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                Upload or choose a preset icon
              </span>
            </div>
          </div>

          <SheetFooter className="pt-4">
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 relative overflow-hidden group"
            >
              {isSuccess ? (
                <span className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                  <CheckCircle2 className="size-4" /> Reward Created!
                </span>
              ) : (
                "Create and Assign Reward"
              )}
              {isSuccess && (
                <div className="absolute inset-0 bg-emerald-500 animate-in fade-in duration-500" />
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
