import {User as IUser} from '@/types/User';
import {RawUser as IRawUser} from '@/types/User';

export default class User implements IUser {
    id: number;
    avatar_url: string;
    login: string;
    fullName: string;
    repos_count: number;
    followers_count: number;
    followers_url: string;
    repos_url: string;
    repos_list: Array<any> [];
    followers_list: Array<any> [];

    constructor({id, avatar_url, login, name, followers, followers_url, repos_url, public_repos, repos_list, followers_list}: IRawUser) {
        this.id = id;
        this.avatar_url = avatar_url;
        this.login = login;
        this.fullName = name ?? login;
        this.repos_count = public_repos ?? 0;
        this.repos_url = repos_url;
        this.followers_url = followers_url;
        this.followers_count = followers ?? 0;
        this.repos_list = repos_list ?? [];
        this.followers_list = followers_list ?? [];
    }
    setReposList(repos: any){
        this.repos_list = repos
    }
    setFollowersList(followers: any){
        this.followers_list = followers
    }
}