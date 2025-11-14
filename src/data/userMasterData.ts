import { UserMaster } from "@/types/masterData";

// User Master Data - derived from User_Details_Master.xlsx
export const userMasterData: UserMaster[] = [
  {
    sNo: 1,
    department: "RYTHU BAZAAR",
    districtName: "Alluri Sitharamaraju",
    revenueDivisionName: "NA",
    mandalName: "ASR",
    centerName: "ASR",
    officerName: "Amarnath",
    officerMobileNumber: "9494329096",
    officerUserId: "EO_ASR",
    role: "data_entry_operator"
  },
  {
    sNo: 2,
    department: "RYTHU BAZAAR",
    districtName: "Anakapalli",
    revenueDivisionName: "NA",
    mandalName: "RYTHU_BAZAAR",
    centerName: "RYTHU_BAZAAR",
    officerName: "Rythu",
    officerMobileNumber: "9052011113",
    officerUserId: "TEST_RYTHU_BAZAAR",
    role: "data_entry_operator"
  },
  {
    sNo: 3,
    department: "RYTHU BAZAAR",
    districtName: "Anakapalli",
    revenueDivisionName: "NA",
    mandalName: "ANK",
    centerName: "ANK",
    officerName: "Rajesh Kumar",
    officerMobileNumber: "9177758939",
    officerUserId: "EO_ANK",
    role: "data_entry_operator"
  },
  {
    sNo: 4,
    department: "RYTHU BAZAAR",
    districtName: "Anantapur",
    revenueDivisionName: "NA",
    mandalName: "PRPRBZ",
    centerName: "PRPRBZ",
    officerName: "A. Pratap Rudra",
    officerMobileNumber: "8897047309",
    officerUserId: "RYZ_PRPRBZ",
    role: "data_entry_operator"
  },
  {
    sNo: 5,
    department: "RYTHU BAZAAR",
    districtName: "Ananthapuramu",
    revenueDivisionName: "NA",
    mandalName: "ATP",
    centerName: "ATP",
    officerName: "A.Prathap Rudra",
    officerMobileNumber: "8897047309",
    officerUserId: "EO_ATP",
    role: "data_entry_operator"
  }
  // Add more users as needed from the master data
];

// Helper functions to work with user master data
export const getDistrictsByDepartment = (department: string): string[] => {
  return Array.from(new Set(
    userMasterData
      .filter(user => user.department === department)
      .map(user => user.districtName)
  ));
};

export const getCentersByDistrict = (district: string): string[] => {
  return Array.from(new Set(
    userMasterData
      .filter(user => user.districtName === district)
      .map(user => user.centerName)
  ));
};

export const getUsersByCenter = (centerName: string): UserMaster[] => {
  return userMasterData.filter(user => user.centerName === centerName);
};

export const getAllDistricts = (): string[] => {
  return Array.from(new Set(userMasterData.map(user => user.districtName))).sort();
};

export const getAllCenters = (): string[] => {
  return Array.from(new Set(userMasterData.map(user => user.centerName))).sort();
};
