export function dateQueryString(from: Date, to: Date) {
    let querystring = '';
    if (from !== undefined || to !== undefined)
        querystring += `?`;
    if (from !== undefined)
        querystring += `from=${from.toISOString()}`;
    if (from !== undefined && to !== undefined)
        querystring += `&`;
    if (to !== undefined)
        querystring += `to=${to.toISOString()}`;
    return querystring;
}
