import { PriceEntry, ValidationQueueItem } from "@/types/masterData";

// Mock price entry data using master data structure
export const mockPriceEntries: PriceEntry[] = [
  {
    id: "PE001",
    date: "2024-12-08",
    timestamp: "2024-12-08T10:30:00",
    districtName: "Anakapalli",
    centerName: "ANK",
    commodityName: "Tomato",
    varietyName: "Arka Rakshak",
    gradeName: "A Grade",
    price: 62,
    unitOfMeasurement: "kg",
    reporterId: "EO_ANK",
    reporterName: "Rajesh Kumar",
    status: "flagged",
    submittedBefore2PM: true,
    priceDeviation: 24,
    thresholdBreached: true,
    remarks: "Sudden price increase due to supply shortage"
  },
  {
    id: "PE002",
    date: "2024-12-08",
    timestamp: "2024-12-08T11:15:00",
    districtName: "Anantapur",
    centerName: "ATP",
    commodityName: "Onions",
    varietyName: "Bellary Red",
    gradeName: "A Grade",
    price: 48,
    unitOfMeasurement: "kg",
    reporterId: "EO_ATP",
    reporterName: "A.Prathap Rudra",
    status: "approved",
    submittedBefore2PM: true,
    priceDeviation: 9,
    thresholdBreached: false
  },
  {
    id: "PE003",
    date: "2024-12-08",
    timestamp: "2024-12-08T09:45:00",
    districtName: "Alluri Sitharamaraju",
    centerName: "ASR",
    commodityName: "Potato",
    varietyName: "Kufri Jyoti",
    gradeName: "A Grade",
    price: 58,
    unitOfMeasurement: "kg",
    reporterId: "EO_ASR",
    reporterName: "Amarnath",
    status: "approved",
    submittedBefore2PM: true,
    priceDeviation: 7.4,
    thresholdBreached: false
  }
];

// Mock validation queue data
export const mockValidationQueue: ValidationQueueItem[] = [
  {
    id: "VQ001",
    priceEntry: mockPriceEntries[0],
    flagReason: "Price exceeds alert threshold by 24%",
    priority: "high"
  }
];

// Helper function to calculate price deviation
export const calculatePriceDeviation = (enteredPrice: number, alertPrice: number): number => {
  return ((enteredPrice - alertPrice) / alertPrice) * 100;
};

// Helper function to check if threshold is breached (example: 20% deviation)
export const isThresholdBreached = (deviation: number, threshold: number = 20): boolean => {
  return Math.abs(deviation) > threshold;
};
