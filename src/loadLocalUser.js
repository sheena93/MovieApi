const loadLocalUser = function(document){
  var rootNode = document.querySelector("#root");
   (rootNode.onload = function(){

    if(typeof window.localStorage){
      let movieStorage = window.localStorage;
      // local users db
      let movieUsers = {
          'userA':{
          'username':"usera",
          'password':'passworda'
        },
        'userB':{
          'username':"userb",
          'password':'passwordb'
        },
      };
      //key-values pair as string
      if(movieStorage.getItem('movieUsers')===null){ // if doesnt already exists
        movieStorage.setItem('movieUsers',JSON.stringify(movieUsers));
      }
      // testing
      let movieUsersDb = JSON.parse(movieStorage.getItem('movieUsers'));
      try{
        if(movieUsersDb['userB']['password']!==movieUsers['userB']['password']){
          console.error("Error: users for movie login page undefined");
        }
      }catch(error){
        console.error("Error: users for movie login page undefined");
      }


    }else{
      console.error("Error while accessing the localStorage object");
    }
   })();
}

export default loadLocalUser;

//
//
// window.localStorage.setItem('movieUsers',JSON.stringify(movieUsers));
