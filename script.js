(function(){
    /* validation : state */
    var state = {
        data: {
            email : false,
            pass  : false,
            repass: false
        },
        result: function(){
            var boo = true;
            for(key in this.data){
                if(this.data[key] !== true) return false ;
            }
            return boo ;
        }
    };

    /* validation : validate (true -> pass, false -> alert) */
    function Validator(varify, value, param) {
        var result = false;
        // validate type
        switch (varify) {
            case 'empty':
                result = value != '' ;
                break;
            case 'email':
                result = (value.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) != null);
                break;
            case 'length':
                result = value.length >= param ;
                break;
            case 'match':
                result = value == param.value ;
                break;
            case 'regex':
                result = (value.match(param) != null);
                break;
        }
        return result;
    }

    /* validation : event */
    document.onkeyup = function(e) {
        var target  = e.target
        var varify  = true
        var message = ''

        if(target.tagName != ('INPUT')) return ;

        if(target.value == '') {
            varify = Validator('empty', target.value) ;
            message = varify ? '' : 'Input area is empty.' ;
        } else {
            // validation + message
            switch (target.name) {
                case 'email':
                    varify  = Validator('email', e.target.value)
                    state.data['email'] = varify
                    message = varify ? '' : 'Email format is not correct.' ;
                    break;
                case 'pass':
                    minlength = 6
                    varify  = Validator('length', e.target.value, minlength)
                    state.data['pass'] = varify
                    message = varify ? '' : `Password must be at least ${minlength} characters long.` ;
                    break;
                case 're-pass':
                    varify  = Validator('match', e.target.value, document.querySelector('.valid-pass'))
                    state.data['repass'] = varify
                    message = varify ? '' : 'Input content is different.' ;
                    break;
            }
        }

        // alert message
        var warning_message    = message
        var warning_area       = e.target.previousElementSibling
        warning_area.innerText = warning_message

        // submit disabled
        var submit = document.querySelector('.login-submit')
        return submit.disabled = !state.result() ;
    }
})();
