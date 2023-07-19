/*
*index.js
*/
// 1、使用ES6导入语法，导入jquery
import $ from 'jquery'
import './index.css'
// 2、定义jquery的入口函数
$(function () {
    // 实现奇偶行变色
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'pink')
})