export const rolesObj = {
    ADMIN: "ADMIN",
    SUBADMIN: "SUBADMIN",
    USER: "USER",
    SELLER: "SELLER"
};

export const ErrorMessages = {
    EMAIL_EXISTS: "Email already exists",
    PHONE_EXISTS: "Phone number already exists",
    EMAIL_NOT_EXISTS: "Email not exists",
    PHONE_NOT_EXISTS: "Phone number not exists",
    INVALID_EMAIL: "Invalid email",
    INVALID_PASSWORD: "Invalid password",
    INVALID_PHONE: "Invalid phone number",
    INVALID_USER: "Invalid user",
    INVALID_TOKEN: "Invalid token",
    INVALID_ROLE: "Invalid ROLE ",
    INVALID_PERMISSIONN: "Invalid PERMISSION",
    COMPANY_EXISTS: "company already exists",
    VAT_EXISTS: "VAT already exists",
    TITLE_EXISTS: "TITLE already exists",
    SLUG_EXISTS: "SLUG already exists",
};

export const generalModelStatuses = {
    APPROVED: "APPROVED",
    DECLINED: "DECLINED",
    PENDING: "PENDING",
};

export const generalHoteType = {
    Hotel: "Hotels",
    HomeStay: "Home Stays",
  };
  
export const PERMISSION = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    GET: "GET"
};

export const discountStatus = {
    PERCENTAGE: "PERCENTAGE",
    FLATOFF: "FLATOFF",
};
