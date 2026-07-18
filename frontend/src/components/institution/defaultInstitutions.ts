import type { InstitutionCategory } from "../../services/home/institutionService";

export const DEFAULT_INSTITUTION_CATEGORIES: InstitutionCategory[] = [
  {
    id: "cat-1",
    name: "Education",
    categoryKey: "education",
    description: "Quality education rooted in Christian values",
    imageUrl:
      "https://images.unsplash.com/photo-1427504494785-405a6e3ae02d?w=600&q=80",
    subcategories: [
      {
        id: "sub-edu-1",
        name: "Tertiary Education",
        description: "Universities and higher institutions of learning",
        heroImageUrl:
          "https://images.unsplash.com/photo-1427504494785-405a6e3ae02d?w=1200&q=80",
        institutions: [
          {
            id: "inst-edu-1",
            name: "Osun State University Campus",
            subcategory: "Tertiary",
            description:
              "Catholic affiliated university campus providing higher education.",
            address: "Osogbo Campus, Osun State",
            phoneNumber: "+234 803 000 0001",
            principalName: "Prof. Adekunle Okafor",
            email: "info@uniosun-osogbo.edu.ng",
            imageUrl:
              "https://images.unsplash.com/photo-1427504494785-405a6e3ae02d?w=400&q=80",
            established: "2002",
            staffCount: 120,
          },
        ],
      },
      {
        id: "sub-edu-2",
        name: "Secondary Schools",
        description: "Secondary education institutions",
        heroImageUrl:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
        institutions: [
          {
            id: "inst-edu-2",
            name: "St. Patrick's Secondary School",
            subcategory: "Secondary",
            description: "Leading secondary school with Christian values.",
            address: "Osogbo, Osun State",
            phoneNumber: "+234 803 000 0002",
            principalName: "Rev. Fr. Adekunle Okafor",
            email: "info@stpatricks-osogbo.edu.ng",
            imageUrl:
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
            established: "1985",
            staffCount: 45,
            operatingHours: "7:00 AM - 4:00 PM",
          },
          {
            id: "inst-edu-3",
            name: "Holy Family Secondary School",
            subcategory: "Secondary",
            description: "Excellence in education and character formation.",
            address: "Ile-Ife, Osun State",
            phoneNumber: "+234 803 000 0003",
            principalName: "Mrs. Grace Adeyemi",
            imageUrl:
              "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
            established: "1988",
            staffCount: 38,
          },
        ],
      },
      {
        id: "sub-edu-3",
        name: "Primary Schools",
        description: "Primary education institutions",
        heroImageUrl:
          "https://images.unsplash.com/photo-1427504494785-405a6e3ae02d?w=1200&q=80",
        institutions: [
          {
            id: "inst-edu-4",
            name: "Holy Family Primary School",
            subcategory: "Primary",
            description: "Nurturing young minds with Christian education.",
            address: "Ile-Ife, Osun State",
            phoneNumber: "+234 803 000 0004",
            principalName: "Mrs. Folake Oladele",
            imageUrl:
              "https://images.unsplash.com/photo-1427504494785-405a6e3ae02d?w=400&q=80",
            established: "1990",
            staffCount: 32,
          },
        ],
      },
    ],
  },
  {
    id: "cat-2",
    name: "Healthcare",
    categoryKey: "healthcare",
    description: "Compassionate medical care guided by Catholic values",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    subcategories: [
      {
        id: "sub-health-1",
        name: "General Hospitals",
        description: "Comprehensive healthcare services",
        heroImageUrl:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
        institutions: [
          {
            id: "inst-health-1",
            name: "St. Jude Hospital",
            subcategory: "General Hospital",
            description:
              "Providing comprehensive healthcare services with compassion.",
            address: "Cathedral Lane, Osogbo, Osun State",
            phoneNumber: "+234 803 000 0005",
            principalName: "Dr. Adeyinka Okafor",
            email: "info@stjude-hospital.com",
            imageUrl:
              "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
            established: "2000",
            operatingHours: "24/7 Emergency Services",
          },
        ],
      },
      {
        id: "sub-health-2",
        name: "Maternity & Child Care",
        description: "Specialized maternal and child healthcare",
        heroImageUrl:
          "https://images.unsplash.com/photo-1631217314830-4ec3a90b6054?w=1200&q=80",
        institutions: [
          {
            id: "inst-health-2",
            name: "Mercy Maternity & Child Care Centre",
            subcategory: "Maternity",
            description: "Specialized care for mothers and children.",
            address: "Ilesha Road, Osogbo",
            phoneNumber: "+234 803 000 0006",
            principalName: "Mrs. Blessing Adewale",
            email: "mercy@maternity-care.ng",
            imageUrl:
              "https://images.unsplash.com/photo-1631217314830-4ec3a90b6054?w=400&q=80",
            established: "2008",
            staffCount: 28,
          },
        ],
      },
    ],
  },
  {
    id: "cat-3",
    name: "Formation",
    categoryKey: "formation",
    description: "Spiritual and pastoral formation for deepening faith",
    imageUrl:
      "https://images.unsplash.com/photo-1498243691581-b145fc3f2e2b?w=600&q=80",
    subcategories: [
      {
        id: "sub-form-1",
        name: "Seminaries",
        description: "Formation centers for priestly vocations",
        heroImageUrl:
          "https://images.unsplash.com/photo-1498243691581-b145fc3f2e2b?w=1200&q=80",
        institutions: [
          {
            id: "inst-form-1",
            name: "Divine Word Seminary",
            subcategory: "Seminary",
            description:
              "Formation center for priestly and religious vocations.",
            address: "Iwo, Osun State",
            phoneNumber: "+234 803 000 0007",
            principalName: "Rev. Fr. Emmanuel Adeyemi",
            email: "admissions@divineword-seminary.org",
            imageUrl:
              "https://images.unsplash.com/photo-1498243691581-b145fc3f2e2b?w=400&q=80",
            established: "1995",
            staffCount: 35,
          },
        ],
      },
    ],
  },
  {
    id: "cat-4",
    name: "Vocational Training",
    categoryKey: "vocational",
    description: "Skills training for empowerment and livelihood",
    imageUrl:
      "https://images.unsplash.com/photo-1528720597620-8f28f2a20d9c?w=600&q=80",
    subcategories: [
      {
        id: "sub-voc-1",
        name: "Training Centers",
        description: "Vocational skills training",
        heroImageUrl:
          "https://images.unsplash.com/photo-1528720597620-8f28f2a20d9c?w=1200&q=80",
        institutions: [
          {
            id: "inst-voc-1",
            name: "St. Thomas Vocational Institute",
            subcategory: "Training",
            description:
              "Teaching practical skills for sustainable livelihood.",
            address: "Gbongan, Osun State",
            phoneNumber: "+234 803 000 0008",
            principalName: "Mr. John Oladele",
            email: "training@stthomasvocational.org",
            imageUrl:
              "https://images.unsplash.com/photo-1528720597620-8f28f2a20d9c?w=400&q=80",
            established: "2012",
            staffCount: 18,
            operatingHours: "8:00 AM - 5:00 PM",
          },
        ],
      },
    ],
  },
  {
    id: "cat-5",
    name: "Bookshops",
    categoryKey: "bookshop",
    description: "Resources for spiritual growth and knowledge",
    imageUrl:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
    subcategories: [
      {
        id: "sub-book-1",
        name: "Religious Bookstores",
        description: "Religious books and liturgical materials",
        heroImageUrl:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80",
        institutions: [
          {
            id: "inst-book-1",
            name: "Cathedral Bookshop",
            subcategory: "Bookstore",
            description: "Religious books, materials, and liturgical supplies.",
            address: "Cathedral Square, Osogbo",
            phoneNumber: "+234 803 000 0009",
            principalName: "Mr. Segun Adebayo",
            email: "sales@cathedral-bookshop.com",
            imageUrl:
              "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80",
            established: "2005",
            operatingHours: "9:00 AM - 6:00 PM",
          },
        ],
      },
    ],
  },
  {
    id: "cat-6",
    name: "Religious Communities",
    categoryKey: "religious",
    description: "Living out the Gospel in community",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    subcategories: [
      {
        id: "sub-rel-1",
        name: "Convents & Monasteries",
        description: "Communities of religious women and men",
        heroImageUrl:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
        institutions: [
          {
            id: "inst-rel-1",
            name: "Sisters of St. Clare Convent",
            subcategory: "Convent",
            description:
              "Community of religious women dedicated to prayer and charity.",
            address: "Ode-Osun, Osun State",
            phoneNumber: "+234 803 000 0010",
            principalName: "Sr. Mary Okafor",
            email: "contact@stclare-convent.org",
            imageUrl:
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
            established: "1988",
          },
        ],
      },
    ],
  },
];
