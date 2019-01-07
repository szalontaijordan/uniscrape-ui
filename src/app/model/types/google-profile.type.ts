export interface GoogleProfile {
    email: string;
    imageUrl: string;
    name: string;
}

export interface GoogleAuthObject {
    idToken: string;
    user: GoogleProfile;
}
