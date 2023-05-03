export default function toast(){
    const main = document.getElementById("toast");  
  if(main){   
   const toast = document.createElement("div");
      
     const autoremove =  setTimeout(function(){
          main.removeChild(toast);
      },this.toasts.duration+1000);

      toast.onclick = function(e){
          if(e.target.closest('.toast__closed'))
          main.removeChild(toast);
          clearTimeout(autoremove)
      }    
     
      const icons = {
          success: "bi bi-check2-all",
          error:"bi bi-exclamation-triangle-fill",
          warn:"bi bi-exclamation-circle-fill"
      }
      const icon = icons[this.toasts.type]
      const delay = (this.toasts.duration / 1000).toFixed(2);   
      toast.style.animation = `slideInLeft ease .3s forwards, fadeOut linear 1s ${delay}s forwards`; 
      toast.classList.add("toasts", `toast--${this.toasts.type}`);
      toast.innerHTML=`
              
              <div class="toast__body" >
              <div class="toast__closed " style="margin-left:90%" >
                 <i class="bi bi-x-lg text-danger"></i>
              </div>
                  <h1 style="font-size: 25px" class="toast__title">${this.toasts.title}</h1>
                  <p class="toast__msg">
                     ${this.toasts.msg}
                  </p>
                  <div class="toast__icon">
                  <i  style="font-size:40px" class="${icon}"></i>
              </div>
              </div>
              
              
              
      `;
      main.appendChild(toast);    
  }   
}