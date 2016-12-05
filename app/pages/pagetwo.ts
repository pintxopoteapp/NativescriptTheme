import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from './base';



export class pagetwo extends BaseModel{
    constructor(page:Page){
        super(page);
    }
}

function onNavigatingTo(args) {
    var page = args.object;
     var gotData=page.navigationContext;
    console.log(gotData.param1);
   // console.dump(gotData.param2);
    console.log(gotData.param2[gotData.param1]['name']);
    var superpage = <Page>args.object;
    var name=gotData.param2[gotData.param1]['name'];
    var img=gotData.param2[gotData.param1]['img'];
    var img2=gotData.param2[gotData.param1]['img2'];
    //superpage.bindingContext=name;
    var minijson=[{
        "name":name,
        "img":img,
        "img2":img2
    }]
    superpage.bindingContext=(minijson);

    //console.dump(minijson);
}
exports.onNavigatingTo = onNavigatingTo;
