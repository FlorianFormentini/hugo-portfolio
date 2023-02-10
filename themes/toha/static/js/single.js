"use strict";

var isMobile = false, isTablet = false, isLaptop = false;
(function ($) {
  jQuery(document).ready(function () {
    function detectDevice() {
      if (window.innerWidth <= 425) {
        isMobile = true;
        isTablet = false;
        isLaptop = false;
      } else if (window.innerWidth <= 768) {
        isMobile = false;
        isTablet = true;
        isLaptop = false;
      } else {
        isMobile = false;
        isTablet = false;
        isLaptop = true;
      }
    }
    detectDevice();

    // =========== Add anchor to the headers ================
    function addAnchor(element) {
      element.innerHTML = `<a href="#${element.id}" class="header-anchor">${element.innerHTML}<sup><i class="fas fa-link"></i></sup></a>`;
    }

    var postContent = document.getElementById("post-content");
    if (postContent != null) {
      var headerTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];
      for (var i = 0; i < headerTypes.length; i++) {
        var headers = postContent.querySelectorAll(headerTypes[i]);
        if (headers) {
          headers.forEach(addAnchor);
        }
      }
    }

    // =============== Make TOC Compatible wit Bootstrap Scroll Spy ========
    // add "navbar" class to the "nav" element
    let toc = document.getElementById("TableOfContents");
    toc.classList.add("navbar");
    // add "nav-pills" class to the "ul" elements
    let elems = toc.getElementsByTagName("ul");
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.add("nav-pills");
    }
    // add "nav-item" class to the "li" elements
    elems = toc.getElementsByTagName("li");
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.add("nav-item");
      if (isMobile) {
        elems[i].setAttribute("onclick", "toggleTOC()");
      }
    }
    // add "nav-link" class to the "a" elements
    elems = toc.getElementsByTagName("a");
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.add("nav-link");
    }

    // add scroll to top button
    function scrollToTop() {
      var btn = $('#scroll-to-top');
      // check if floatingLanguageSelector exists
        if ($("#floatingLanguageSelector").length ) {
        
            btn.css('padding-bottom','6vh');
        
        }

      $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass('show');
        } else {
          btn.removeClass('show');
        }
      });

      btn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
      });
    }
    scrollToTop();

    // Content datatables
    $('.datatable-fr').DataTable({
        
        lengthMenu: [
            [10, 25, -1],
            [10, 25, 'All'],
        ],
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json'
        }
    });
    $('.datatable-en').DataTable({
        lengthMenu: [
            [10, 25, -1],
            [10, 25, 'All'],
        ],
    });
  });
})(jQuery);
