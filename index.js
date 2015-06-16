var ExifImage = require('exif').ExifImage;

try {
    new ExifImage({
        image: process.argv[2]
    }, function(err, data) {
        if (err) process.exit(1);

        var et = data.exif["ExposureTime"] || "N/A";
        var ec = data.exif["ExposureCompensation"] || "N/A";
        var fl = data.exif["FocalLength"] || "N/A";
        if (typeof et === "number" && et < 1) et = "1/" + Math.round(1 / et) + " sec";
        if (typeof ec === "number" && ec !== 0) ec = Math.round(3 * ec) + "/3 EV";
        if (typeof fl === "number") fl = fl + " mm";

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
