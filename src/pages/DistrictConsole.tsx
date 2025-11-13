import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bell, Eye, CheckCircle, Search, MapPin, Clock } from "lucide-react";

const centers = [
  {
    id: 1,
    name: "Guntur Market Center",
    assigned: 12,
    reported: 11,
    pending: 1,
    late: 0,
    quality: 98,
    lastUpdate: "11:45 AM",
  },
  {
    id: 2,
    name: "Tenali Wholesale Center",
    assigned: 8,
    reported: 8,
    pending: 0,
    late: 0,
    quality: 100,
    lastUpdate: "10:30 AM",
  },
  {
    id: 3,
    name: "Narasaraopet Center",
    assigned: 10,
    reported: 7,
    pending: 3,
    late: 2,
    quality: 85,
    lastUpdate: "09:15 AM",
  },
  {
    id: 4,
    name: "Sattenapalli Center",
    assigned: 6,
    reported: 6,
    pending: 0,
    late: 0,
    quality: 96,
    lastUpdate: "11:20 AM",
  },
  {
    id: 5,
    name: "Ponnur Market Center",
    assigned: 9,
    reported: 6,
    pending: 3,
    late: 1,
    quality: 78,
    lastUpdate: "08:45 AM",
  },
  {
    id: 6,
    name: "Chilakaluripet Center",
    assigned: 11,
    reported: 10,
    pending: 1,
    late: 0,
    quality: 94,
    lastUpdate: "11:00 AM",
  },
];

export default function DistrictConsole() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">District Operations Console</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>Guntur District</span>
            <Badge variant="outline" className="ml-2">6 Centers</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Send Bulk Reminder
          </Button>
          <Badge variant="outline" className="text-xs">
            <Clock className="mr-1 h-3 w-3" />
            Edit until 2 PM
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Commodities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <p className="text-xs text-muted-foreground mt-1">Across all centers</p>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reported Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">48</div>
            <p className="text-xs text-muted-foreground mt-1">85.7% completion</p>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">8</div>
            <p className="text-xs text-muted-foreground mt-1">3 centers affected</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Late Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground mt-1">After 2 PM deadline</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Center-wise Performance</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search centers..."
                  className="pl-8 w-[200px]"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Center Name</TableHead>
                <TableHead className="text-center">Assigned</TableHead>
                <TableHead className="text-center">Reported</TableHead>
                <TableHead className="text-center">Pending</TableHead>
                <TableHead className="text-center">Late</TableHead>
                <TableHead className="text-center">Quality %</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {centers.map((center) => (
                <TableRow key={center.id}>
                  <TableCell className="font-medium">{center.name}</TableCell>
                  <TableCell className="text-center">{center.assigned}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                      {center.reported}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {center.pending > 0 ? (
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                        {center.pending}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {center.late > 0 ? (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                        {center.late}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            center.quality >= 95
                              ? "bg-success"
                              : center.quality >= 85
                              ? "bg-warning"
                              : "bg-destructive"
                          }`}
                          style={{ width: `${center.quality}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{center.quality}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{center.lastUpdate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      {center.pending > 0 && (
                        <Button variant="ghost" size="sm" className="h-8">
                          <Bell className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {center.reported === center.assigned && (
                        <Button variant="ghost" size="sm" className="h-8 text-success">
                          <CheckCircle className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
