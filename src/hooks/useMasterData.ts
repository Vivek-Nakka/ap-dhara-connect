import { useMemo } from "react";
import { userMasterData, getAllDistricts, getAllCenters, getCentersByDistrict } from "@/data/userMasterData";
import { commodityMasterData, getAllCommodities, getCommodityGroups, getAlertPrice } from "@/data/commodityMasterData";

export const useMasterData = () => {
  const districts = useMemo(() => getAllDistricts(), []);
  const centers = useMemo(() => getAllCenters(), []);
  const commodities = useMemo(() => getAllCommodities(), []);
  const commodityGroups = useMemo(() => getCommodityGroups(), []);

  return {
    // User Master Data
    users: userMasterData,
    districts,
    centers,
    getCentersByDistrict,
    
    // Commodity Master Data
    commodities,
    commodityGroups,
    commodityMasterData,
    getAlertPrice,
  };
};
