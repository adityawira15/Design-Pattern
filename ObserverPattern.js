function Observer(){
    this.handle = [];
}

Observer.prototype = {
    follow: function(param){
        this.handle.push(param)
    },
    unfollow: function(param){
        this.handle = this.handle.filter(
            function(item){
                if(item !== param){
                    return item;
                }
            }
        )
    },
    post: function(obj, thisObj){
        var scope = thisObj || window;
        this.handle.forEach(function(element) {
            element.call(scope, obj);
        });
    }
}


var view = (function(){
    var view = '';
    return {
        add: function(msg){
            view += msg + '\n';
        },
        show: function(){
            console.log(view); view = '';
        }
    }
})();

function run(){
    var clickHandle = function(item){
        view.add('posts: ' + item);
    }

    var click = new Observer();

    click.follow(clickHandle);
    click.post('follow');
    click.unfollow(clickHandle);
    click.post('unfollow');
    click.follow(clickHandle);
    click.post('follow');

    view.show();
}