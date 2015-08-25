(function () {
    // 'use strict';

    angular
        .module('filters.filters')
        .filter('capFirst', function (){
            return function (sentence){
                    console.log(sentence);
                    var word_arr = sentence.split(" ");
                    console.log(word_arr);
                    var new_sentence = '';
                    console.log(new_sentence);
                    for(i in word_arr){
                        console.log(i);
                        new_sentence += word_arr[i].substring(0,1).toUpperCase()+word_arr[i].slice(1) + " ";
                    }
                    console.log(new_sentence);
                    return new_sentence;
                }
        });


}());
