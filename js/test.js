var result = new Promise(function(resolve){
    resolve(new Date);
  });
  
  result.then(function(date){
    console.log(date.getFullYear());
  })
  
  
  function something1(){
    return new Promise(function(resolve){
      
      setTimeout(function(){
        console.log('1');
      }, 2000);
    })
  }
  
  function something2(){
    return new Promise(function(resolve){
      
      setTimeout(function(){
        console.log('2');
      }, 1000);
    })
  }
  
  function something3(){
    return new Promise(function(resolve){
      
      setTimeout(function(){
        console.log('3');
      }, 500);
    })
  }
  
  Promise.all([
    something1(),
    something2(),
    something3()
  ])
  .then(function(data){
    console.log(data);
    console.log('全ての処理が完了しました。');
  })