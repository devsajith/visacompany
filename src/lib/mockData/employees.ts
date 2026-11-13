import { Employee } from "@/types";

export const initialEmployees: Employee[] = [
  // --- SUPER LOGISTICS HQ ---
  {
    id: "emp-1",
    employeeId: "SL-1001",
    fullName: "Khalid Mansour Al-Ghamdi",
    arabicName: "خالد منصور الغامدي",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1982-05-14",
    phone: "+966 50 123 4567",
    email: "khalid.m@superlogistics.sa",
    nationalId: "1029384756",
    companyId: "comp-1",
    companyName: "Super Logistics KSA (Holding)",
    designation: "Chief Operations Officer",
    department: "Executive Management",
    joiningDate: "2018-04-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2029-04-01",
    passportExpiry: "2028-08-15",
    licenseExpiry: "2027-05-10",
    contractExpiry: "2028-04-01",
    insuranceExpiry: "2027-03-31",
    emergencyContact: { name: "Fatima Al-Ghamdi", relationship: "Spouse", phone: "+966 50 987 6543" },
  },
  {
    id: "emp-2",
    employeeId: "SL-1002",
    fullName: "Ahmed Mostafa El-Sayed",
    arabicName: "أحمد مصطفى السيد",
    gender: "MALE",
    nationality: "Egyptian",
    dateOfBirth: "1987-11-20",
    phone: "+966 54 234 5678",
    email: "ahmed.sayed@superlogistics.sa",
    nationalId: "2482910482",
    companyId: "comp-1",
    companyName: "Super Logistics KSA (Holding)",
    designation: "Central HR & Compliance Director",
    department: "Human Resources",
    joiningDate: "2019-01-15",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-11-18", // Within 7 days!
    passportExpiry: "2027-04-20",
    licenseExpiry: "2026-12-05", // Within 30 days!
    contractExpiry: "2027-01-15",
    insuranceExpiry: "2027-01-31",
    emergencyContact: { name: "Noha El-Sayed", relationship: "Spouse", phone: "+966 54 991 2233" },
  },
  {
    id: "emp-3",
    employeeId: "SL-1003",
    fullName: "Muhammad Rizwan Khan",
    arabicName: "محمد رضوان خان",
    gender: "MALE",
    nationality: "Pakistani",
    dateOfBirth: "1985-03-10",
    phone: "+966 55 345 6789",
    email: "rizwan.khan@superlogistics.sa",
    nationalId: "2391029481",
    companyId: "comp-1",
    companyName: "Super Logistics KSA (Holding)",
    designation: "Senior Fleet Logistics Controller",
    department: "Fleet Operations",
    joiningDate: "2019-08-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-11-05", // Expired!
    passportExpiry: "2027-09-12",
    licenseExpiry: "2026-11-20", // Within 7 days!
    contractExpiry: "2027-08-01",
    insuranceExpiry: "2026-11-01", // Expired!
    emergencyContact: { name: "Imran Khan", relationship: "Brother", phone: "+966 55 882 1199" },
  },
  {
    id: "emp-4",
    employeeId: "SL-1004",
    fullName: "Suresh Kumar Nair",
    arabicName: "سوريش كومار ناير",
    gender: "MALE",
    nationality: "Indian",
    dateOfBirth: "1990-07-22",
    phone: "+966 56 456 7890",
    email: "suresh.nair@superlogistics.sa",
    nationalId: "2401928374",
    companyId: "comp-1",
    companyName: "Super Logistics KSA (Holding)",
    designation: "Heavy Trailer Lead Driver",
    department: "Transport Operations",
    joiningDate: "2020-03-10",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-12-08", // Within 30 days!
    passportExpiry: "2027-06-30",
    licenseExpiry: "2026-11-10", // Expired!
    contractExpiry: "2027-03-10",
    insuranceExpiry: "2026-12-15", // Within 30 days!
    emergencyContact: { name: "Ramesh Nair", relationship: "Cousin", phone: "+966 56 123 9988" },
  },
  {
    id: "emp-5",
    employeeId: "SL-1005",
    fullName: "Abdulaziz Saad Al-Otaibi",
    arabicName: "عبدالعزيز سعد العتيبي",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1993-09-05",
    phone: "+966 50 567 8901",
    email: "abdulaziz.otaibi@superlogistics.sa",
    nationalId: "1083726194",
    companyId: "comp-1",
    companyName: "Super Logistics KSA (Holding)",
    designation: "Senior Legal & Government Relations Officer",
    department: "Legal & Public Relations",
    joiningDate: "2020-07-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2032-01-01",
    passportExpiry: "2028-11-20",
    licenseExpiry: "2027-08-14",
    contractExpiry: "2027-07-01",
    insuranceExpiry: "2027-02-28",
    emergencyContact: { name: "Saad Al-Otaibi", relationship: "Father", phone: "+966 50 443 2211" },
  },
  {
    id: "emp-6",
    employeeId: "SL-1006",
    fullName: "Nouf Abdullah Al-Shehri",
    arabicName: "نوف عبدالله الشهري",
    gender: "FEMALE",
    nationality: "Saudi",
    dateOfBirth: "1995-12-03",
    phone: "+966 54 678 9012",
    email: "nouf.shehri@superlogistics.sa",
    nationalId: "1092837461",
    companyId: "comp-1",
    companyName: "Super Logistics KSA (Holding)",
    designation: "Financial Controller & Compliance",
    department: "Finance & Accounts",
    joiningDate: "2021-02-15",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2033-05-10",
    passportExpiry: "2029-03-15",
    licenseExpiry: "2028-02-10",
    contractExpiry: "2027-02-15",
    insuranceExpiry: "2027-01-31",
    emergencyContact: { name: "Abdullah Al-Shehri", relationship: "Father", phone: "+966 54 112 3344" },
  },

  // --- SUPER COLDCHAIN SOLUTIONS ---
  {
    id: "emp-7",
    employeeId: "SCC-2001",
    fullName: "Ziad Tariq Al-Ghamdi",
    arabicName: "زياد طارق الغامدي",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1984-06-18",
    phone: "+966 50 789 0123",
    email: "ziad.g@supercoldchain.sa",
    nationalId: "1038472910",
    companyId: "comp-2",
    companyName: "Super ColdChain Logistics Ltd",
    designation: "Cold Chain Operations General Manager",
    department: "Executive Management",
    joiningDate: "2019-07-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2030-01-01",
    passportExpiry: "2027-10-10",
    licenseExpiry: "2027-04-12",
    contractExpiry: "2027-07-01",
    insuranceExpiry: "2026-11-19", // Within 7 days!
    emergencyContact: { name: "Maha Al-Ghamdi", relationship: "Spouse", phone: "+966 50 665 4433" },
  },
  {
    id: "emp-8",
    employeeId: "SCC-2002",
    fullName: "Mahmoud Hassan Abdelrahman",
    arabicName: "محمود حسن عبدالرحمن",
    gender: "MALE",
    nationality: "Egyptian",
    dateOfBirth: "1988-04-12",
    phone: "+966 55 890 1234",
    email: "mahmoud.h@supercoldchain.sa",
    nationalId: "2419283746",
    companyId: "comp-2",
    companyName: "Super ColdChain Logistics Ltd",
    designation: "Refrigeration Systems Lead Engineer",
    department: "Engineering & Maintenance",
    joiningDate: "2019-10-15",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-12-28", // Within 60 days
    passportExpiry: "2026-11-02", // Expired!
    licenseExpiry: "2027-05-18",
    contractExpiry: "2027-10-15",
    insuranceExpiry: "2027-04-30",
    emergencyContact: { name: "Amira Hassan", relationship: "Spouse", phone: "+966 55 771 8822" },
  },
  {
    id: "emp-9",
    employeeId: "SCC-2003",
    fullName: "Rodel Santos Bautista",
    arabicName: "روديل سانتوس باوتيستا",
    gender: "MALE",
    nationality: "Filipino",
    dateOfBirth: "1991-08-30",
    phone: "+966 56 901 2345",
    email: "rodel.bautista@supercoldchain.sa",
    nationalId: "2430192834",
    companyId: "comp-2",
    companyName: "Super ColdChain Logistics Ltd",
    designation: "Refrigerated Reefer Truck Captain",
    department: "Transport Operations",
    joiningDate: "2020-01-20",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-11-16", // Within 7 days!
    passportExpiry: "2027-08-14",
    licenseExpiry: "2026-11-14", // Within 7 days!
    contractExpiry: "2027-01-20",
    insuranceExpiry: "2026-12-20", // Within 60 days
    emergencyContact: { name: "Elena Bautista", relationship: "Spouse", phone: "+966 56 332 1100" },
  },
  {
    id: "emp-10",
    employeeId: "SCC-2004",
    fullName: "Faisal Fahad Al-Amri",
    arabicName: "فيصل فهد العمري",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1994-02-17",
    phone: "+966 50 012 3456",
    email: "faisal.amri@supercoldchain.sa",
    nationalId: "1098273645",
    companyId: "comp-2",
    companyName: "Super ColdChain Logistics Ltd",
    designation: "Pharma Cold Chain Quality Inspector",
    department: "Quality & Compliance",
    joiningDate: "2021-05-10",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2031-10-15",
    passportExpiry: "2028-09-01",
    licenseExpiry: "2027-11-25",
    contractExpiry: "2027-05-10",
    insuranceExpiry: "2027-03-31",
    emergencyContact: { name: "Fahad Al-Amri", relationship: "Father", phone: "+966 50 119 8877" },
  },
  {
    id: "emp-11",
    employeeId: "SCC-2005",
    fullName: "Tariq Jameel Akhtar",
    arabicName: "طارق جميل أختر",
    gender: "MALE",
    nationality: "Pakistani",
    dateOfBirth: "1989-10-09",
    phone: "+966 54 123 4567",
    email: "tariq.akhtar@supercoldchain.sa",
    nationalId: "2449102938",
    companyId: "comp-2",
    companyName: "Super ColdChain Logistics Ltd",
    designation: "Cold Room Logistics Supervisor",
    department: "Warehouse & Staging",
    joiningDate: "2020-09-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-11-01", // Expired!
    passportExpiry: "2027-03-18",
    licenseExpiry: "2027-06-22",
    contractExpiry: "2027-09-01",
    insuranceExpiry: "2026-11-05", // Expired!
    emergencyContact: { name: "Shahid Akhtar", relationship: "Brother", phone: "+966 54 554 4332" },
  },

  // --- DESERT EXPRESS FREIGHT SERVICES ---
  {
    id: "emp-12",
    employeeId: "DEF-3001",
    fullName: "Turki Mansour Al-Subaie",
    arabicName: "تركي منصور السبيعي",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1983-01-25",
    phone: "+966 55 234 5678",
    email: "turki.subaie@desertexpress.sa",
    nationalId: "1019283746",
    companyId: "comp-3",
    companyName: "Desert Express Freight Services",
    designation: "Eastern Province Fleet Director",
    department: "Executive Management",
    joiningDate: "2019-11-10",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2030-05-15",
    passportExpiry: "2028-02-14",
    licenseExpiry: "2027-03-10",
    contractExpiry: "2027-11-10",
    insuranceExpiry: "2027-05-31",
    emergencyContact: { name: "Mansour Al-Subaie", relationship: "Father", phone: "+966 55 110 9988" },
  },
  {
    id: "emp-13",
    employeeId: "DEF-3002",
    fullName: "Arshad Mehmood Butt",
    arabicName: "أرشد محمود بت",
    gender: "MALE",
    nationality: "Pakistani",
    dateOfBirth: "1986-12-14",
    phone: "+966 56 345 6789",
    email: "arshad.butt@desertexpress.sa",
    nationalId: "2450192837",
    companyId: "comp-3",
    companyName: "Desert Express Freight Services",
    designation: "Heavy Haulage Convoy Master",
    department: "Transport Operations",
    joiningDate: "2020-02-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-11-25", // Within 30 days!
    passportExpiry: "2027-05-20",
    licenseExpiry: "2026-11-17", // Within 7 days!
    contractExpiry: "2027-02-01",
    insuranceExpiry: "2027-04-15",
    emergencyContact: { name: "Nadeem Butt", relationship: "Brother", phone: "+966 56 667 8899" },
  },
  {
    id: "emp-14",
    employeeId: "DEF-3003",
    fullName: "Rajesh Kumar Sharma",
    arabicName: "راجيش كومار شارما",
    gender: "MALE",
    nationality: "Indian",
    dateOfBirth: "1992-03-18",
    phone: "+966 50 456 7890",
    email: "rajesh.sharma@desertexpress.sa",
    nationalId: "2461928374",
    companyId: "comp-3",
    companyName: "Desert Express Freight Services",
    designation: "Heavy Equipment Diesel Mechanic",
    department: "Workshop & Maintenance",
    joiningDate: "2021-04-12",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2027-01-05", // Within 60 days
    passportExpiry: "2026-11-08", // Expired!
    licenseExpiry: "2027-07-19",
    contractExpiry: "2027-04-12",
    insuranceExpiry: "2026-12-10", // Within 30 days!
    emergencyContact: { name: "Sunil Sharma", relationship: "Brother", phone: "+966 50 223 4455" },
  },

  // --- RED SEA MARINE LOGISTICS ---
  {
    id: "emp-15",
    employeeId: "RSM-4001",
    fullName: "Saleh Salem Ba-Faraj",
    arabicName: "صالح سالم بافرج",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1981-08-11",
    phone: "+966 54 567 8901",
    email: "saleh.bafaraj@redseamarine.sa",
    nationalId: "1049283746",
    companyId: "comp-4",
    companyName: "Red Sea Marine Logistics & Customs",
    designation: "Chief Customs Clearance Broker",
    department: "Customs & Port Operations",
    joiningDate: "2020-01-15",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2031-08-01",
    passportExpiry: "2028-06-25",
    licenseExpiry: "2027-09-15",
    contractExpiry: "2027-01-15",
    insuranceExpiry: "2027-06-30",
    emergencyContact: { name: "Salem Ba-Faraj", relationship: "Father", phone: "+966 54 887 6655" },
  },
  {
    id: "emp-16",
    employeeId: "RSM-4002",
    fullName: "Hesham Adel Qasim",
    arabicName: "هشام عادل قاسم",
    gender: "MALE",
    nationality: "Egyptian",
    dateOfBirth: "1989-05-22",
    phone: "+966 55 678 9012",
    email: "hesham.qasim@redseamarine.sa",
    nationalId: "2470192837",
    companyId: "comp-4",
    companyName: "Red Sea Marine Logistics & Customs",
    designation: "Port Gate & Stevedoring Dispatcher",
    department: "Customs & Port Operations",
    joiningDate: "2020-06-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-11-20", // Within 7 days!
    passportExpiry: "2027-11-30",
    licenseExpiry: "2027-03-22",
    contractExpiry: "2027-06-01",
    insuranceExpiry: "2026-11-28", // Within 30 days!
    emergencyContact: { name: "Mona Qasim", relationship: "Sister", phone: "+966 55 441 2233" },
  },

  // --- NAJD LAND TRANSPORT ---
  {
    id: "emp-17",
    employeeId: "NLT-5001",
    fullName: "Hazza Saad Al-Malki",
    arabicName: "هزاع سعد المالكي",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1986-09-14",
    phone: "+966 56 789 0123",
    email: "hazza.malki@najdtransport.sa",
    nationalId: "1059283741",
    companyId: "comp-5",
    companyName: "Najd Land Transport Corporation",
    designation: "Long-Haul Operations Manager",
    department: "Transport Operations",
    joiningDate: "2020-05-20",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2032-04-10",
    passportExpiry: "2028-10-12",
    licenseExpiry: "2027-11-04",
    contractExpiry: "2027-05-20",
    insuranceExpiry: "2027-08-31",
    emergencyContact: { name: "Saad Al-Malki", relationship: "Father", phone: "+966 56 990 1122" },
  },
  {
    id: "emp-18",
    employeeId: "NLT-5002",
    fullName: "Kamal Hossain Mollah",
    arabicName: "كمال حسين ملا",
    gender: "MALE",
    nationality: "Bangladeshi",
    dateOfBirth: "1993-02-11",
    phone: "+966 50 890 1234",
    email: "kamal.mollah@najdtransport.sa",
    nationalId: "2481928374",
    companyId: "comp-5",
    companyName: "Najd Land Transport Corporation",
    designation: "Heavy Rig Truck Operator",
    department: "Transport Operations",
    joiningDate: "2021-01-10",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-11-08", // Expired!
    passportExpiry: "2027-04-10",
    licenseExpiry: "2026-11-02", // Expired!
    contractExpiry: "2027-01-10",
    insuranceExpiry: "2026-11-12", // Expired!
    emergencyContact: { name: "Faruk Hossain", relationship: "Brother", phone: "+966 50 776 5544" },
  },

  // --- GULF AIR CARGO ---
  {
    id: "emp-19",
    employeeId: "GAC-6001",
    fullName: "Saud Fahad Al-Shammary",
    arabicName: "سعود فهد الشمري",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1987-10-30",
    phone: "+966 54 901 2345",
    email: "saud.shammary@gulfaircargo.sa",
    nationalId: "1068273645",
    companyId: "comp-6",
    companyName: "Gulf Air Cargo & Courier Services",
    designation: "Air Cargo Handling Station Head",
    department: "Aviation Logistics",
    joiningDate: "2021-02-10",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2031-11-15",
    passportExpiry: "2029-01-20",
    licenseExpiry: "2028-05-18",
    contractExpiry: "2027-02-10",
    insuranceExpiry: "2027-07-31",
    emergencyContact: { name: "Fahad Al-Shammary", relationship: "Father", phone: "+966 54 332 1100" },
  },
  {
    id: "emp-20",
    employeeId: "GAC-6002",
    fullName: "Mark Anthony Villanueva",
    arabicName: "مارك أنتوني فيلانويفا",
    gender: "MALE",
    nationality: "Filipino",
    dateOfBirth: "1994-06-15",
    phone: "+966 55 012 3456",
    email: "mark.villanueva@gulfaircargo.sa",
    nationalId: "2491029384",
    companyId: "comp-6",
    companyName: "Gulf Air Cargo & Courier Services",
    designation: "IATA Dangerous Goods Specialist",
    department: "Aviation Compliance",
    joiningDate: "2021-07-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-12-14", // Within 30 days!
    passportExpiry: "2027-09-20",
    licenseExpiry: "2027-10-15",
    contractExpiry: "2027-07-01",
    insuranceExpiry: "2026-11-30", // Within 30 days!
    emergencyContact: { name: "Maria Villanueva", relationship: "Sister", phone: "+966 55 998 7766" },
  },

  // --- TUWAIQ FULFILMENT ---
  {
    id: "emp-21",
    employeeId: "TWQ-7001",
    fullName: "Reem Fahad Al-Mutairi",
    arabicName: "ريم فهد المطيري",
    gender: "FEMALE",
    nationality: "Saudi",
    dateOfBirth: "1991-03-28",
    phone: "+966 56 123 4567",
    email: "reem.mutairi@tuwaiqhub.sa",
    nationalId: "1078273645",
    companyId: "comp-7",
    companyName: "Tuwaiq Fulfilment & E-Commerce Hub",
    designation: "Fulfilment Center Director",
    department: "Warehousing & Automation",
    joiningDate: "2021-08-20",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2032-09-01",
    passportExpiry: "2029-07-15",
    licenseExpiry: "2028-06-20",
    contractExpiry: "2027-08-20",
    insuranceExpiry: "2027-09-30",
    emergencyContact: { name: "Fahad Al-Mutairi", relationship: "Father", phone: "+966 56 221 3344" },
  },
  {
    id: "emp-22",
    employeeId: "TWQ-7002",
    fullName: "Sami Saad Al-Olayan",
    arabicName: "سامي سعد العليان",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1995-11-19",
    phone: "+966 50 234 5678",
    email: "sami.olayan@tuwaiqhub.sa",
    nationalId: "1089283741",
    companyId: "comp-7",
    companyName: "Tuwaiq Fulfilment & E-Commerce Hub",
    designation: "Automated Sortation Manager",
    department: "Operations & Sorting",
    joiningDate: "2022-01-15",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2033-02-15",
    passportExpiry: "2028-08-20",
    licenseExpiry: "2027-05-30",
    contractExpiry: "2027-01-15",
    insuranceExpiry: "2026-11-16", // Within 7 days!
    emergencyContact: { name: "Saad Al-Olayan", relationship: "Father", phone: "+966 50 889 0011" },
  },

  // --- ARAMCO CORRIDOR HEAVY HAULAGE ---
  {
    id: "emp-23",
    employeeId: "ACH-8001",
    fullName: "Ibrahim Ali Al-Qahtani",
    arabicName: "إبراهيم علي القحطاني",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1982-12-05",
    phone: "+966 54 345 6789",
    email: "ibrahim.qahtani@aramcocorridor.sa",
    nationalId: "1018273645",
    companyId: "comp-8",
    companyName: "Aramco Corridor Heavy Haulage",
    designation: "Heavy Industrial Logistics VP",
    department: "Executive Management",
    joiningDate: "2022-02-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2031-03-10",
    passportExpiry: "2028-12-18",
    licenseExpiry: "2027-04-14",
    contractExpiry: "2028-02-01",
    insuranceExpiry: "2027-10-31",
    emergencyContact: { name: "Ali Al-Qahtani", relationship: "Father", phone: "+966 54 776 5544" },
  },
  {
    id: "emp-24",
    employeeId: "ACH-8002",
    fullName: "Mazen Salem Al-Ghamdi",
    arabicName: "مازن سالم الغامدي",
    gender: "MALE",
    nationality: "Saudi",
    dateOfBirth: "1988-07-14",
    phone: "+966 55 456 7890",
    email: "mazen.ghamdi@aramcocorridor.sa",
    nationalId: "1091827364",
    companyId: "comp-8",
    companyName: "Aramco Corridor Heavy Haulage",
    designation: "Aramco Safety & Rigging Superintendent",
    department: "HSE & Rigging",
    joiningDate: "2022-04-01",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2032-06-20",
    passportExpiry: "2027-08-30",
    licenseExpiry: "2026-11-09", // Expired!
    contractExpiry: "2027-04-01",
    insuranceExpiry: "2027-01-15",
    emergencyContact: { name: "Salem Al-Ghamdi", relationship: "Father", phone: "+966 55 332 9988" },
  },
  {
    id: "emp-25",
    employeeId: "ACH-8003",
    fullName: "Bashir Ahmad Tarar",
    arabicName: "بشير أحمد تارر",
    gender: "MALE",
    nationality: "Pakistani",
    dateOfBirth: "1987-03-29",
    phone: "+966 56 567 8901",
    email: "bashir.tarar@aramcocorridor.sa",
    nationalId: "2499182736",
    companyId: "comp-8",
    companyName: "Aramco Corridor Heavy Haulage",
    designation: "Hydraulic Multi-Axle Modular Driver",
    department: "Special Transport",
    joiningDate: "2022-05-15",
    employmentType: "FULL_TIME",
    employmentStatus: "ACTIVE",
    iqamaExpiry: "2026-11-19", // Within 7 days!
    passportExpiry: "2027-10-05",
    licenseExpiry: "2026-11-15", // Within 7 days!
    contractExpiry: "2027-05-15",
    insuranceExpiry: "2026-12-01", // Within 30 days!
    emergencyContact: { name: "Usman Tarar", relationship: "Brother", phone: "+966 56 443 2211" },
  },
];

