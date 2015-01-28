/*
Copyright 2015 Weswit Srl

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var ls = require('lightstreamer-client');


var myClient = new ls.LightstreamerClient("http://localhost:8080","DEMO");  

myClient.addListener({
  onStatusChange: function(newStatus) {         
    console.log(newStatus);
  }
});

myClient.connect();

var mySubscription = new ls.Subscription("MERGE",["item1","item2","item3"],["stock_name","last_price"]);
mySubscription.setDataAdapter("QUOTE_ADAPTER");
mySubscription.setRequestedSnapshot("yes");

mySubscription.addListener({
  onSubscription: function() {
    console.log("SUBSCRIBED");
  },
  onUnsubscription: function() {
    console.log("UNSUBSCRIBED");
  },
  onItemUpdate: function(obj) {
    console.log(obj.getValue("stock_name") + ": " + obj.getValue("last_price"));
  }
});

myClient.subscribe(mySubscription);
