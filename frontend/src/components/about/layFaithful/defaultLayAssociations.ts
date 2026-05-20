import type { LayAssociation } from "../../../services/about/layFaithfulService";

const leaderImage =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80";

export const DEFAULT_LAY_ASSOCIATIONS: LayAssociation[] = [
  {
    id: "1",
    name: "Catholic Women Organisation",
    acronym: "CWO",
    category: "women",
    categoryLabel: "Women",
    description:
      "The diocesan body for Catholic women, family life, charity, parish support, and formation.",
    patronSaint: "Our Lady Queen of Peace",
    meetingSchedule: "Second Saturday of every month",
    imageUrl:
      "https://images.unsplash.com/photo-1543269664-7eef42226a21?w=900&q=80",
    chaplain: {
      id: "cwo-chaplain",
      name: "Rev. Fr. Emmanuel Adeyemi",
      role: "chaplain",
      roleLabel: "Chaplain",
      parish: "St. Patrick's Parish, Osogbo",
      deanery: "Cathedral Deanery",
      imageUrl: leaderImage,
      tenure: "2024 - Present",
    },
    officers: [
      {
        id: "cwo-president",
        name: "Lady Grace Folorunso",
        role: "president",
        roleLabel: "President",
        parish: "Holy Family Parish, Ile-Ife",
        deanery: "Ile-Ife Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=80",
        phone: "+234 803 000 1101",
        tenure: "2023 - 2026",
      },
      {
        id: "cwo-secretary",
        name: "Mrs. Cecilia Olaniyi",
        role: "secretary",
        roleLabel: "Secretary",
        parish: "St. Theresa Parish, Iwo",
        deanery: "Iwo Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=700&q=80",
        tenure: "2023 - 2026",
      },
    ],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Catholic Men Organisation",
    acronym: "CMO",
    category: "men",
    categoryLabel: "Men",
    description:
      "The association of Catholic men committed to leadership, stewardship, family witness, and parish development.",
    patronSaint: "St. Joseph",
    meetingSchedule: "Third Sunday after morning Mass",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80",
    chaplain: {
      id: "cmo-chaplain",
      name: "Rev. Fr. Michael Oladele",
      role: "chaplain",
      roleLabel: "Chaplain",
      parish: "Holy Family Parish, Ile-Ife",
      deanery: "Ile-Ife Deanery",
      imageUrl: leaderImage,
      tenure: "2024 - Present",
    },
    officers: [
      {
        id: "cmo-president",
        name: "Sir Anthony Adewale",
        role: "president",
        roleLabel: "President",
        parish: "St. Patrick's Parish, Osogbo",
        deanery: "Cathedral Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&q=80",
        phone: "+234 803 000 1201",
        tenure: "2023 - 2026",
      },
      {
        id: "cmo-treasurer",
        name: "Mr. Peter Adebayo",
        role: "treasurer",
        roleLabel: "Treasurer",
        parish: "St. Augustine Parish, Ede",
        deanery: "Ede Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&q=80",
        tenure: "2023 - 2026",
      },
    ],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Young Catholic Students",
    acronym: "YCS",
    category: "youth",
    categoryLabel: "Youth",
    description:
      "A student apostolate forming young Catholics through prayer, study, leadership, and service.",
    patronSaint: "St. John Bosco",
    meetingSchedule: "Campus and parish chapters meet weekly",
    imageUrl:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=900&q=80",
    chaplain: {
      id: "ycs-chaplain",
      name: "Rev. Fr. Daniel Oyelaran",
      role: "chaplain",
      roleLabel: "Chaplain",
      parish: "University Chaplaincy, Osogbo",
      deanery: "Cathedral Deanery",
      imageUrl: leaderImage,
      tenure: "2024 - Present",
    },
    officers: [
      {
        id: "ycs-president",
        name: "Mary Akinwale",
        role: "president",
        roleLabel: "President",
        parish: "Cathedral of Christ the King, Osogbo",
        deanery: "Cathedral Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=700&q=80",
        email: "ycs@osogbodiocese.org",
        tenure: "2025 - 2027",
      },
      {
        id: "ycs-secretary",
        name: "Joseph Oyediran",
        role: "secretary",
        roleLabel: "Secretary",
        parish: "Holy Family Parish, Ile-Ife",
        deanery: "Ile-Ife Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&q=80",
        tenure: "2025 - 2027",
      },
    ],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Catholic Youth Organisation of Nigeria",
    acronym: "CYON",
    category: "youth",
    categoryLabel: "Youth",
    description:
      "The umbrella Catholic youth body promoting evangelisation, leadership, culture, and parish youth participation.",
    meetingSchedule: "First Saturday of every month",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    chaplain: {
      id: "cyon-chaplain",
      name: "Rev. Fr. Joseph Bamidele",
      role: "chaplain",
      roleLabel: "Chaplain",
      parish: "St. Joseph Parish, Ikirun",
      deanery: "Ikirun Deanery",
      imageUrl: leaderImage,
      tenure: "2024 - Present",
    },
    officers: [
      {
        id: "cyon-coordinator",
        name: "Tunde Salami",
        role: "coordinator",
        roleLabel: "Coordinator",
        parish: "Sacred Heart Parish, Ejigbo",
        deanery: "Ejigbo Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=700&q=80",
        tenure: "2024 - 2026",
      },
      {
        id: "cyon-pro",
        name: "Blessing Ajayi",
        role: "pro",
        roleLabel: "Public Relations Officer",
        parish: "St. Augustine Parish, Ede",
        deanery: "Ede Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&q=80",
        tenure: "2024 - 2026",
      },
    ],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    name: "Legion of Mary",
    acronym: "LOM",
    category: "devotional",
    categoryLabel: "Devotional",
    description:
      "A Marian apostolate committed to prayer, visitation, evangelisation, and works of mercy.",
    patronSaint: "Blessed Virgin Mary",
    meetingSchedule: "Weekly praesidium meetings",
    imageUrl:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=900&q=80",
    chaplain: {
      id: "lom-chaplain",
      name: "Rev. Fr. Samuel Taiwo",
      role: "chaplain",
      roleLabel: "Spiritual Director",
      parish: "St. Augustine Parish, Ede",
      deanery: "Ede Deanery",
      imageUrl: leaderImage,
      tenure: "2024 - Present",
    },
    officers: [
      {
        id: "lom-president",
        name: "Mrs. Agnes Fatoki",
        role: "president",
        roleLabel: "President",
        parish: "St. Joseph Parish, Ikirun",
        deanery: "Ikirun Deanery",
        imageUrl:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&q=80",
        tenure: "2023 - 2026",
      },
    ],
    createdAt: "",
    updatedAt: "",
  },
];
