
$(function(){
    if( !('placeholder' in document.createElement('input')) ){
        // 匹配 除type=password以外所有input、textarea
        $('input[placeholder][type!=password],textarea[placeholder]').each(function(){   
            var self = $(this),   
            text= self.attr('placeholder');
            // 如果内容为空，则写入
            if(self.val()===""){ 
                self.val(text).addClass('placeholder');
            }

            // 控件激活，清空placeholder
            self.focus(function(){
                if(self.val()===text){
                    self.val("").removeClass('placeholder');
                }
            // 控件失去焦点，清空placeholder
            }).blur(function(){
                if(self.val()===""){
                    self.val(text).addClass('placeholder');
                }
            }); 

            //对password框的特殊处理
            $("input[type='password']").each(function() {
                //1.创建一个text框 2获取焦点和失去焦点的时候切换
                var pwdField    = $(this);
                var pwdVal      = pwdField.attr('placeholder');
                pwdField.after('<input  class="login-input-ie" type="text" value='+pwdVal+' autocomplete="off" />');
                var pwdPlaceholder = $(this).siblings('.login-input-ie');
                pwdPlaceholder.show();
                pwdField.hide();

                pwdPlaceholder.focus(function(){
                    pwdPlaceholder.hide();
                    pwdField.show();
                    pwdField.focus();
                });

                pwdField.blur(function(){
                    if(pwdField.val() == '') {
                        pwdPlaceholder.show();
                        pwdField.hide();
                    }
                });
            });
        });   
    }
})();