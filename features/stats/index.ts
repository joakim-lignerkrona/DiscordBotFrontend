import axios from "axios";
import { dateQueryString } from "./dateQueryString";
import { Stats } from "./definitions";

const dev = true;

const baseURL = dev ? "http://localhost:3180" : "https://jockan.com";

export function getStats(from?: Date, to?: Date): Promise<[Stats]> {

    return new Promise(async (resolve, reject) => {
        axios.get(baseURL + "/api/stats" + dateQueryString(from, to))
            .then(res => {
                resolve(res.data as [Stats]);
            })
            .catch(err => reject(err))

    })
}


