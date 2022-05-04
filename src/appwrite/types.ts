export interface articleInfo {
    type_of: string;
    id: number;
    title: string;
    description: string;
    cover_image: string;
    readable_publish_date: string;
    social_image: string;
    tag_list: string[];
    tags: string;
    slug: string;
    path: string;
    url: string;
    canonical_url: string;
    comments_count: number;
    positive_reactions_count: number;
    public_reactions_count: number;
    collection_id?: any;
    created_at: Date;
    edited_at: Date;
    crossposted_at?: any;
    published_at: Date;
    last_comment_at: Date;
    published_timestamp: Date;
    reading_time_minutes: number;
    user: User;
    organization: Organization;
};

export interface User {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    website_url: string;
    profile_image: string;
    profile_image_90: string;
};

export interface Organization {
    name: string;
    username: string;
    slug: string;
    profile_image: string;
    profile_image_90: string;
};

export declare type articleDetail = articleInfo & {
    body_html: string;
    body_markdown: string;
};

export interface commonResp {
    status: string
    msg?: string
    data?: sizeControlResp
}

export interface sizeControlResp {
    isAll: boolean
    result: string
}

export interface syncParams {
    articleId: number 
    address: string
    ownerAddress: string
    devtoUsername: string
}

export interface articleSyncInfo {
    articleId: number
    devtoUsername: string
    arweaveAddress: string
    ownerAddress: string
}

export interface documentCommonResp<Doc> {
    total: number
    documents: Doc[]
}