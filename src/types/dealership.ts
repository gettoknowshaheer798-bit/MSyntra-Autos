export interface Dealership {
    name: string;
    tagline: string;
    description: string;

    contact: {
        phone: string;
        email: string;
    };

    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };

    social: {
        instagram: string;
        facebook: string;
        youtube: string;
    };
}