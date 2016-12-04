import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from './base';
import * as fs from 'file-system';
 var http = require("http");
/*var Observable=require('data/observable');
var ObservableArray=require('data/observable-array');
var viewModel= new Observable.Observable({
    title:"hello",
    myItems:new ObservableArray.ObservableArray([]),
})*/

class DemoItem {
  constructor(title: string,imagealt:string,street:string){
    this.title = title;
    this.imagealt=imagealt;
    this.street=street;
  }

  public title: string;
  public content: string = ' line text lorem ipsum dapibus, neque id cursus faucibus';
  public image: string;
  public imagealt: string ;
  public street:string;
}

//Alt images
//http://vignette3.wikia.nocookie.net/dragonball/images/c/cb/CDGDZZfVAAI6_K4.jpg
//http://vignette3.wikia.nocookie.net/dragonball/images/c/cb/CDGDZZfVAAI6_K4.jpg

export class ListViewModel extends BaseModel {
  public sampleItems: Array<DemoItem>;
  public sampleItemsMulti: Array<any>;
  constructor(page:Page) {
    super(page);
//loaddata();
var items = new Array<DemoItem>();
  function loaddata() {
      http.getJSON("http://pptest-kwiatchris.rhcloud.com/bars/findall").then(function (r) {
    //// Argument (r) is JSON!
         //console.log(JSON.stringify(r));
         
     for(let i=0; i < r.length; i++){
      console.log(r[i]['name']);
      items.push(new DemoItem(r[i]['name'],r[i]['img'],"calle "+r[i]['street']));
    }
        
}, function (e) {
    //// Argument (e) is Error!
    console.log(e);
});
}

 
    this.set("sampleItems", items);
  }
}
/*
export async function navigatingTo(args: EventData) {
    //await  http.getJSON("http://pptest-kwiatchris.rhcloud.com/bars/findall");
    var page = <Page>args.object;
    page.bindingContext =new ListViewModel(page);
}*/
const nIssuesUrl = "http://pptest-kwiatchris.rhcloud.com/bars/findall";

export async function navigatingTo(args: EventData) {
  //let page = args.object.page;
  var page = <Page>args.object;
  let issues = await http.getJSON(nIssuesUrl);
  console.log("issues: " + issues);
  page.bindingContext=new ListViewModel(page);
  page.bindingContext = issues;
}
exports.onTap = function (args) {
    var index = args.view;
    var x=index.bindingContext;
    console.log('Clicked item with index ' + x);
   
};


var frameModule =require("ui/frame");
exports.changePage=function(args) {
    // console.log("Navigating");
    var phone=args.object;
     var item = args.bindingContext;
    console.log(phone);
    console.log(item);
   // console.dump(phone);
    var navigationOptions={
        moduleName:'pages/pagetwo',
        context:{param1: "value1",
                param2: "value2"
                }
    }
    
    frameModule.topmost().navigate(navigationOptions);
}
function name(args) {
   var btn = args.object;
   console.log(btn);
   var item = btn.bindingContext;
   console.log(item);
}
/*declare module namespace {

    export interface Id {
        $oid: string;
    }

    export interface Point {
        coordinates: number[];
        type: string;
    }

    export interface RootObject {
        _id: Id;
        name: string;
        street: string;
        img: string;
        lat: string;
        long: string;
        point: Point;
    }

}
export class Bars{
  
    constructor(
      public    _id: string,
      public   name: string,
      public   street: string,
      public   img: string,
      public   lat: string,
      public   long: string,
      public   point: string
    ){}
      
        
    
}


function deserialize(json, clazz) {
    var instance = new clazz(),
        types = instance.getTypes();

    for(var prop in json) {
        if(!json.hasOwnProperty(prop)) {
            continue;
        }

        if(typeof json[prop] === 'object') {
            instance[prop] = deserialize(json[prop], types[prop]);
        } else {
            instance[prop] = json[prop];
        }
    }

    return instance;
}

class Serializable {
    fillFromJSON(json: string) {
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
}
interface IFooSerialized {
    nameSomethingElse: string;
}
class Foo {
  name: string;
  GetName(): string { return this.name }

  toJSON(): IFooSerialized {
      return {
          nameSomethingElse: this.name
      };
  }

  fromJSON(obj: IFooSerialized) {
        this.name = obj.nameSomethingElse;
  }
}
class SerializationHelper {
    static toInstance<T>(obj: T, json: string) : T {
        var jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }
}

class FileReader {
    
    static readJSON(path: string) {
        var documents = fs.knownFolders.currentApp();
        var jsonFile = documents.getFile(path);
        return new Promise<Object>((resolve, reject) => {
            try {

                jsonFile.readText().then((content: string) => {
                    let data = <Array<Object>>JSON.parse(content);
                    resolve(data);   
                     console.log(JSON.stringify(data));
                });

            }
            catch (err) {
                reject(err);
                console.log(err);
            }
        });
    }   
}*/