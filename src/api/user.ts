import { UserFilter } from "@/types/User";
import { User as IUser } from "@/types/User";
import axios from "axios";

export default {
  fetchUsers: async function ({
    location,
    page,
    per_page,
    sort,
    order,
  }: UserFilter): Promise<any> {
    return await axios({
      url: `https://api.github.com/search/users?q=location:${location}&per_page=${per_page}&page=${page}&sort=${sort}&order=${order}`,
    })
      .then((response) => {
        if (!(response.data && response.data.items)) {
          throw new Error("Error");
        }

        return response.data.items;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  },

  loadUserDetail: async function ({ login }: IUser): Promise<any> {
    const url = `https://api.github.com/users/${login}`;
    return await axios({ url: url })
      .then((response) => {
        if (!response.data) {
          throw new Error("Error");
        }

        return response.data;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  },
};
