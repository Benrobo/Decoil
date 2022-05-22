


export default class DB {
    constructor(tableName = "") {
        this.tableName = tableName
        this.res = {}
        this.res["data"] = null
    }


    findTable(tableName = "") {
        if (tableName === "" || !tableName) {
            this.res["error"] = true;
            this.res["message"] = `Failed to find table: expected table name but got empty`


            return this.res
        }

        let result = JSON.parse(localStorage.getItem(tableName))

        this.res["error"] = false;
        this.res['data'] = result;
        this.res["message"] = `Success: ${tableName} table was found.`

        return this.res

    }

    insert(tableName = "", payload = "") {
        if (tableName === "" || !tableName) {
            this.res["error"] = true;
            this.res["message"] = `Failed to insert data: expected table name but got empty`
            return this.res
        }

        if (payload === "" || !payload) {
            this.res["error"] = true;
            this.res["message"] = `Failed to insert data: expected payload got none`
            return this.res
        }

        // look for the table
        let findTbl = this.findTable(tableName)

        if (findTbl && findTbl.error === true) {
            this.res["error"] = true;
            this.res["message"] = `Failed to insert data: ${tableName} table doesnt exists.`
            return this.res
        }

        const prevTblData = findTbl.data;

        prevTblData.push(payload)

        this.res["error"] = false;
        this.res["message"] = `Success: Data saved successfully.`

        return this.res
    }

    deleteById(tableName = "", payloadId = "") {
        if (tableName === "" || !tableName) {
            this.res["error"] = true;
            this.res["message"] = `Failed to delete data: expected table name but got empty`
            return this.res
        }

        if (payloadId === "" || !payloadId) {
            this.res["error"] = true;
            this.res["message"] = `Failed to delete data: expected payloadId got none`
            return this.res
        }

        // look for the table
        let findTbl = this.findTable(tableName)

        if (findTbl && findTbl.error === true) {
            this.res["error"] = true;
            this.res["message"] = `Failed to delete data: ${tableName} table doesnt exists.`
            return this.res
        }

        const prevTblData = findTbl.data;

        // check if data exists with that id
        const isPayloadExists = prevTblData.filter((list) => list.id === payloadId)

        if (isPayloadExists.length === 0) {
            this.res["error"] = true;
            this.res["message"] = `Failed to delete: data with that '${payloadId}' id doesnt exists.`
            return this.res
        }

        // remove data back
    }

    init() {
        // create tables
        if (localStorage.getItem(this.tableName) === null) {
            localStorage.setItem(this.tableName, [])
            return
        }
    }
}
