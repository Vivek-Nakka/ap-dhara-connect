import { CommodityMaster } from "@/types/masterData";

// Commodity Master Data - derived from Commodity_Details_Master_Test.xlsx
export const commodityMasterData: CommodityMaster[] = [
  {
    sNo: 1,
    department: "RYTHU BAZAAR",
    commodityGroupName: "Vegetables",
    commodityName: "Bachalakura - Leafy Veg",
    submissionType: "DAILY",
    varietyName: "Local",
    gradeName: "Grade I",
    unitOfMeasurement: "bunch",
    alertPrice: 12
  },
  {
    sNo: 2,
    department: "RYTHU BAZAAR",
    commodityGroupName: "Vegetables",
    commodityName: "Banana (Raw)",
    submissionType: "DAILY",
    varietyName: "Cavendish",
    gradeName: "A Grade",
    unitOfMeasurement: "One Piece",
    alertPrice: 14
  },
  {
    sNo: 3,
    department: "RYTHU BAZAAR",
    commodityGroupName: "Vegetables",
    commodityName: "Beet Root",
    submissionType: "DAILY",
    varietyName: "Red Globe",
    gradeName: "A Grade",
    unitOfMeasurement: "kg",
    alertPrice: 72
  },
  {
    sNo: 4,
    department: "RYTHU BAZAAR",
    commodityGroupName: "Vegetables",
    commodityName: "Bhendi",
    submissionType: "DAILY",
    varietyName: "Arka Anamika",
    gradeName: "A Grade",
    unitOfMeasurement: "kg",
    alertPrice: 56
  },
  {
    sNo: 36,
    department: "RYTHU BAZAAR",
    commodityGroupName: "Vegetables",
    commodityName: "Tomato",
    submissionType: "DAILY",
    varietyName: "Arka Rakshak",
    gradeName: "A Grade",
    unitOfMeasurement: "kg",
    alertPrice: 50
  },
  {
    sNo: 28,
    department: "RYTHU BAZAAR",
    commodityGroupName: "Vegetables",
    commodityName: "Onions",
    submissionType: "DAILY",
    varietyName: "Bellary Red",
    gradeName: "A Grade",
    unitOfMeasurement: "kg",
    alertPrice: 44
  },
  {
    sNo: 32,
    department: "RYTHU BAZAAR",
    commodityGroupName: "Vegetables",
    commodityName: "Potato",
    submissionType: "DAILY",
    varietyName: "Kufri Jyoti",
    gradeName: "A Grade",
    unitOfMeasurement: "kg",
    alertPrice: 54
  },
  {
    sNo: 40,
    department: "PLANNING",
    commodityGroupName: "Grains",
    commodityName: "Rice",
    submissionType: "DAILY",
    varietyName: "Gidda Masuri, Molagolukulu, Jelakara Masuri",
    gradeName: "Grade-I (Fine)",
    unitOfMeasurement: "kg",
    alertPrice: 102
  },
  {
    sNo: 46,
    department: "PLANNING",
    commodityGroupName: "Pulses",
    commodityName: "Redgram Dal",
    submissionType: "DAILY",
    varietyName: "Local Medium",
    gradeName: "Grade II",
    unitOfMeasurement: "kg",
    alertPrice: 244
  },
  {
    sNo: 37,
    department: "PLANNING",
    commodityGroupName: "Edible Oils",
    commodityName: "Ground Nut Oil",
    submissionType: "DAILY",
    varietyName: "Local Popular",
    gradeName: "Refined",
    unitOfMeasurement: "ltr pkt",
    alertPrice: 322
  }
  // Add more commodities as needed from the master data
];

// Helper functions to work with commodity master data
export const getCommodityGroups = (): string[] => {
  return Array.from(new Set(commodityMasterData.map(c => c.commodityGroupName))).sort();
};

export const getCommoditiesByGroup = (group: string): CommodityMaster[] => {
  return commodityMasterData.filter(c => c.commodityGroupName === group);
};

export const getCommodityByName = (name: string): CommodityMaster | undefined => {
  return commodityMasterData.find(c => c.commodityName === name);
};

export const getAlertPrice = (commodityName: string, varietyName?: string, gradeName?: string): number | undefined => {
  const commodity = commodityMasterData.find(c => 
    c.commodityName === commodityName &&
    (!varietyName || c.varietyName === varietyName) &&
    (!gradeName || c.gradeName === gradeName)
  );
  return commodity?.alertPrice;
};

export const getAllCommodities = (): string[] => {
  return Array.from(new Set(commodityMasterData.map(c => c.commodityName))).sort();
};

export const getDailyCommodities = (): CommodityMaster[] => {
  return commodityMasterData.filter(c => c.submissionType === "DAILY");
};
