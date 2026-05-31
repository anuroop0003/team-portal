export const getStatusVariant = (status: string) => {
  switch (status) {
    case "In Office":
      return "success";
    case "WFH":
      return "indigo";
    case "On Leave":
      return "destructive";
    default:
      return "secondary";
  }
};

export const getRoleVariant = (role: string) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "destructive";
    case "manager":
      return "warning";
    default:
      return "outline";
  }
};
