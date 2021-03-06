export interface User{
    id: number;
    avatar_url: string;
    login: string;
    fullName?: string;
    repos_count: number;
    followers_count: number;
    followers_url: string;
    repos_url: string;
    repos_list?: Array<any>;
    followers_list?: Array<any>;
}


export interface RawUser{
    id: number;
    avatar_url: string;
    login: string;
    name?: string;
    followers_url: string;
    repos_url: string;
    public_repos: number;
    followers: number;
    repos_list?: Array<any>;
    followers_list?: Array<any>;
}

export interface UserFilter{
    location: string;
    page: number;
    per_page: number;
    sort: string;
    order: string;
}


