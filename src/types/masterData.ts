// Master Data Type Definitions

export interface UserMaster {
  sNo: number;
  department: string;
  districtName: string;
  revenueDivisionName: string;
  mandalName: string;
  centerName: string;
  officerName: string;
  officerMobileNumber: string;
  officerUserId: string;
  role: 'admin' | 'district_officer' | 'data_entry_operator';
}

export interface CommodityMaster {
  sNo: number;
  department: string;
  commodityGroupName: string;
  commodityName: string;
  submissionType: string;
  varietyName: string;
  gradeName: string;
  unitOfMeasurement: string;
  alertPrice: number;
}

export interface PriceEntry {
  id: string;
  date: string;
  timestamp: string;
  districtName: string;
  centerName: string;
  commodityName: string;
  varietyName: string;
  gradeName: string;
  price: number;
  unitOfMeasurement: string;
  reporterId: string;
  reporterName: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  photoUrl?: string;
  remarks?: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  submittedBefore2PM: boolean;
  priceDeviation?: number;
  thresholdBreached?: boolean;
}

export interface Intervention {
  id: string;
  title: string;
  type: string;
  commodityName: string;
  districts: string[];
  startDate: string;
  endDate: string;
  status: 'planned' | 'in_progress' | 'completed';
  progress: number;
  budgetEstimate?: number;
  description?: string;
  preInterventionPrice?: number;
  postInterventionPrice?: number;
  impact?: number;
}

export interface ValidationQueueItem {
  id: string;
  priceEntry: PriceEntry;
  flagReason: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}
