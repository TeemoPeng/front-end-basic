for(var i = 1;i <= 5;i++){
    console.log('for:', i);
    (function(j){
        console.log(j)
      setTimeout(() => {
        console.log('j:', j) 
      }, 1000)
    })(i)
  }