import config from "../config/config";
/**
 * generate list query
 * @param { import("express").Request } req
 * @returns { filter: filter, sorting: sorting }
 */
const generateListQuery = async (req,ScreenName) => {
  let criteria = {
    limit: config.limit,
    page: config.page,
    sortfield: config.sortfield,
    direction: config.direction,
    filter: {},
    pagination: {}
  };
  let json;
  if (req.queryType === 'employee') {
    json = {};
  } else {
    json = {
      active: true
    };
  }

  let data;
  if (req.query) {
    data = req.query;
    if (data && data.limit) {
      criteria.limit = criteria.pagination.limit = parseInt(data.limit);
    }
    if (data && data.page) {
      criteria.page = criteria.pagination.page = parseInt(data.page);
    }
    if (data && data.filter) {
      let cred = JSON.parse(data.filter);
      if (cred.limit) {
        criteria.limit = criteria.pagination.limit = parseInt(cred['limit']) > 200 ? 200 : parseInt(cred['limit'])
      }
      if (cred.page) {
        criteria.page = criteria.pagination.page = parseInt(cred['page']);
      }
      if (cred.sortfield) {
        criteria.sortfield = cred['sortfield'];
      }
      if (cred.direction) {
        criteria.direction = cred['direction'];
      }
      if (cred && cred.globalSearch) {
        let globalObj = cred.globalSearch;
        if (globalObj && globalObj.type === 'user' && globalObj.value) {
          let allGlobalSearchFields=["email", "phone", "displayName", "address",
          "name", "gender", "employeeName", "role", "subject", "country", "packageName", "website","to","from", "contextType", "context", "desc","createdByName","status", "name","email","address","role","context","subject","to","from","bcc","html","templateName","reason",]
          let uniqueScreensGlobalSearchFields={"employee":{"stringFields":["name","email","address","role"],"numberFields":[],"dateFields":[]},"activities":{"stringFields":[],"numberFields":[],"dateFields":[]},"emailtemplates":{"stringFields":[],"numberFields":[],"dateFields":[]},"roles":{"stringFields":[],"numberFields":[],"dateFields":[]},"uploadhistory":{"stringFields":[],"numberFields":[],"dateFields":[]},"emailstatus":{"stringFields":[],"numberFields":[],"dateFields":[]}}
          let numsArr = ["telegramId"];
          if (!json['$or']) {
            json['$or'] = [];
          }
          // numsArr.forEach(function (x) {
          //   let objarr = {
          //     $where: "/^.*" + globalObj.value + ".*/.test(this." + x + ")"
          //   }
          //   json['$or'].push(objarr)
          // });
          let filtersArr
          if(uniqueScreensGlobalSearchFields[ScreenName]){
            filtersArr=uniqueScreensGlobalSearchFields[ScreenName]
            // filtersArr=filtersArr.concat(["email", "phone", "displayName", "address",
            // "name", "gender", "employeeName", "role", "subject", "country", "packageName", "website","to","from", "contextType", "context", "desc","createdByName","status"])
          }else{
            filtersArr=allGlobalSearchFields
            filtersArr=filtersArr.concat(["email", "phone", "displayName", "address",
            "name", "gender", "employeeName", "role", "subject", "country", "packageName", "website","to","from", "contextType", "context", "desc","createdByName","status"])
          }
          console.log("SCREENFIELDS>>>>>>",uniqueScreensGlobalSearchFields[ScreenName])
          filtersArr['stringFields'].forEach(function (v) {
            if(typeof globalObj.value == "string"){
              let jsonNew = {};
              jsonNew[v] = { '$regex': globalObj.value, '$options': 'i' };
              json['$or'].push(jsonNew);
            }
          });
          filtersArr['numberFields'].forEach(function (v) {
            let value=parseFloat(globalObj.value)
            if(!isNaN(value)){
            let jsonNew = {};
            jsonNew[v] = (value)
            json['$or'].push(jsonNew);
            } 
          });
          filtersArr['dateFields'].forEach(function (v) {
            let dateRegex1 =  /^\d{4}-\d{2}-\d{2}$/  // For yyyy-mm-dd
            let dateRegex2 = /^\d{2}-\d{2}-\d{4}$/; // For dd-mm-yy 
            let dateRegex3 = /^\d{4}\/\d{2}\/\d{2}$/; // For yyyy/mm/dd
            let dateRegex4 = /^\d{2}\/\d{2}\/\d{4}$/; // For dd/mm/yyyy
            let datevalue; let enddate
            if (dateRegex1.test(globalObj.value) || dateRegex2.test(globalObj.value) || dateRegex3.test(globalObj.value) || dateRegex4.test(globalObj.value)) {
              if(dateRegex1.test(globalObj.value)){
                datevalue = moment(globalObj.value, "YYYY-MM-DD").toDate();
                enddate=moment(globalObj.value, "YYYY-MM-DD").toDate();
              }
              if(dateRegex2.test(globalObj.value)){
                datevalue = moment(globalObj.value, "DD-MM-YYYY").toDate();
                enddate=moment(globalObj.value, "DD-MM-YYYY").toDate(); 
              }
              if (dateRegex3.test(globalObj.value)) {
                datevalue = moment(globalObj.value, "YYYY/MM/DD").toDate();
                enddate = moment(globalObj.value, "YYYY/MM/DD").toDate();
              }
              if (dateRegex4.test(globalObj.value)) {
                  datevalue = moment(globalObj.value, "DD/MM/YYYY").toDate();
                  enddate = moment(globalObj.value, "DD/MM/YYYY").toDate();
              }
              if(datevalue && !isNaN(datevalue) && enddate && !isNaN(enddate)){ 
                datevalue.setUTCHours(0, 0, 0, 0);datevalue.setDate(datevalue.getDate()-1)
                enddate.setUTCHours(23, 59, 59, 999);enddate.setDate(enddate.getDate()-1)
                let jsonNew = {};
                jsonNew[v] = { $gt: datevalue , $lt: enddate};
                json['$or'].push(jsonNew);
              }               
            }
          });
        }
        if (globalObj && globalObj.type === 'employee' && globalObj.value) {
          let filtersArr = ["email", "phone", "displayName"];
          filtersArr.forEach(function (v) {
            if (!json['$or']) {
              json['$or'] = [];
            }
            let jsonNew = {};
            jsonNew[v] = { '$regex': globalObj.value, '$options': 'i' };
            json['$or'].push(jsonNew);
          });
        }
      }
      if (cred && cred.criteria) {
        let filters = cred.criteria;
        if (filters && filters.length > 0) {
          filters.forEach(function (v, i) {
            if (v.type === 'eq') {
              json[v.key] = v.value;
            }
            if (v.type === 'in') {
              json[v.key] = { "$in": v.value };
            }
            if (v.type === 'gte') {
              if(cred.isDateSearch){
                let datevalue=new Date(v.value); 
                if(datevalue && !isNaN(datevalue)){
                  datevalue.setUTCHours(0, 0, 0, 0)
                }
                if (!json[v.key]) {
                  json[v.key] = {};
                }
                json[v.key]["$gte"] = datevalue;
              }else{
                if (!json[v.key]) {
                  json[v.key] = {};
                }
                json[v.key]["$gte"] = v.value;
              }
            }
            if (v.type === 'lte') {
              if(cred.isDateSearch){
                let datevalue=new Date(v.value); 
                if(datevalue && !isNaN(datevalue)){
                  datevalue.setUTCHours(23, 59, 59, 999)
                }
                if (!json[v.key]) {
                  json[v.key] = {};
                }
                json[v.key]["$lte"] = datevalue;
              }else{
                if (!json[v.key]) {
                  json[v.key] = {};
                }
                json[v.key]["$lte"] = v.value;
              }
            }
            if (v.type === 'lt') {
              if (!json[v.key]) {
                json[v.key] = {};
              }
              json[v.key]["$lt"] = v.value;
            }
            if (v.type === 'gt') {
              if (!json[v.key]) {
                json[v.key] = {};
              }
              json[v.key]["$gt"] = v.value;
            }
            if (v.type === 'or') {
              if (!json['$or']) {
                json['$or'] = [];
              }
              let jsonNew = {};
              jsonNew[v.key] = { '$regex': v.value, '$options': 'i' };
              json['$or'].push(jsonNew);
            }
            if (v.type === 'ne') {
              json[v.key] = { $ne: v.value };
            }
            if (v.type === 'nin') {
              json[v.key] = { "$in": v.value };
            }
            if (v.type === 'regexOr') {
              json[v.key] = { '$regex': v.value, '$options': 'i' };
            }
            if(v.type === 'sw'){
              json[v.key] ={'$regex': '^'+v.value, '$options':'i'}
            }
            if (v.type === 'ew') {
              json[v.key] = { '$regex': v.value + '$','$options': 'i' };
            }
            if(v.type == 'exsits'){
              query[v.key] = { $exists: true }
            }
            if(v.type == 'nexsits'){
              query[v.key] = { $exists: false }
            }
            if(v.type == 'dateIsNot'){
              let datevalue=new Date(v.value); let enddate=new Date(v.value)
              if(datevalue && !isNaN(datevalue) && enddate && !isNaN(enddate)){
                datevalue.setUTCHours(0, 0, 0, 0); enddate.setUTCHours(23, 59, 59, 999)
                json[v.key]= {$not: { $gt: datevalue , $lt: enddate}}
              } 
            }
            if(v.type == 'dateeq'){
              let datevalue=new Date(v.value);
              if(datevalue && !isNaN(datevalue) && enddate && !isNaN(enddate)){
                let datevalue=new Date(v.value); let enddate=new Date(v.value)
                datevalue.setUTCHours(0, 0, 0, 0); enddate.setUTCHours(23, 59, 59, 999)
                json[v.key]=  { $gt: datevalue , $lt: enddate}
              }
            }
          });
        }
      }
    }
  } else if (req.pair) {
    data = req;
    let fields = ['userId', 'pair'];
    // field wise filtering
    fields.forEach((field) => {
      json[field] = data[field];
    });
    // 1day
    if (data.type === '1day') {
      json['created'] = dateUtil.getOneDayQuery();
    }
    // 1 week
    if (data.type === '1week') {
      json['created'] = dateUtil.getThisWeekQuery();
    }
    // 1 month
    if (data.type === '1month') {
      json['created'] = dateUtil.getOneMonthDatesQuery();
    }
    // 3 month
    if (data.type === '3month') {
      json['created'] = dateUtil.getThreeMonthsQuery();
    }
    let fromdate = data.fromdate || data.fromDate;
    let todate = data.todate || data.toDate;
    // fromdate or tdate
    if (fromdate || todate) {
      if (fromdate) {
        json['created'] = { $lte: new Date(fromdate + 'T23:59:59Z'), $gte: new Date(fromdate + 'T00:00:00Z') };
      }
      if (todate) {
        json['created'] = { $lte: new Date(todate + 'T23:59:59Z'), $gte: new Date(todate + 'T00:00:00Z') };
      }
      if (fromdate && todate) {
        json['created'] = { $lte: new Date(todate + 'T23:59:59Z'), $gte: new Date(fromdate + 'T00:00:00Z') };
      }
    }
  }

  criteria.filter = json;
  criteria.sorting = {};
  if (criteria.direction === 'desc') {
    criteria.sorting[criteria.sortfield] = -1;
  } else {
    criteria.sorting[criteria.sortfield] = 1;
  }

  // criteria = await checkAndAddSecondarySorting(req, criteria)

  return criteria;
}


function formatSize(sizeInBytes) {
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;

  if (sizeInBytes < kb) {
    return `${sizeInBytes} bytes`;
  } else if (sizeInBytes < mb) {
    return `${(sizeInBytes / kb).toFixed(2)} KB`;
  } else if (sizeInBytes < gb) {
    return `${(sizeInBytes / mb).toFixed(2)} MB`;
  } else {
    return `${(sizeInBytes / gb).toFixed(2)} GB`;
  }
}


export default { generateListQuery, formatSize }