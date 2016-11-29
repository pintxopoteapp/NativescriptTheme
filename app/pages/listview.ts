import { EventData } from "data/observable";
import { Page } from "ui/page";
import { BaseModel } from './base';
 var http = require("http");
var Observable=require('data/observable');
var ObservableArray=require('data/observable-array');
var viewModel= new Observable.Observable({
    title:"hello",
    myItems:new ObservableArray.ObservableArray([]),
})
class DemoItem {
  constructor(title: string){
    this.title = title;
  }

  public title: string;
  public content: string = ' line text lorem ipsum dapibus, neque id cursus faucibus';
  public image: string = "~/images/Thumb1.jpg";
  public imagealt: string = "~/images/Thumb3.jpg";
}

//Alt images
//http://vignette3.wikia.nocookie.net/dragonball/images/c/cb/CDGDZZfVAAI6_K4.jpg
//http://vignette3.wikia.nocookie.net/dragonball/images/c/cb/CDGDZZfVAAI6_K4.jpg

export class ListViewModel extends BaseModel {
  public sampleItems: Array<DemoItem>;
  public sampleItemsMulti: Array<any>;
  constructor(page:Page) {
    super(page);


function loaddata() {
    http.getJSON("http://pptest-kwiatchris.rhcloud.com/bars/findall").then(function (r) {
    //// Argument (r) is JSON!
    /*  for(let i=0; i < r.length; i++){
      console.log(r[i]['name']);
    }
    */
   //viewModel.title="pintxo Loaded";
   r.data.map(function(item){
       viewModel.myItems.push(item.data);
   })
    
}, function (e) {
    //// Argument (e) is Error!
    //console.log(e);
});
}
    var items = new Array<DemoItem>();
    for(let i=0; i <2; i++){
      items.push(new DemoItem('frank'));
    }

    this.set("sampleItems", items);
  }
}

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = viewModel;
}

declare module namespace {

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