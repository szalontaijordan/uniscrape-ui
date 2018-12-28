export interface Image {
    url: string;
    isDefault: boolean;
}

export interface CoverPhoto {
    url: string;
    height: number;
    width: number;
}

export interface CoverInfo {
    topImageOffset: number;
    leftImageOffset: number;
}

export interface Cover {
    layout: string;
    coverPhoto: CoverPhoto;
    coverInfo: CoverInfo;
}

export interface GoogleProfile {
    kind: string;
    etag: string;
    objectType: string;
    id: string;
    displayName: string;
    name: string;
    url: string;
    image: Image;
    isPlusUser: boolean;
    language: string;
    circledByCount: number;
    verified: boolean;
    cover: Cover;
    last_name: string;
    first_name: string;
    picture: string;
    thumbnail: string;
}
