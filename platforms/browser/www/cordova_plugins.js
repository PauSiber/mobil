cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "pluginId": "phonegap-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "file": "plugins/phonegap-plugin-barcodescanner/src/browser/BarcodeScannerProxy.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScannerProxy",
        "pluginId": "phonegap-plugin-barcodescanner",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-social-message/www/socialmessage.js",
        "id": "cordova-plugin-social-message.SocialMessage",
        "pluginId": "cordova-plugin-social-message",
        "clobbers": [
            "socialmessage"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "phonegap-plugin-barcodescanner": "4.1.0",
    "cordova-plugin-social-message": "0.4.0"
}
// BOTTOM OF METADATA
});