// Dynamically generate the remaining realistic records up to 105 total employees
const companiesList = [
  { id: "comp-1", name: "Super Logistics KSA (Holding)", code: "SL", brId: "br-1", brName: "Riyadh Olaya Central HQ" },
  { id: "comp-2", name: "Super ColdChain Logistics Ltd", code: "SCC", brId: "br-4", brName: "Jeddah South Cold Hub A" },
  { id: "comp-3", name: "Desert Express Freight Services", code: "DEF", brId: "br-7", brName: "Dammam 2nd Industrial Hub" },
  { id: "comp-4", name: "Red Sea Marine Logistics & Customs", code: "RSM", brId: "br-9", brName: "Jeddah Islamic Port Terminal 2" },
  { id: "comp-5", name: "Najd Land Transport Corporation", code: "NLT", brId: "br-11", brName: "Riyadh Ring Road Fleet Yard" },
  { id: "comp-6", name: "Gulf Air Cargo & Courier Services", code: "GAC", brId: "br-13", brName: "Dammam Airport Cargo Terminal" },
  { id: "comp-7", name: "Tuwaiq Fulfilment & E-Commerce Hub", code: "TWQ", brId: "br-15", brName: "Tuwaiq Mega Fulfilment Center" },
  { id: "comp-8", name: "Aramco Corridor Heavy Haulage", code: "ACH", brId: "br-17", brName: "Jubail Heavy Equipment Base" },
  { id: "comp-9", name: "Madinah Express Distribution Co.", code: "MED", brId: "br-19", brName: "Madinah Central Depot" },
  { id: "comp-10", name: "Asir Southern Freightways", code: "ASF", brId: "br-21", brName: "Khamis Mushait Central Fleet" },
  { id: "comp-11", name: "Tabuk Northern Gateway Logistics", code: "TNG", brId: "br-23", brName: "Tabuk Highway Terminal" },
  { id: "comp-12", name: "Yanbu Petrochemical Tanker Fleet", code: "YPT", brId: "br-25", brName: "Yanbu Industrial Tanker Terminal" },
];

