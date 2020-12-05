/*
     Project    : Deepak Kumar Portfolio Site
     Description: This is my personal Portfolio Site Built using HTML/CSS, JavaScript, jQuery - Visit https://www.deepakplay.com
     Created by : K. Deepak Kumar
     Contact at : deepakplay14@gmail.com
*/

"use strict";
$(document).ready(function(){

    //Portfolio
    $('.my_portfolio').click(function(event){
        let target = $(event.target).closest('div[data-href]');
        if(target.length){
            window.open(target.data('href'), '_blank');
        }
    });

    $('.visit_github').click(function(event){
        let target = $(event.target).closest('.visit_github');
        if(target.length){
            window.open('https://github.deepakplay.com', '_blank');
        }
    });

    $('.cv_get').click(function(event){
        let target = $(event.target).closest('.cv_get');
        if(target.length){
            window.open('https://www.deepakplay.com', '_blank');
        }
    });

    //Top Menu Functions
    let menuToggle = false;
    $('.nav_mobile').click(function(){
        if(!menuToggle){
            $('header nav ul').css({
                animation: 'menu_slideIn .6s ease',
                right: '0'
            });
            menuToggle=true;
        }else{
            $('header nav ul').css({
                animation: 'menu_slideOut .6s ease',
                right: '-80%'
            });
            menuToggle=false;
        }
    });

    // Page Scroll Behavior
    const pages  = [ '#page_header',
                     '#page_about',
                     '#page_portfolio',
                     '#page_contact'];
    let currnet = 0;
    let onScroll =true;

    //header nav click
    $('a[href^="#"]').click(function(event){
        onScroll = false;
        const id = $(this).attr('href');
        $('.active').removeClass('active');
        currnet = pages.findIndex((item)=>item===id);
        $(this).addClass('active');
        const target = $(id);
        if(target.length){
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 600, function(){
                onScroll = true;
            });
        }
        $('header nav ul').css({
            animation: 'menu_slideOut .6s ease',
            right: '-80%'
        });
        menuToggle=false;
        
    });

    //Bottom right page move click
    $('.page_nav').click(function(event){
        onScroll = false;
        const target = $(event.target);
        let page_target;
        if(target.hasClass('top')){
            if(currnet!==0){
                page_target = $(pages[--currnet]); 
            }            
        }else if(target.hasClass('bottom')){
            if(currnet!==(pages.length-1)){
                page_target = $(pages[++currnet]);       
            }
        }
        if(page_target && page_target.length){
            event.preventDefault();
            $('.active').removeClass('active');
            $(`a[href="${pages[currnet]}"]`).addClass('active');
            $('html, body').stop().animate({
                scrollTop: page_target.offset().top
            }, 600, function(){
                onScroll = true;
            });
        }
    })

    $(window).scroll(function(){
        if($(window).width()>=850){
            if($(document).scrollTop() > 500){
                $('.header nav').addClass('nav_scroll');
            }else{
                $('.header nav').removeClass('nav_scroll');
            }
        }
        
        if(onScroll){ //On Scroll
            const docLoc = $(document).scrollTop();
            for(const page of pages){
                if((Math.abs(docLoc - $(page).offset().top) <200)){
                    const target = $(`a[href="${page}"]`);
                    if(!target.hasClass('active')){
                            $('.active').removeClass('active');
                            target.addClass('active');
                        currnet = pages.findIndex((item)=>item===page);
                    }
                }
            }
        }
    });

    $(window).resize(function(size){ // Close menu when resizing window
        if($(window).width()>=850){
            $('header nav ul').css({
                animation: 'menu_slideOut .6s ease',
                right: '-80%'
            });
            menuToggle = false;
            if($(document).scrollTop() > 500){
                $('.header nav').addClass('nav_scroll');
            }
        }else{
            $('.header nav').removeClass('nav_scroll');
        };
    })
    //Responsive Menu slider
})