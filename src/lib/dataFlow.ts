/**
 * Data Flow Management for AP Consumer Affairs Portal
 * 
 * This module manages the data flow between different components of the system:
 * 1. Mobile App → Price Monitoring Module (price entries with GPS and photos)
 * 2. Price Monitoring → Validation Queue (threshold breaches)
 * 3. Validated Data → Analytics Warehouse (aggregation)
 * 4. Analytics → Market Intervention (trends and forecasts)
 * 5. Intervention Planner → Price Monitoring (impact tracking)
 */

import { PriceEntry, ValidationQueueItem, Intervention } from "@/types/masterData";
import { getAlertPrice, getCommodityByName } from "@/data/commodityMasterData";
import { calculatePriceDeviation, isThresholdBreached } from "@/data/mockPriceData";

/**
 * Process incoming price entry from mobile app
 * Validates against master data and checks thresholds
 */
export const processPriceEntry = (entry: Partial<PriceEntry>): PriceEntry => {
  const commodity = getCommodityByName(entry.commodityName || "");
  const alertPrice = getAlertPrice(
    entry.commodityName || "",
    entry.varietyName,
    entry.gradeName
  );

  const priceDeviation = alertPrice 
    ? calculatePriceDeviation(entry.price || 0, alertPrice)
    : 0;

  const thresholdBreached = isThresholdBreached(priceDeviation);

  return {
    id: entry.id || crypto.randomUUID(),
    date: entry.date || new Date().toISOString().split('T')[0],
    timestamp: entry.timestamp || new Date().toISOString(),
    districtName: entry.districtName || "",
    centerName: entry.centerName || "",
    commodityName: entry.commodityName || "",
    varietyName: entry.varietyName || commodity?.varietyName || "",
    gradeName: entry.gradeName || commodity?.gradeName || "",
    price: entry.price || 0,
    unitOfMeasurement: entry.unitOfMeasurement || commodity?.unitOfMeasurement || "kg",
    reporterId: entry.reporterId || "",
    reporterName: entry.reporterName || "",
    department: entry.department || "CIVIL",
    gpsLatitude: entry.gpsLatitude,
    gpsLongitude: entry.gpsLongitude,
    photoUrl: entry.photoUrl,
    remarks: entry.remarks,
    status: thresholdBreached ? "flagged" : "approved",
    submittedBefore2PM: checkSubmissionTime(entry.timestamp || new Date().toISOString()),
    priceDeviation,
    thresholdBreached,
  };
};

/**
 * Check if submission was before 2 PM
 */
const checkSubmissionTime = (timestamp: string): boolean => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  return hour < 14;
};

/**
 * Create validation queue item from flagged price entry
 */
export const createValidationQueueItem = (entry: PriceEntry): ValidationQueueItem => {
  const priority = Math.abs(entry.priceDeviation || 0) > 30 ? "high" 
    : Math.abs(entry.priceDeviation || 0) > 20 ? "medium" 
    : "low";

  return {
    id: `VQ_${entry.id}`,
    priceEntry: entry,
    flagReason: `Price ${entry.priceDeviation! > 0 ? 'increase' : 'decrease'} of ${Math.abs(entry.priceDeviation || 0).toFixed(1)}% exceeds threshold`,
    priority,
  };
};

/**
 * Calculate impact of intervention on prices
 */
export const calculateInterventionImpact = (
  preInterventionPrice: number,
  postInterventionPrice: number
): number => {
  return ((postInterventionPrice - preInterventionPrice) / preInterventionPrice) * 100;
};

/**
 * Link intervention to affected commodities for tracking
 */
export const linkInterventionToCommodity = (
  intervention: Intervention,
  commodityName: string
): void => {
  // This would update the intervention tracking in the database
  console.log(`Linking intervention ${intervention.id} to commodity ${commodityName}`);
};

/**
 * Data flow validation rules
 */
export const dataFlowRules = {
  // Mobile app must include GPS coordinates within 100m of center location
  validateGPSProximity: (latitude: number, longitude: number, centerLat: number, centerLon: number): boolean => {
    const distance = calculateDistance(latitude, longitude, centerLat, centerLon);
    return distance < 0.1; // 100 meters
  },

  // Photos must be uploaded with timestamp within 1 hour of entry
  validatePhotoTimestamp: (photoTime: Date, entryTime: Date): boolean => {
    const diffMinutes = Math.abs(photoTime.getTime() - entryTime.getTime()) / (1000 * 60);
    return diffMinutes < 60;
  },

  // Editing allowed only before 2 PM
  canEditEntry: (timestamp: string): boolean => {
    return checkSubmissionTime(timestamp);
  },

  // Validation must happen within 24 hours
  isValidationPending: (submissionTime: Date): boolean => {
    const hoursSinceSubmission = (Date.now() - submissionTime.getTime()) / (1000 * 60 * 60);
    return hoursSinceSubmission < 24;
  }
};

/**
 * Calculate distance between two GPS coordinates (in km)
 * Using Haversine formula
 */
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
