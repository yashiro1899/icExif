var ExifImage = require('exif').ExifImage;

try {
    new ExifImage({
        image: process.argv[2]
    }, function(err, data) {
        if (err) process.exit(1);

        var et = data.exif["ExposureTime"];
        var ec = data.exif["ExposureCompensation"];
        if (et < 1) et = "1/" + Math.round(1 / et);
        if (ec !== 0) ec = Math.round(3 * ec) + "/3";

        console.log("    品牌: %s", data.image["Make"]);
        console.log("    型号: %s", data.image["Model"]);
        console.log("    焦距: %smm", data.exif["FocalLength"]);
        console.log("    光圈: %s", data.exif["FNumber"]);
        console.log("快门速度: %s sec", et);
        console.log("     ISO: %s", data.exif["ISO"]);
        console.log("曝光补偿: %s EV", ec);
        console.log("    镜头: %s", data.exif["LensModel"]);
    });
} catch (e) {
    process.exit(1);
}
