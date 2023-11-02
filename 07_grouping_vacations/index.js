import fs from "fs";

solve();

function solve() {
    let data = JSON.parse(fs.readFileSync("./data.json"));
    let setOfNames = new Set(); //getting all the names
    for (let record of data) {
        setOfNames.add(record.user.name);
    }
    let result = organize(data, setOfNames);
    fs.writeFileSync("./result.json", JSON.stringify(result, null, 2));
}

function organize(data, setOfNames) {
    let resultArr = [];
    for (let name of setOfNames) {
        resultArr.push({});
        data.forEach(element => {
            if (name == element.user.name) {
                let lastElement = resultArr.length - 1;
                if (typeof resultArr[lastElement].userId == "undefined") {
                    resultArr[lastElement].userId = element._id;
                }
                if (typeof resultArr[lastElement].name == "undefined") {
                    resultArr[lastElement].name = name;
                }

                if (typeof resultArr[lastElement].vacations == "undefined") {
                    resultArr[lastElement].vacations = [];
                    resultArr[lastElement].vacations.push({
                        "startDate": element.startDate,
                        "endDate": element.endDate,
                    });
                }
                else {
                    resultArr[lastElement].vacations.push({
                        "startDate": element.startDate,
                        "endDate": element.endDate,
                    });
                }

            }
        });
    }
    return resultArr;
}