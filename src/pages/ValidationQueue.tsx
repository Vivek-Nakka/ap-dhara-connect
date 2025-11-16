import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, CheckCircle, XCircle, Image, MapPin, Search, TrendingUp } from "lucide-react";
import { mockPriceEntries } from "@/data/mockPriceData";
import { getAlertPrice } from "@/data/commodityMasterData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const validationQueue = mockPriceEntries.filter(entry => entry.thresholdBreached);

export default function ValidationQueue() {
  const navigate = useNavigate();
  const [selectedEntry, setSelectedEntry] = useState(validationQueue[0]);

  const handleApprove = () => {
    toast.success("Entry approved successfully");
  };

  const handleReject = () => {
    toast.error("Entry rejected");
  };

  const getYesterdayPrice = (commodityName: string, varietyName: string, gradeName: string) => {
    return getAlertPrice(commodityName, varietyName, gradeName) || 0;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Validation & Remarks Queue</h1>
          <p className="text-muted-foreground">Review and approve price entries with threshold breaches</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CheckCircle className="mr-2 h-4 w-4" />
            Bulk Approve
          </Button>
          <Button variant="outline" size="sm">
            <XCircle className="mr-2 h-4 w-4" />
            Bulk Reject
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{validationQueue.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Threshold breaches today</p>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">45</div>
            <p className="text-xs text-muted-foreground mt-1">Valid price changes</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground mt-1">Incorrect entries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Price Validation Queue</CardTitle>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search entries..."
                  className="pl-8 w-[200px]"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Center</TableHead>
                  <TableHead>Commodity</TableHead>
                  <TableHead className="text-right">Alert Price</TableHead>
                  <TableHead className="text-right">Entered</TableHead>
                  <TableHead className="text-right">Change %</TableHead>
                  <TableHead className="text-center">Proof</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {validationQueue.map((entry) => {
                  const alertPrice = getYesterdayPrice(entry.commodityName, entry.varietyName, entry.gradeName);
                  return (
                    <TableRow
                      key={entry.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <TableCell className="font-medium">{entry.reporterName}</TableCell>
                      <TableCell className="text-sm">{entry.centerName}</TableCell>
                      <TableCell>{entry.commodityName}</TableCell>
                      <TableCell className="text-right">₹{alertPrice}</TableCell>
                      <TableCell className="text-right font-medium">₹{entry.price}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            entry.thresholdBreached
                              ? (entry.priceDeviation || 0) > 0
                                ? "bg-warning/10 text-warning border-warning/30"
                                : "bg-success/10 text-success border-success/30"
                              : ""
                          }
                        >
                          {(entry.priceDeviation || 0) > 0 ? "+" : ""}
                          {(entry.priceDeviation || 0).toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {entry.photoUrl ? (
                          <Image className="h-4 w-4 text-success mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                          {entry.status === 'flagged' ? 'Pending' : entry.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Entry Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Commodity</div>
              <div className="text-lg font-bold">{selectedEntry.commodityName}</div>
              <div className="text-sm text-muted-foreground">{selectedEntry.varietyName} - {selectedEntry.gradeName}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-muted-foreground">Alert Price</div>
                <div className="text-xl font-bold">
                  ₹{getYesterdayPrice(selectedEntry.commodityName, selectedEntry.varietyName, selectedEntry.gradeName)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Entered Price</div>
                <div className="text-xl font-bold text-warning">₹{selectedEntry.price}</div>
              </div>
            </div>

            <div className="p-3 bg-warning/10 rounded-lg border border-warning/30">
              <div className="text-sm font-medium text-warning">Price Change</div>
              <div className="text-2xl font-bold text-warning">
                {(selectedEntry.priceDeviation || 0) > 0 ? "+" : ""}
                {(selectedEntry.priceDeviation || 0).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Threshold: ±20%
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Photo Proof</div>
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                <Image className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                GPS Location
              </div>
              <div className="w-full h-24 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-sm text-center">
                  <div className="font-mono text-xs">
                    {selectedEntry.gpsLatitude && selectedEntry.gpsLongitude 
                      ? `${selectedEntry.gpsLatitude.toFixed(4)}° N, ${selectedEntry.gpsLongitude.toFixed(4)}° E`
                      : 'GPS data not available'}
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">Map Preview</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Reporter's Remarks</div>
              <Textarea
                value={selectedEntry.remarks}
                readOnly
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button 
                className="flex-1 bg-success hover:bg-success/90"
                onClick={handleApprove}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleReject}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-2"
              onClick={() => navigate('/price-trends')}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Price Trends
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
