export const MOCK_WORKFORCE = [
  {
    id: "1",
    name: "Alex Thompson",
    role: "Admin",
    position: "Chief Technology Officer",
    email: "alex.t@company.com",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Alex",
    status: "In Office",
    joinedDate: "2023-01-15",
    points: 1250,
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Manager",
    position: "Engineering Manager",
    email: "sarah.c@company.com",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Sarah",
    status: "WFH",
    joinedDate: "2023-03-10",
    points: 850,
  },
  {
    id: "3",
    name: "Michael Ross",
    role: "User",
    position: "Senior Frontend Developer",
    email: "michael.r@company.com",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Michael",
    status: "On Leave",
    joinedDate: "2023-05-20",
    points: 450,
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "User",
    position: "UI/UX Designer",
    email: "emily.d@company.com",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Emily",
    status: "In Office",
    joinedDate: "2023-06-12",
    points: 600,
  },
  {
    id: "5",
    name: "David Wilson",
    role: "Manager",
    position: "Product Manager",
    email: "david.w@company.com",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=David",
    status: "WFH",
    joinedDate: "2023-02-28",
    points: 920,
  },
  {
    id: "6",
    name: "Jessica Lee",
    role: "User",
    position: "Backend Developer",
    email: "jessica.l@company.com",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Jessica",
    status: "In Office",
    joinedDate: "2023-08-05",
    points: 300,
  },
];

export const MOCK_ORG_DATA = {
  name: "Alex Thompson",
  attributes: {
    position: "CTO",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Alex",
  },
  children: [
    {
      name: "Sarah Chen",
      attributes: {
        position: "Engineering Manager",
        role: "Manager",
        avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Sarah",
      },
      children: [
        {
          name: "Michael Ross",
          attributes: {
            position: "Sr. Frontend Dev",
            role: "User",
            avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Michael",
          },
        },
        {
          name: "Jessica Lee",
          attributes: {
            position: "Backend Dev",
            role: "User",
            avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Jessica",
          },
        },
      ],
    },
    {
      name: "David Wilson",
      attributes: {
        position: "Product Manager",
        role: "Manager",
        avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=David",
      },
      children: [
        {
          name: "Emily Davis",
          attributes: {
            position: "UI/UX Designer",
            role: "User",
            avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Emily",
          },
        },
      ],
    },
  ],
};