const firstNamesSaudi = ["Bandar", "Mishari", "Nawaf", "Fahad", "Sultan", "Badr", "Rayan", "Yasser", "Talal", "Hattan", "Meshal", "Zaid"];
const lastNamesSaudi = ["Al-Dosari", "Al-Harbi", "Al-Ghamdi", "Al-Otaibi", "Al-Shehri", "Al-Qahtani", "Al-Subaie", "Al-Mutairi", "Al-Zahrani", "Al-Bishi", "Al-Hakami", "Al-Khatib"];

const firstNamesExpats = ["Mohammad", "Ahmed", "Syed", "Farhan", "Rami", "Kareem", "Amit", "Vinod", "John", "Angelo", "Tariq", "Bilal", "Waleed", "Hassan", "Rashid", "Anil"];
const lastNamesExpats = ["Khan", "El-Sayed", "Hussain", "Sharma", "Santos", "Abdelaziz", "Reyes", "Iqbal", "Farooq", "Mahmoud", "Patel", "Varghese", "Ali", "Saleh", "Mustafa", "Rahman"];

const expatNationalities = ["Pakistani", "Egyptian", "Indian", "Filipino", "Jordanian", "Sudanese", "Bangladeshi", "Yemeni", "Lebanese"];

const logisticsDesignations = [
  { title: "Heavy Transport Fleet Captain", dept: "Transport Operations", basic: 5200 },
  { title: "Cold Storage Reefer Driver", dept: "Cold Chain Operations", basic: 5400 },
  { title: "Customs Clearance Expeditor", dept: "Customs & Port", basic: 6800 },
  { title: "Warehouse Forklift Specialist", dept: "Warehousing & Staging", basic: 4600 },
  { title: "Hazmat Tanker Operator", dept: "Hazardous Transport", basic: 6200 },
  { title: "Fleet Maintenance Technician", dept: "Fleet Maintenance", basic: 5600 },
  { title: "Dispatch & Routing Controller", dept: "Logistics Control", basic: 7500 },
  { title: "Hub Inventory Auditor", dept: "Supply Chain Audit", basic: 8200 },
  { title: "Safety & HSE Field Officer", dept: "Health & Safety", basic: 9500 },
  { title: "Cross-Docking Coordinator", dept: "Logistics Control", basic: 6500 },
  { title: "Terminal Gate Controller", dept: "Port & Terminal", basic: 5000 },
  { title: "Mobile Service Unit Mechanic", dept: "Fleet Maintenance", basic: 5800 },
];

