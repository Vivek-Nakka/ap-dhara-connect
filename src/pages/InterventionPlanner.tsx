import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Plus, FileText, TrendingUp, TrendingDown } from "lucide-react";

const timeline = [
  {
    id: 1,
    title: "Tomato Price Control",
    type: "Supply Augmentation",
    startDate: "Dec 1",
    endDate: "Dec 15",
    status: "In Progress",
    districts: ["Guntur", "Krishna"],
    progress: 65,
  },
  {
    id: 2,
    title: "Onion Import Program",
    type: "Import",
    startDate: "Dec 10",
    endDate: "Dec 31",
    status: "Planned",
    districts: ["Kurnool", "Anantapur"],
    progress: 0,
  },
  {
    id: 3,
    title: "Rice Distribution",
    type: "Direct Distribution",
    startDate: "Nov 15",
    endDate: "Nov 30",
    status: "Completed",
    districts: ["All Districts"],
    progress: 100,
  },
];

const impactAssessment = [
  {
    intervention: "Tomato Price Control",
    commodity: "Tomato",
    prePrice: 52,
    postPrice: 42,
    impact: -19.2,
    status: "Positive",
  },
  {
    intervention: "Rice Distribution",
    commodity: "Rice",
    prePrice: 48,
    postPrice: 38,
    impact: -20.8,
    status: "Positive",
  },
];

export default function InterventionPlanner() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Intervention Planner & Tracker</h1>
          <p className="text-muted-foreground">Plan, approve, and monitor market interventions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Intervention
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Intervention Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeline.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">{item.title}</div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Badge variant="outline">{item.type}</Badge>
                      <span>
                        {item.startDate} - {item.endDate}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      item.status === "In Progress"
                        ? "bg-primary/10 text-primary border-primary/30"
                        : item.status === "Completed"
                        ? "bg-success/10 text-success border-success/30"
                        : "bg-muted"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Districts:</span>
                  {item.districts.map((d, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {d}
                    </Badge>
                  ))}
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full ${
                      item.status === "Completed"
                        ? "bg-success"
                        : item.status === "In Progress"
                        ? "bg-primary"
                        : "bg-muted-foreground"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{item.progress}% Complete</span>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              New Intervention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="commodity">Commodity</Label>
              <Select>
                <SelectTrigger id="commodity">
                  <SelectValue placeholder="Select commodity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="onion">Onion</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Intervention Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supply">Supply Augmentation</SelectItem>
                  <SelectItem value="import">Import Program</SelectItem>
                  <SelectItem value="distribution">Direct Distribution</SelectItem>
                  <SelectItem value="buffer">Buffer Stock Release</SelectItem>
                  <SelectItem value="price">Price Control</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="districts">Target Districts</Label>
              <Input id="districts" placeholder="Enter district names" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="start">Start Date</Label>
                <Input id="start" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end">End Date</Label>
                <Input id="end" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget Estimate</Label>
              <Input id="budget" type="number" placeholder="Enter amount in lakhs" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the intervention strategy..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1">Submit for Review</Button>
              <Button variant="outline" className="flex-1">
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Impact Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {impactAssessment.map((assessment, i) => (
              <div
                key={i}
                className="p-4 bg-success/5 border border-success/20 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-lg">{assessment.intervention}</div>
                    <div className="text-sm text-muted-foreground">{assessment.commodity}</div>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    {assessment.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Pre-Intervention</div>
                    <div className="text-xl font-bold">₹{assessment.prePrice}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Post-Intervention</div>
                    <div className="text-xl font-bold text-success">₹{assessment.postPrice}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Impact</div>
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-4 w-4 text-success" />
                      <span className="text-xl font-bold text-success">
                        {assessment.impact.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
