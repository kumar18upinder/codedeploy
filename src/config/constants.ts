export default {

    HTTP_CODE: {
        OK: 200,
        ERROR: 400,
        NOT_AUTHORIZED: 401,
        NOT_FOUND: 404,
        CREATED: 201,
        FORBIDDEN: 403,
        SERVER_ERROR: 500,
    },

    REGEX : {
        PASSWORD: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-={};:\'",<.>]).{8,}$',
        NO_SPECIAL_CHARACTER: '^[a-zA-Z0-9]{8,}$',
        NO_SPACE: /^\S+$/,
        FIRST_NOT_SPECIAL_CHARACTER: /^[^!@#$%^&*()_+=\[{\]};:<>|./?,-].*$/
    },

    MODEL_STATUS: {
        ACTIVE: "active",
        DELETED: "deleted",
        PENDING: "pending",
        BLOCKED: "blocked",
        REJECTED: "rejected",
    },

    USER_TYPE: {
        ADMIN: "ADMIN",
        ORGANISATION: "ORGANISATION",
        CUSTOMER: "CUSTOMER"
    },

    QUERY: {
        LIMIT: 10,
        PAGE_NO: 1,
        SORT_BY: "updatedBy",
        SORT_ORDER: -1,
    },

    MESSAGES: {
        
        ERROR: {
            SERVER_ERROR: "Internal server error!",
            FORBIDDEN: "Forbidden!",
            INVALID_USER: "Invalid user!",
            RECORD_NOT_FOUND: "Record not found!",
            EMAIL_ALREADY_EXIST: "Email already exist!",
            MIN_PASSWORD_LENGTH: 'Password must be at least 8 characters long',
            PASSWORD_REGEX: 'Password must contain at least one uppercase letter, one lowercase letter, and one special character',
            NO_SPACE_SP_CHARACTER_REGEX: 'Must not contain spaces and special characters',
            NO_SPACE_REGEX: 'Must not contain spaces',
            FIRST_NOT_SPECIAL_CHARACTER: "Must not start with a special character"
        },
        UNAUTHORIZED_USER: "Unauthorized",
        FORBIDDEN: "Forbidden",
        EMAIL_NOT_FOUND: "Email not found",
        INVALID_PASSWORD: "Invalid password",
        ORG: {
            PENDING: "Account approval pending",
            INVALID_ACCOUNT: "Invalid account",
            ALREADY_APPROVED: "Account already approved",
        }
    },

    PASSWORD_LENGTH: 8,

    TRANSACTION_STATUS: {
        IN: "IN",
        OUT: "OUT",
    },

    PRODUCT: {
        TYPE: {
            VEG: "VEG",
            NON_VEG: "NON_VEG"
        },
        AVAILABILITY: {
            ALL_DAY: "All Day",
            SNACKS: "Snacks",
            BREAKFAST: "Breakfast",
            DINNER: "Dinner",
            LUNCH: "Lunch",
        },
    },

    VALUE_TYPE: {
        PERCENTAGE: "Percentage",
        VALUE: "Value",
    },

    SETTING: {
        TYPE: {
            PAYMENT: "Payment",
        },
        PAYMENT_TYPE: {
            CREDIT_DEBIT: "Credit/Debit Card",
            GPAY: "Google Pay",
            PAYPAL: "PayPal",
            COUNTER: "Pay at counter",
        },
        CURRENCY: {
            EUR: "EUR"
        },
        SERVICE_FEE: {
            PERCENTAGE: "Percentage",
            FLAT: "Flat Ratio",
        }
    },
}