// Generate indices 26 to 105
for (let i = 26; i <= 105; i++) {
  const isSaudi = i % 4 === 0; // ~25% additional Saudis
  const comp = companiesList[i % companiesList.length];
  const desig = logisticsDesignations[i % logisticsDesignations.length];
  
  let fullName = "";
  let nationality = "";
  let nationalIdPrefix = "";

  if (isSaudi) {
    const fn = firstNamesSaudi[(i + 3) % firstNamesSaudi.length];
    const ln = lastNamesSaudi[(i * 7) % lastNamesSaudi.length];
    fullName = `${fn} ${ln}`;
    nationality = "Saudi";
    nationalIdPrefix = "10";
  } else {
    const fn = firstNamesExpats[(i * 5) % firstNamesExpats.length];
    const ln = lastNamesExpats[(i * 3) % lastNamesExpats.length];
    fullName = `${fn} ${ln}`;
    nationality = expatNationalities[(i * 2) % expatNationalities.length];
    nationalIdPrefix = (24 + (i % 5)).toString();
  }

  const basic = desig.basic + (i % 6) * 350;
  const housing = Math.round(basic * 0.25);
  const transport = Math.round(basic * 0.1);
  const other = 500 + (i % 4) * 200;
  const deductions = Math.round(basic * (isSaudi ? 0.0975 : 0.05));
  const net = basic + housing + transport + other - deductions;

  // Stagger expirations across realistic ranges
  let iqamaDate = "2027-08-15";
  let licenseDate = "2027-10-20";
  let passportDate = "2028-04-10";
  let insuranceDate = "2027-05-30";
  let contractDate = "2027-12-31";

  if (i % 14 === 0) {
    // Expired
    iqamaDate = "2026-10-25";
    insuranceDate = "2026-10-18";
  } else if (i % 11 === 0) {
    // Within 7 days
    iqamaDate = "2026-11-17";
    licenseDate = "2026-11-19";
  } else if (i % 7 === 0) {
    // Within 30 days
    licenseDate = "2026-12-02";
    insuranceDate = "2026-12-08";
  } else if (i % 5 === 0) {
    // Within 60 days
    iqamaDate = "2027-01-05";
    insuranceDate = "2026-12-25";
  }

  const empStatus = i === 42 || i === 88 ? "INACTIVE" : i === 33 || i === 76 ? "ON_LEAVE" : "ACTIVE";

  initialEmployees.push({
    id: `emp-${i}`,
    employeeId: `${comp.code}-${1000 + i}`,
    fullName,
    gender: "MALE",
    nationality,
    dateOfBirth: `19${80 + (i % 18)}-0${(i % 9) + 1}-${10 + (i % 18)}`,
    phone: `+966 5${i % 9} ${(200 + i * 7).toString().padStart(3, '0')} ${(3000 + i * 11).toString().slice(0, 4)}`,
    email: `${fullName.toLowerCase().replace(/[^a-z]/g, '.')}.${i}@superlogistics.sa`,
    nationalId: `${nationalIdPrefix}${(10000000 + i * 827361).toString().slice(0, 8)}`,
    companyId: comp.id,
    companyName: comp.name,
    designation: desig.title,
    department: desig.dept,
    joiningDate: `202${(i % 4) + 0}-0${(i % 9) + 1}-${12 + (i % 15)}`,
    employmentType: "FULL_TIME",
    employmentStatus: empStatus,
    iqamaExpiry: iqamaDate,
    passportExpiry: passportDate,
    licenseExpiry: licenseDate,
    contractExpiry: contractDate,
    insuranceExpiry: insuranceDate,
    emergencyContact: {
      name: `${fullName.split(" ")[0]} Family`,
      relationship: "Kin",
      phone: `+966 5${(i + 1) % 9} 987 6543`,
    },
  });
}
