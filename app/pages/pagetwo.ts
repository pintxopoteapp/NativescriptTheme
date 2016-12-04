function onNavigatingTo(args) {
    var page = args.object;
     var gotData=page.navigationContext;
    console.log(gotData.param1);
    console.log(gotData.param2);
}
exports.onNavigatingTo = onNavigatingTo;