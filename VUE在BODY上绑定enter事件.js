VUE在BODY上绑定enter事件
复制代码
mounted () {
      this.bodyListener = (e) => {
        if (e.keyCode === 13 && e.target === document.body){
          if(!this.cashierDialog){
            document.getElementById('cashier-cash-btn').click()
          }else{
            document.getElementById('cashier-dialog-submit').click()
          }
        }
        if(this.cashierDialog){
          if (e.keyCode === 27 && e.target === document.body){
            document.getElementById('cashier-dialog-cancel').click()
          }
        }
      }
      document.body.addEventListener('keyup', this.bodyListener, false)
    },
    beforeDestroy() {
      document.body.removeEventListener('keyup', this.bodyListener)
    },