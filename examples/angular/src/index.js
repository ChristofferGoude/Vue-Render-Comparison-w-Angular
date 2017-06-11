import Angular from 'angular'
import List from './List'
import Benchmark from '../../../helpers/benchmark'

/* eslint-disable no-new */
new Benchmark((items, done) => {
    function render(){
        return document.getElementById("root").innerHTML = "Test";
    }
})
