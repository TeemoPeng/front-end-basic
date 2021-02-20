## 函数防抖与函数节流（闭包的实际应用）

#### 函数防抖

应用场景：按钮快速点击，频繁触发事件  
期望效果：在指定时间间隔内，快速点击，不论点击多少下，只以间隔时间内最后一次点击为准  

    <button id='debounceTest'>debounce</button>

    function debounce(fn,delay){
        let timer = null;
        return function(){
            clearTimeout(timer);
            timer = setTimeout(()=>{
                fn()
            },delay || 300)
        }
    }    

    document.getElementById('debounceTest').addEventListener('click',debounce(function(){
        console.log('----- debounce testing ----')
    }),500)

#### 函数节流

应用场景：当输入框的值变化时，调用对应的方法；但是键盘按住不松开，就会频繁的调用方法，性能不佳  
期望效果：当键盘一直按住不松开，设置一个时间，每隔一段时间，调用一次对应的方法  

    <input id='throttleTest' type='text' />

    function throttle(fn,delay){
        let canRun = true;
        return function(){
            if(!canRun){
                return;
            }
            
            canRun = false;

            setTimeout(()=>{
                fn();
                canRun = true;
            },delay || 300)
        }
    }
    
    document.getElementById('throttleTest').addEventListener('keydown',throttle(function(){
        console.log('-------------- throttle testing -----------')
    },600))


