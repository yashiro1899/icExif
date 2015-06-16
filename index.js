var ExifImage = require('exif').ExifImage;

try {
    new ExifImage({
        image: process.argv[2]
    }, function(err, data) {
        if (err) process.exit(1);

        var et = data.exif["ExposureTime"];
        var ec = data.exif["ExposureCompensation"];
        var fl = data.exif["FocalLength"];
        if (typeof et === "number") {
            if (et < 1) et = "1/" + Math.round(1 / et);
            et += " sec";
        } else {
            et = "N/A";
        }
        if (typeof ec === "number") {
            if (ec !== 0) ec = Math.round(3 * ec) + "/3";
            ec += " EV"
        } else {
            ec = "N/A";
        }
        if (typeof fl === "number") fl = fl + " mm";
        else fl = "N/A";

        console.log("    品牌: %s", data.image["Make"] || "N/A");
        console.log("    型号: %s", data.image["Model"] || "N/A");
        console.log("    焦距: %s", fl);
        console.log("    光圈: %s", data.exif["FNumber"] || "N/A");
        console.log("快门速度: %s", et);
        console.log("     ISO: %s", data.exif["ISO"] || "N/A");
        console.log("曝光补偿: %s", ec);
        console.log("    镜头: %s", data.exif["LensModel"] || "N/A");
    });
} catch (e) {
    process.exit(1);
}
